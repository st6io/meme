import React from 'react';
import { mount } from 'enzyme';

import cuteCat from '../../memes/Cute-Cat.jpg';
import Meme from '../meme';

describe('<Meme />', () => {
  const props = {
    topLabel: 'My Top Label',
    bottomLabel: 'My Bottom Label',
    imageSrc: cuteCat,
  };

  it('should renders top and bottom labels', () => {
    const component = mount(<Meme {...props} />);

    expect(component).toIncludeText(props.topLabel);
    expect(component).toIncludeText(props.bottomLabel);
  });

  [
    {
      dimensions: { width: 200, height: 100 },
      expected: { width: 200, height: 100 },
    },
    {
      dimensions: { width: 800, height: 600 },
      expected: { width: 600, height: 450 },
    },
    {
      dimensions: { width: 800, height: 600 },
      isMobile: true,
      expected: { width: 350, height: 262.5 },
    },
  ].forEach(({ dimensions, expected, isMobile }) => {
    it(`should set SVG dimensions based on viewport and image dimensions (${JSON.stringify(
      dimensions,
    )})`, async () => {
      const spy = jest
        .spyOn(Image.prototype, 'src', 'set')
        .mockImplementationOnce(function() {
          this.width = dimensions.width;
          this.height = dimensions.height;
          this.onload();
        });

      const component = mount(<Meme {...props} isMobile={isMobile} />);

      const svg = component.find('svg');

      expect(svg).toHaveProp('width', expected.width);
      expect(svg).toHaveProp('height', expected.height);

      spy.mockRestore();
    });
  });
});
