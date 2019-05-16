import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components/macro';
import { Flex } from 'rebass';

import { Input } from './';

const ImageUrlInput = ({ visible, value, onChange, transitionName }) => {
  const TransitionContainer = useMemo(
    () =>
      styled(Flex)`
        &.${transitionName}-enter {
          opacity: 0.01;
          max-height: 0;
        }

        &.${transitionName}-enter.${transitionName}-enter-active {
          opacity: 1;
          transition: max-height 200ms ease-out, opacity 300ms ease-in 50ms;
          max-height: 100px;
        }

        &.${transitionName}-leave {
          opacity: 1;
          max-height: 100px;
        }

        &.${transitionName}-leave.${transitionName}-leave-active {
          opacity: 0.01;
          transition: max-height 400ms ease-out 100ms, opacity 300ms ease-in;
          max-height: 0;
        }
      `,
    [transitionName],
  );
  TransitionContainer.displayName = 'TransitionContainer';

  return (
    <ReactCSSTransitionGroup
      transitionName={transitionName}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={400}
    >
      {visible && (
        <TransitionContainer
          flexDirection="column"
          px={3}
          key="image-url-input-container"
        >
          <Input
            variant="primary"
            placeholder="Image URL..."
            value={value}
            onChange={onChange}
          />
        </TransitionContainer>
      )}
    </ReactCSSTransitionGroup>
  );
};

ImageUrlInput.propTypes = {
  visible: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  transitionName: PropTypes.string,
};

ImageUrlInput.defaultProps = {
  visible: false,
  transitionName: 'image-url',
};

export default ImageUrlInput;
