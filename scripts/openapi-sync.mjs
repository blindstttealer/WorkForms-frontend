import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
function run(script) {
    const r = spawnSync('npm', ['run', script], {
        cwd: root,
        stdio: 'inherit',
        shell: true,
        env: process.env,
    });
    return r.status ?? 1;
}
const pull = run('openapi:pull');
if (pull !== 0)
    process.exit(pull);
const codegen = run('codegen');
process.exit(codegen);
