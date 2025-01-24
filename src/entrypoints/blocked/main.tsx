import { createRoot } from 'react-dom/client';
import BlockedPage from './BlockedPage';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlockedPage />
  </StrictMode>
);
