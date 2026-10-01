import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './styles/global';
import { ThemeProvider } from './providers/ThemeProvider';
import { RouterProvider } from 'react-router';
import { appRouter } from './app/routes';
import { AuthStoreProvider } from './providers/AuthProvider';
import { AppQueryClientProvider } from './providers/QueryClientProvider';
import { ToastProvider } from './providers/ToastProvider';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AppQueryClientProvider>
    <AuthStoreProvider>
      <ThemeProvider>
        <ToastProvider autoDeleteTime={5000}>
          <GlobalStyles />
          <RouterProvider router={appRouter} />
        </ToastProvider>
      </ThemeProvider>
    </AuthStoreProvider>
  </AppQueryClientProvider>,
);
