import styled from 'styled-components/macro';
import { Text } from 'rebass';
import { variant, borders, borderColor, borderRadius } from 'styled-system';

import { themed } from '../utils/themed';

const badges = variant({ key: 'badges' });

const Badge = styled(Text)(
  {},
  borders,
  borderColor,
  borderRadius,
  badges,
  themed('Badge'),
);

Badge.propTypes = {
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
};

Badge.defaultProps = {
  border: '1px solid',
  borderRadius: 3,
  fontSize: 0,
  px: 2,
  py: 1,
};

export default Badge;
