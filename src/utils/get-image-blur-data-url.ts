export const getImageBlurDataUrl = async (image: string) => {
  const imageBlur = await fetch(image).then(async res => {
    return Buffer.from(await res.arrayBuffer()).toString('base64');
  });

  return `data:image/png;base64,${imageBlur}`;
};
