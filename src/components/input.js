import styled from 'styled-components/macro';
import { Text } from 'rebass';

const themed = key => props => props.theme[key];

const Input = styled(Text)(themed('Input'));

Input.defaultProps = {
  as: 'input',
  fontSize: 'inherit',
  fontWeight: 'bold',
  m: 0,
  px: 3,
  py: 2,
};

export default Input;
