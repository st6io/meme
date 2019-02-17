import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Text } from 'rebass';

const MemeText = styled(Text)`
  position: absolute;
  width: 100%;
  bottom: ${props => (props.verticalAlign === 'bottom' ? 0 : undefined)};
  color: white;
  font-size: xx-large;
  font-family: 'Oswald', sans-serif;
  font-size: xx-large;
  white-space: pre-wrap;
  text-align: center;
  text-transform: uppercase;
  -webkit-text-stroke: 1px black;
  text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;
`;
MemeText.defaultProps = {
  verticalAlign: 'top',
};

const MemeAttributionText = styled(Text)`
  position: absolute;
  bottom: 0;
  right: 0;
  color: #333;
  font-size: small;
  font-family: 'Oswald', sans-serif;
  background: rgba(255, 255, 255, 0.7);
  padding: 2px;
`;

const Meme = ({ imageSrc, topLabel, bottomLabel, maxWidth, forwardedRef }) => {
  const [dimensions, setDimensions] = useState({});
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      let { width, height } = image;
      if (image.width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }
      setDimensions({ width, height });
    };
    image.src = imageSrc;
  }, [imageSrc]);

  return (
    <svg {...dimensions} ref={forwardedRef}>
      <image xlinkHref={imageSrc} width="100%" height="100%" />
      <switch>
        <foreignObject
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
        >
          <MemeText p={4}>{topLabel}</MemeText>
          <MemeText p={4} verticalAlign="bottom">
            {bottomLabel}
          </MemeText>

          <MemeAttributionText>
            Generated by ST6 Meme Generator
          </MemeAttributionText>
        </foreignObject>
      </switch>
    </svg>
  );
};

Meme.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  topLabel: PropTypes.string,
  bottomLabel: PropTypes.string,
  maxWidth: PropTypes.number,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

Meme.defaultProps = {
  maxWidth: 600,
};

const MemeWithRef = forwardRef((props, ref) => (
  <Meme {...props} forwardedRef={ref} />
));
MemeWithRef.displayName = 'Meme';

export default MemeWithRef;
