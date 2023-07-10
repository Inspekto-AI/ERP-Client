const ImageKitLoader = ({ src, width, quality }) => {
  let source = null;
  if (src[0] === '/') source = src.slice(1);
  else source = src;
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(',');
  let urlEndpoint = '/';
  if (urlEndpoint[urlEndpoint.length - 1] === '/') urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${source}?tr=${paramsString}`;
};

export default ImageKitLoader;
