import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Button } from 'rebass';
import { ThemeProvider } from 'styled-components';
import { saveSvgAsPng } from 'save-svg-as-png';

import { Input, Meme, Logo, themes } from '../components';
import { getRandomMeme } from '../memes';
import App from '../App';

jest.mock('../memes', () => ({
  getRandomMeme: jest.fn(() => 'meme.jpg'),
}));

jest.mock('save-svg-as-png', () => ({
  saveSvgAsPng: jest.fn(),
}));

window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe('<App />', () => {
  afterEach(() => window.matchMedia.mockClear());

  it('should set meme top and bottom labels on inputs change', () => {
    const component = mount(<App />);

    const inputs = component.find(Input);
    const topInput = inputs.at(0);
    const bottomInput = inputs.at(1);

    topInput.simulate('change', { target: { value: 'My Top Label' } });
    bottomInput.simulate('change', { target: { value: 'My Bottom Label' } });

    const meme = component.find(Meme);
    expect(meme).toHaveProp('topLabel', 'My Top Label');
    expect(meme).toHaveProp('bottomLabel', 'My Bottom Label');
  });

  it('should use user supplied file for image source', () => {
    const component = mount(<App />);

    const spy = jest
      .spyOn(FileReader.prototype, 'readAsDataURL')
      .mockImplementationOnce(function() {
        jest
          .spyOn(this, 'result', 'get')
          .mockImplementationOnce(() => 'custom-meme.jpg');
        this.onload();
      });

    const file = component.find(Input).filter({ type: 'file' });
    file.simulate('change', { target: { files: [new Blob()] } });

    const meme = component.find(Meme);
    expect(meme).toHaveProp('imageSrc', 'custom-meme.jpg');

    spy.mockRestore();
  });

  it('should not change meme image if user has not selected an image', () => {
    const component = mount(<App />);

    const file = component.find(Input).filter({ type: 'file' });
    file.simulate('change', { target: { files: [] } });

    const meme = component.find(Meme);
    expect(meme).toHaveProp('imageSrc', 'meme.jpg');
  });

  it('should change meme image when random button is clicked', () => {
    const component = mount(<App />);

    getRandomMeme.mockImplementationOnce(() => 'random-meme.jpg');

    const button = component.find(Button).filter({ title: 'Random image' });
    button.simulate('click');

    const meme = component.find(Meme);
    expect(meme).toHaveProp('imageSrc', 'random-meme.jpg');
  });

  it('should save meme when download button is clicked', () => {
    const component = mount(<App />);

    const button = component.find(Button).filter({ title: 'Download image' });
    button.simulate('click');

    expect(saveSvgAsPng).toHaveBeenCalledTimes(1);
  });

  it('should change theme when logo is clicked', () => {
    const component = mount(<App />);

    const button = component
      .find(Button)
      .filterWhere(b => b.contains(<Logo />));

    button.simulate('click');
    expect(component.find(ThemeProvider)).toHaveProp('theme', themes.dark);

    button.simulate('click');
    expect(component.find(ThemeProvider)).toHaveProp('theme', themes.light);
  });

  it('should set isMobile prop to true when viewport is mobile', () => {
    const component = mount(<App />);

    const mql = window.matchMedia.mock.results[0].value;

    mql.matches = true;
    act(() => mql.addListener.mock.calls[0][0]());
    component.update();

    const meme = component.find(Meme);
    expect(meme).toHaveProp('isMobile', true);
  });
});
