import theme from '../theme';

describe('Theme', () => {
  it('should have light and dark keys', () => {
    const keys = Object.keys(theme);
    expect(keys).toEqual(['light', 'dark']);
  });
});
