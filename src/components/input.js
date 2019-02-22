import styled from 'styled-components/macro';
import { Text } from 'rebass';
import { variant, borders, borderColor, borderRadius } from 'styled-system';

import { themed } from '../utils/themed';

const inputs = variant({ key: 'inputs' });

const Input = styled(Text)(
  {},
  borders,
  borderColor,
  borderRadius,
  inputs,
  themed('Input'),
);

Input.propTypes = {
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
};

Input.defaultProps = {
  as: 'input',
  border: '1px solid',
  borderRadius: 3,
  fontSize: 1,
  mx: 0,
  mb: 3,
  px: 3,
  py: 2,
};

export default Input;
