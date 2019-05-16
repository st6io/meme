import React from 'react';
import { shallow } from 'enzyme';

import ImageUrlInput from '../image-url-input';
import { Input } from '../';

describe('<ImageUrlInput />', () => {
  const getComponent = props =>
    shallow(<ImageUrlInput onChange={jest.fn()} {...props} />);

  it('should match snapshot when Input not visible', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it('should match snapshot when Input should be visible', () => {
    expect(
      getComponent({ visible: true, value: 'http://test.url.com' }),
    ).toMatchSnapshot();
  });

  it('should invoke onChange Prop', () => {
    const onChangeMock = jest.fn();
    const component = getComponent({
      visible: true,
      onChange: onChangeMock,
    });

    expect(onChangeMock).toHaveBeenCalledTimes(0);
    const input = component.find(Input);
    const value = 'https://test.test';
    input.simulate('change', value);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(value);
  });
});
