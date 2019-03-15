import React from 'react';
import { mount } from 'enzyme';

import theme from '../theme';
import GlobalStyle from '../global-style';

const getCSS = scope =>
  Array.from(scope.querySelectorAll('style'))
    .map(tag => tag.innerHTML)
    .join('\n')
    .replace(/ {/g, '{')
    .replace(/:\s+/g, ':')
    .replace(/:\s+;/g, ':;')
    .replace(/\/\*.*?\*\/\n?/g, '');

describe('<GlobalStyle />', () => {
  Object.keys(theme).forEach(key => {
    it(`should match snapshot for ${key} theme`, () => {
      mount(<GlobalStyle theme={theme[key]} />);
      const css = getCSS(document.head);

      expect(css).toMatchSnapshot();
    });
  });
});
