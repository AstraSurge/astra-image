import * as iq from "image-q";
import Jimp from "jimp/es";

export type ReduceImageColorOptions = {
  colorCount: number;
};

async function reduceImageColor(
  dataUrl: string,
  options: ReduceImageColorOptions
) {
  let outputImageUrl = "";
  try {
    const inputImage = await Jimp.read(dataUrl);
    const { width, height, data } = inputImage.bitmap;

    const inPointContainer = iq.utils.PointContainer.fromUint8Array(
      data,
      width,
      height
    );

    const palette = await iq.buildPalette([inPointContainer], {
      colors: options.colorCount,
    });
    const imageData = await iq.applyPalette(inPointContainer, palette);

    const outputImage = new Jimp({
      data: imageData.toUint8Array(),
      width,
      height,
    });
    outputImageUrl = await outputImage.getBase64Async(Jimp.MIME_PNG);
  } catch (error) {
    console.error("Error processing image:", error);
  }
  return outputImageUrl;
}

export default reduceImageColor;
