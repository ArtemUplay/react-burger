/* eslint-disable no-unused-vars */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.svg?sprite' {
  import * as React from 'react';

  const src: React.SVGProps<SVGSVGElement> & { url: string };
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
