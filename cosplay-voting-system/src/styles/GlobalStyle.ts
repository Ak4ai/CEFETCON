import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Suas variáveis de cor aqui, se não estiverem em outro lugar */
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    min-height: 100vh; /* Fallback para navegadores mais antigos */
    min-height: 100dvh; /* Altura da viewport dinâmica */
    background: var(--bg-primary);
    color: var(--text-primary);
    overflow-x: hidden; /* Previne overflow horizontal */
  }
`;