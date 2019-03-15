import React from 'react';
import { mount } from 'enzyme';

import Badge from '../badge';

describe('<Badge />', () => {
  it('should render with default styles', () => {
    const component = mount(<Badge />);

    expect(component).toHaveStyleRule('border', '1px solid');
    expect(component).toHaveStyleRule('border-radius', '3px');
    expect(component).toHaveStyleRule('font-size', '12px');

    expect(component).toHaveStyleRule('padding-left', '8px');
    expect(component).toHaveStyleRule('padding-right', '8px');
    expect(component).toHaveStyleRule('padding-top', '4px');
    expect(component).toHaveStyleRule('padding-bottom', '4px');
  });
});
