export const routeSegments = {
  login: 'login',
  registration: 'registration',
  emailConfirmation: 'email-confirmation',
  emailVerification: 'email-verification',
  promotion: 'promotion',
  myForms: 'my-forms',
  myFormsForm: 'form/:formId',
  delivery: 'delivery',
  favorites: 'favorites',
  about: 'about',
  formConstructor: 'form-constructor',
  cart: 'cart',
  settings: 'settings',
  products: 'products',
  productDetail: ':id',
  forgot: 'forgot',
  support: 'support',
} as const;
export const paths = {
  home: '/',
  login: '/login',
  registration: '/registration',
  emailConfirmation: '/email-confirmation',
  emailVerification: '/email-verification',
  promotion: '/promotion',
  delivery: '/delivery',
  favorites: '/favorites',
  about: '/about',
  formConstructor: '/form-constructor',
  cart: '/cart',
  settings: '/settings',
  forgot: '/forgot',
  support: '/support',
  myForms: {
    index: '/my-forms',
    form: (formId: string) => `${paths.myForms.index}/form/${formId}`,
  },
  products: {
    index: '/products',
    detail: (productId: string | number) => `${paths.products.index}/${productId}`,
  },
} as const;
export function isRoutePrefix(pathname: string, basePath: string): boolean {
  if (basePath === paths.home) {
    return pathname === paths.home;
  }
  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}
export function matchesNavTab(pathname: string, tabPath: string): boolean {
  if (tabPath === paths.myForms.index) {
    return isRoutePrefix(pathname, paths.myForms.index);
  }
  return pathname === tabPath;
}
