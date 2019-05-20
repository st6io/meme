import isImage from 'is-image';

const allowedProtocols = ['http:', 'https:'];

const isImageUrl = urlStr => {
  try {
    const { protocol, pathname } = new URL(urlStr);
    return allowedProtocols.includes(protocol) && isImage(pathname);
  } catch {
    return false;
  }
};

export default isImageUrl;
