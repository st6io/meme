import { getRandomMeme } from '../';

jest.mock('../memes', () => [1, 2, 3].map(i => `meme${i}.jpg`));

describe('memes', () => {
  it('getRandomMeme should return different random meme', () => {
    const meme = getRandomMeme('meme1.jpg');
    expect(meme).not.toMatch('meme1.jpg');
  });

  it('getRandomMeme should handle undefined meme', () => {
    const meme = getRandomMeme();
    expect(meme).toMatch(/meme[1-3]\.jpg/);
  });
});
