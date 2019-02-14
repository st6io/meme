import styled from 'styled-components/macro';
import { Text } from 'rebass';
import { variant, borders, borderColor, borderRadius } from 'styled-system';

const themed = key => props => props.theme[key];

const inputs = variant({ key: 'inputs' });

const Input = styled(Text)(
  borders,
  borderColor,
  borderRadius,
  inputs,
  themed('Input'),
);

Input.defaultProps = {
  as: 'input',
  border: '1px solid',
  borderRadius: 3,
  mx: 0,
  mb: 3,
  px: 3,
  py: 2,
};

export default Input;
