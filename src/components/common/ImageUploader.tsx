import React, { useState, useRef, useEffect } from "react";
import readFileAsDataUrl from "~/utils/readFileAsDataUrl";
import clsx from "clsx";
import { RxImage } from "react-icons/rx";

export type ImageUploaderProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  accept?: string;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  className,
  accept,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>();
  const image = isControlled ? value : internalValue;
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  const handleFileSelect = (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    // * important:  add "?" there because "e" may only contains 'target.files' property, see handlePaste function
    e?.preventDefault();
    const file =
      "dataTransfer" in e ? e.dataTransfer.files[0] : e.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file)
      .then((dataUrl) => {
        if (onChange) onChange(dataUrl);
        if (!isControlled) setInternalValue(dataUrl);
      })
      .catch((error) => console.error(error));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item) continue;
      if (item.type.indexOf("image") !== -1) {
        const pasteFile = item.getAsFile();
        if (!pasteFile) continue;
        handleFileSelect({
          target: { files: [pasteFile] },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
        break;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!inputFileRef.current) return;
    if (e.key === "Enter" || e.key === " ") {
      inputFileRef.current.click();
    }
  };

  const handleClick = () => {
    if (!inputFileRef.current) return;
    inputFileRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
        accept={accept || "image/*"}
      />
      <div
        ref={dropZoneRef}
        onPaste={handlePaste}
        onDragOver={handleDragOver}
        onDrop={handleFileSelect}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-describedby="dropZoneDescription"
        className={clsx(
          className,
          "group relative flex h-full cursor-pointer items-center justify-center overflow-hidden"
        )}
      >
        {image && (
          <img
            alt="Preview"
            src={image}
            className="h-full w-full object-cover"
          />
        )}
        {!image && (
          <div className="m-4 w-full text-center">
            <RxImage className=" m-auto w-12 text-8xl" />
            <span className="text-xl  text-blue-950">
              You can click, drag and drop, or paste an image into this area.
            </span>
          </div>
        )}
        {image && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xl text-violet-100">
              Click to upload a new image
            </span>
          </div>
        )}

        <span id="dropZoneDescription" style={{ display: "none" }}>
          Select an image area, you can click, drag and drop, or paste an image
          into this area.
        </span>
      </div>
    </>
  );
};

export default ImageUploader;
