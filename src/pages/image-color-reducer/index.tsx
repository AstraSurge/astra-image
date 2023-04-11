import { useState, experimental_useEffectEvent as useEffectEvent } from "react";
import reduceImageColor from "~/utils/reduceImageColor";
import Head from "next/head";
import ImageUploader from "~/components/common/ImageUploader";
import clsx from "clsx";
import ColorCountSlider from "~/components/image-color-reducer/ColorCountSlider";
import { useDebounceEffect } from "ahooks";
import { RxGithubLogo } from "react-icons/rx";
import Link from "next/link";

export default function ImageColorReducer() {
  const [inputImage, setInputImage] = useState<string>();
  const [outputImage, setOutputImage] = useState<string>();
  const [colorCount, setColorCount] = useState<number>(16);

  const processImage = useEffectEvent((colorCount: number) => {
    if (!inputImage) return;
    void reduceImageColor(inputImage, {
      colorCount,
    }).then((outputDataURL) => {
      setOutputImage(outputDataURL);
    });
  });

  useDebounceEffect(
    () => {
      processImage(colorCount);
    },
    [colorCount, processImage],
    {
      wait: 400,
    }
  );

  function handleFileChange(dataUrl: string) {
    setInputImage(dataUrl);
    void reduceImageColor(dataUrl, {
      colorCount,
    }).then((outputDataURL) => {
      setOutputImage(outputDataURL);
    });
  }

  return (
    <>
      <Head>
        <title>Image Color Reducer</title>
        <meta name="description" content="Discover Image Color Reducer, the ultimate user-friendly solution for enhancing your visuals by simplifying colors. Our advanced tool streamlines the image optimization process, delivering captivating results while reducing file size and maintaining outstanding quality. Ideal for designers, artists, and digital enthusiasts, Image Color Reducer is your go-to resource for achieving stunning images with fewer colors, faster load times, and an unforgettable browsing experience. Experience the magic of color reduction today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-between px-4 py-4">
        <h1 className="text-xl  font-extrabold tracking-tight text-blue-950">
          <Link href={"/"}>Astra Image</Link>
        </h1>
        <a
          target="_blank"
          href="https://github.com/AstraSurge/astra-image"
          aria-label="Go to Astra Image's Github"
        >
          <RxGithubLogo className="text-xl text-blue-950" />
        </a>
      </header>
      <main className="min-h-screen w-full bg-gradient-to-br from-blue-900 to-violet-900 py-24">
        <div className=" container m-auto flex flex-col items-center justify-center gap-12 px-4">
          <section className="py-8 text-center xl:py-12">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight  text-violet-50 sm:text-5xl md:text-8xl">
              Image Color Reducer
            </h1>
            <span className="text-2xl text-violet-300 sm:text-3xl">
              Simplify Colors, Amplify Impact: Image Color Reducer -
              User-Friendly and Visually Stunning.
            </span>
          </section>
          <section className="flex w-full flex-col justify-center gap-4 md:flex-row">
            <div
              className={clsx(
                !outputImage ? `w-full flex-none bg-white md:w-1/2 ` : "flex-1",
                !inputImage && "h-80",
                "overflow-hidden rounded"
              )}
            >
              <ImageUploader
                accept="image/jpeg, image/png, image/bmp, image/tiff"
                value={inputImage}
                onChange={handleFileChange}
                className="w-full "
              />
            </div>
            {outputImage && (
              <div className="flex-1 overflow-hidden rounded">
                <img src={outputImage} alt="Output" className="w-full" />
              </div>
            )}
          </section>
          <section className="w-full max-w-2xl gap-2 text-center">
            <ColorCountSlider
              value={colorCount}
              onChange={(changedColorCount) => setColorCount(changedColorCount)}
            />
          </section>
        </div>
      </main>
    </>
  );
}
