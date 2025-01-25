import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Options from './Options';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Options />
  </StrictMode>
);
