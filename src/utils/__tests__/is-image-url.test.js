import isImage from 'is-image';

import isImageUrl from '../is-image-url';

jest.mock('is-image', () => jest.fn());

describe('isImageUrl', () => {
  afterEach(() => {
    isImage.mockClear();
  });

  it(`should return false when protocol is not allowed`, () => {
    isImage.mockImplementation(() => true);
    expect(isImageUrl('ftp://test:test')).toEqual(false);
  });

  [false, true].forEach(isImageResult =>
    it(`should return ${isImageResult} when isImage returns ${isImageResult}`, () => {
      isImage.mockImplementation(() => isImageResult);
      expect(isImageUrl('http://test.url/pathname')).toEqual(isImageResult);
    }),
  );

  it(`should return false when isImage throws`, () => {
    isImage.mockImplementation(() => {
      throw new Error();
    });
    expect(isImageUrl('http://test.url/pathname')).toEqual(false);
  });
});
