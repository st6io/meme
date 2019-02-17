import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Oswald:700');

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input[type='file'] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  input[type='file'] + label {
    display: inline-block;
  }

  input[type='file']:focus + label {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

export default GlobalStyle;
