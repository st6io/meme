import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import { Flex } from 'rebass';

import { Input } from './';

const TransitionTimeout = {
  enter: 300,
  exit: 400,
};

const ImageUrlInput = ({ visible, className, ...rest }) => {
  const TransitionContainer = useMemo(
    () =>
      styled(Flex)`
        &.${className}-enter {
          opacity: 0.01;
          max-height: 0;
        }

        &.${className}-enter-active {
          opacity: 1;
          transition: max-height 200ms ease-out, opacity 300ms ease-in 50ms;
          max-height: 100px;
        }

        &.${className}-exit {
          opacity: 1;
          max-height: 100px;
        }

        &.${className}-exit-active {
          opacity: 0.01;
          transition: max-height 400ms ease-out 100ms, opacity 300ms ease-in;
          max-height: 0;
        }
      `,
    [className],
  );
  TransitionContainer.displayName = 'TransitionContainer';

  return (
    <CSSTransition
      in={visible}
      classNames={className}
      timeout={TransitionTimeout}
      mountOnEnter
      unmountOnExit
    >
      <TransitionContainer
        flexDirection="column"
        px={3}
        key="image-url-input-container"
      >
        <Input variant="primary" placeholder="Image URL..." {...rest} />
      </TransitionContainer>
    </CSSTransition>
  );
};

ImageUrlInput.propTypes = {
  visible: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ImageUrlInput.defaultProps = {
  visible: false,
  className: 'image-url',
};

export default ImageUrlInput;
