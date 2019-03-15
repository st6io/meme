import React from 'react';
import { mount } from 'enzyme';

import Logo from '../logo';

describe('<Logo />', () => {
  it('should match snapshot', () => {
    const component = mount(<Logo />);
    expect(component).toMatchSnapshot();
  });
});
