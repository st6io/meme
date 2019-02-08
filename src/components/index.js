import styled, { createGlobalStyle } from 'styled-components/macro';
import { Text } from 'rebass';

const themed = key => props => props.theme[key];

export const Input = styled(Text)(themed('Input'));

Input.defaultProps = {
  as: 'input',
  fontSize: 'inherit',
  fontWeight: 'bold',
  m: 0,
  px: 3,
  py: 2,
};

export const MemeText = styled(Text)`
  position: absolute;
  bottom: ${props => (props.verticalAlign === 'bottom' ? 0 : undefined)};
  color: white;
  font-size: xx-large;
  font-weight: 700;
  font-family: impact;
  white-space: pre-wrap;
  text-transform: uppercase;
  -webkit-text-stroke: 1px black;
  text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;
`;
MemeText.defaultProps = {
  verticalAlign: 'top',
};

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`;
