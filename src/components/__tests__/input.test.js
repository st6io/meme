import React from 'react';
import { mount } from 'enzyme';

import Input from '../input';

describe('<Input />', () => {
  it('should render with default styles', () => {
    const component = mount(<Input />);

    expect(component).toHaveStyleRule('border', '1px solid');
    expect(component).toHaveStyleRule('border-radius', '3px');
    expect(component).toHaveStyleRule('font-size', '14px');

    expect(component).toHaveStyleRule('margin-left', '0px');
    expect(component).toHaveStyleRule('margin-right', '0px');
    expect(component).toHaveStyleRule('margin-bottom', '16px');

    expect(component).toHaveStyleRule('padding-left', '16px');
    expect(component).toHaveStyleRule('padding-right', '16px');
    expect(component).toHaveStyleRule('padding-top', '8px');
    expect(component).toHaveStyleRule('padding-bottom', '8px');
  });
});
