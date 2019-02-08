const req = require.context('./', false, /.*\.jpg$/);
const memes = req.keys().map(key => req(key));

export const getRandomMeme = currentMeme => {
  let randomMeme;
  do {
    randomMeme = memes[Math.floor(Math.random() * memes.length)];
  } while (randomMeme === currentMeme);

  return randomMeme;
};
