import { createBrowserRouter } from 'react-router';
import MainLayout from '../pages/layout/Layout';
import About from '../pages/about/about-page';
import Promotion from '../pages/promotion/promotion-page';
import Favorites from '../pages/favorites/favorites-page';
import Delivery from '../pages/delivery/delivery-page';
import Cart from '../pages/cart/cart-page';
import { MyFormsPage, MyFormsWelcome } from '@/features/my-forms';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegistrationPage';
import EmailConfirmationPage from '@/pages/auth/EmailConfirmationPage';
import { EmailVerification } from '@/features/auth/ui/authorization-menu/components/email-verification';
import { AuthGuard } from '@/components/auth/AuthGuard';
import FormConstructor from '@/pages/form-constructor/form-constructor-page';
import { ProfileSettingsPage } from '@/features/profile-settings';
import { routeSegments } from '@/shared/routes';
export const appRouter = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: routeSegments.login,
        element: (
          <AuthGuard access="guest-only">
            <LoginPage />
          </AuthGuard>
        ),
      },
      {
        path: routeSegments.registration,
        element: (
          <AuthGuard access="guest-only">
            <RegisterPage />
          </AuthGuard>
        ),
      },
      {
        path: routeSegments.emailConfirmation,
        element: (
          <AuthGuard access="guest-only">
            <EmailConfirmationPage />
          </AuthGuard>
        ),
      },
      {
        path: routeSegments.emailVerification,
        element: (
          <AuthGuard access="protected">
            <EmailVerification />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthGuard access="protected">
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, Component: About },
      { path: routeSegments.promotion, Component: Promotion },
      {
        path: routeSegments.myForms,
        children: [
          { index: true, Component: MyFormsWelcome },
          { path: routeSegments.myFormsForm, Component: MyFormsPage },
        ],
      },
      { path: routeSegments.delivery, Component: Delivery },
      { path: routeSegments.favorites, Component: Favorites },
      { path: routeSegments.about, Component: About },
      { path: routeSegments.formConstructor, Component: FormConstructor },
      { path: routeSegments.cart, Component: Cart },
      { path: routeSegments.settings, Component: ProfileSettingsPage },
    ],
  },
]);
