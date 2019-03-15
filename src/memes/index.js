import memes from './memes';

export const getRandomMeme = currentMeme => {
  let randomMeme;
  do {
    randomMeme = memes[Math.floor(Math.random() * memes.length)];
  } while (randomMeme === currentMeme);

  return randomMeme;
};
