import { css } from "bumbag";

const theme = {
  fonts: {
    importUrl: [
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap",
    ],
    default: "'Montserrat', system-ui, sans-serif",
  },

  global: {
    fontSize: 18,
    styles: {
      base: css`
        html {
          box-sizing: border-box;
        }

        body {
          background-color: #ffffff;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg stroke='%23CCC' stroke-width='0' %3E%3Crect fill='%23F5F5F5' x='-60' y='-60' width='110' height='240'/%3E%3C/g%3E%3C/svg%3E");
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
      `,
    },
  },

  palette: {
    text: "#435B6C",
    primary: "#574feb",
    info: "#CFD7E1",
    success: "#67C6B9",
    danger: "#F3705B",
    warning: "#FFD15D",
  },
};

export default theme;
