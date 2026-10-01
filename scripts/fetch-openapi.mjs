import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'openapi', 'openapi.json');
const trimSlash = (s) => s.replace(/\/+$/, '');
const envBase = process.env.OPENAPI_PULL_BASE || process.env.REACT_APP_API_URL;
const base = trimSlash(envBase || 'http://localhost:5000');
const explicit = process.env.OPENAPI_URL;
const rawJsonPath = process.env.OPENAPI_JSON_PATH || '/api/docs-json';
const jsonPath = rawJsonPath.startsWith('/') ? rawJsonPath : `/${rawJsonPath}`;
const defaultSpecUrl = `${base}${jsonPath}`;
const docsPages = (process.env.OPENAPI_DOCS_URL || `${base}/api/docs`)
    .split(/[;,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
function resolveSpecUrl(raw, pageHref) {
    const t = raw.trim();
    if (!t || t.includes('validator'))
        return null;
    if (/^https?:\/\//i.test(t))
        return t;
    const page = new URL(pageHref.endsWith('/') ? pageHref : `${pageHref}/`);
    if (t.startsWith('/')) {
        return new URL(t, `${page.origin}/`).href;
    }
    return new URL(t, page).href;
}
function extractUrlsFromText(text, pageHref) {
    const found = [];
    for (const re of [
        /url\s*:\s*["']([^"']+)["']/gi,
        /urls\s*:\s*\[[^\]]*"url"\s*:\s*"([^"]+)"/gi,
        /"url"\s*:\s*"([^"]+)"/g,
    ]) {
        for (const m of text.matchAll(re)) {
            const abs = resolveSpecUrl(m[1], pageHref);
            if (abs)
                found.push(abs);
        }
    }
    return [...new Set(found)];
}
async function discoverSpecUrlsFromPage(pageUrl) {
    const found = [];
    try {
        const res = await fetch(pageUrl, { redirect: 'follow' });
        if (!res.ok)
            return found;
        const html = await res.text();
        const finalHref = res.url || pageUrl;
        found.push(...extractUrlsFromText(html, finalHref));
        const pageDir = new URL('./', finalHref);
        const initCandidates = [
            new URL('swagger-initializer.js', pageDir).href,
            new URL('./swagger-initializer.js', pageDir).href,
        ];
        for (const initUrl of [...new Set(initCandidates)]) {
            try {
                const ir = await fetch(initUrl, { redirect: 'follow' });
                if (!ir.ok)
                    continue;
                const js = await ir.text();
                found.push(...extractUrlsFromText(js, finalHref));
            }
            catch {
            }
        }
    }
    catch {
    }
    return [...new Set(found)];
}
function looksLikeOpenApi(doc) {
    return Boolean(doc && (doc.openapi || doc.swagger));
}
async function tryFetch(url) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 15000);
    try {
        const res = await fetch(url, { redirect: 'follow', signal: controller.signal });
        if (!res.ok)
            return null;
        const text = await res.text();
        if (!text.trim())
            return null;
        let doc;
        try {
            doc = JSON.parse(text);
        }
        catch {
            return null;
        }
        if (!looksLikeOpenApi(doc))
            return null;
        return doc;
    }
    catch {
        return null;
    }
    finally {
        clearTimeout(t);
    }
}
async function main() {
    const discovered = [];
    for (const page of docsPages) {
        const urls = await discoverSpecUrlsFromPage(page.endsWith('/') ? page : `${page}/`);
        discovered.push(...urls);
    }
    for (const page of [`${base}/swagger/`, `${base}/swagger`]) {
        discovered.push(...(await discoverSpecUrlsFromPage(page)));
    }
    const candidates = [
        explicit,
        defaultSpecUrl,
        ...discovered,
        `${base}/swagger/v1/swagger.json`,
        `${base}/openapi/v1/openapi.json`,
        `${base}/v1/swagger.json`,
        `${base}/api/docs/swagger/v1/swagger.json`,
        `${base}/api/docs/v1/swagger.json`,
        `${base}/api/swagger/v1/swagger.json`,
        `${base}/swagger/doc.json`,
        `${base}/openapi.json`,
        'http://localhost:5000/swagger/v1/swagger.json',
        'http://localhost:5000/openapi.json',
        'http://localhost:5000/api/docs/swagger/v1/swagger.json',
    ].filter(Boolean);
    const tried = new Set();
    for (const url of candidates) {
        if (tried.has(url))
            continue;
        tried.add(url);
        const doc = await tryFetch(url);
        if (doc) {
            fs.mkdirSync(path.dirname(outPath), { recursive: true });
            fs.writeFileSync(outPath, JSON.stringify(doc, null, 2), 'utf8');
            console.log(`OpenAPI saved from ${url}\n -> ${path.relative(root, outPath)}`);
            return { ok: true, url };
        }
    }
    console.error([
        'Could not download a valid OpenAPI JSON document.',
        `Expected spec at: ${defaultSpecUrl}`,
        '',
        'With the backend running, check that URL returns JSON (openapi/swagger field).',
        'Override:',
        '  OPENAPI_URL — full URL to the spec',
        '  OPENAPI_PULL_BASE / REACT_APP_API_URL — API origin (default http://localhost:5000)',
        '  OPENAPI_JSON_PATH — path segment (default /api/docs-json)',
    ].join('\n'));
    return { ok: false };
}
main()
    .then((result) => {
    process.exitCode = result.ok ? 0 : 1;
})
    .catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
