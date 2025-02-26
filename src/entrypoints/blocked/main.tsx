import { createRoot } from 'react-dom/client';
import BlockedPage from './BlockedPage';
import { StrictMode } from 'react';
import '../../styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlockedPage />
  </StrictMode>
);
