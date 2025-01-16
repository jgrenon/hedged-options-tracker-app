import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import { AppRoutes } from './components/ui/routes.jsx';
import { BackendProvider } from './components/backend-provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BackendProvider url={import.meta.env.VITE_BACKEND_URL}>
        <AppRoutes />
      </BackendProvider>
    </Provider>
  </StrictMode>
);
