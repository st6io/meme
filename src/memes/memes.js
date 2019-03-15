/* istanbul ignore next */
const requireAllMemes = () => {
  const req = require.context('./', false, /.*\.jpg$/);
  const memes = req.keys().map(key => req(key));

  return memes;
};

export default requireAllMemes();
