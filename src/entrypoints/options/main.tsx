import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Options from './Options';
import '../../styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Options />
  </StrictMode>
);
