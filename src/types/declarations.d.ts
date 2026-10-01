declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.jpeg' {
  const content: string;
  export default content;
}
declare module '*.gif' {
  const content: string;
  export default content;
}
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';
declare module '*.otf';
declare module '*.eot';
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_EMAILJS_SERVICE_ID?: string;
    REACT_APP_EMAILJS_PUBLIC_KEY?: string;
    REACT_APP_EMAILJS_DEFAULT_TEMPLATE_ID?: string;
  }
}
