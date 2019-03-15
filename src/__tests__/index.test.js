import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import App from '../App';
import '../';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

jest.mock('../memes', () => ({
  getRandomMeme: jest.fn(() => 'meme.jpg'),
}));

window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe('Main index', () => {
  it('should render <App /> component', () => {
    expect(ReactDOM.render).toHaveBeenCalledTimes(1);

    const component = mount(ReactDOM.render.mock.calls[0][0]);
    expect(component).toContainReact(<App />);
  });
});
