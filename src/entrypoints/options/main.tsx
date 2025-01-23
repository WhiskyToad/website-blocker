import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Options from "./Options";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Options />
  </StrictMode>
);
