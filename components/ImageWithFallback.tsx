import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  fallBackSrc: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  layout?: "responsive" | "fill" | "intrinsic" | "fixed";
  unoptimized?: boolean;
};

const ImageWithFallback: React.FC<Props> = ({
  src,
  fallBackSrc,
  layout = "fill",
  ...props
}) => {
  const [imgSource, setImgSource] = useState(src);
  // const imgRef = useRef<HTMLImageElement>(null);
  // useEffect(() => {
  //   // Add placeholder image if the image has not been loaded properly
  //   if (imgRef.current && imgRef.current.naturalWidth === 0) {
  //     setImgSource(fallBackSrc);
  //   }
  // }, []);

  // Add placeholder image if the image has not been loaded properly
  const handleError = () => {
    setImgSource(fallBackSrc);
  };

  const handlePossibleError: ReactEventHandler<HTMLImageElement> = (e) => {
    // Add placeholder image if the image has not been loaded properly
    if (e.currentTarget.naturalWidth === 0) {
      setImgSource(fallBackSrc);
    }
  };

  return (
    <Image
      loader={() => imgSource}
      layout={layout}
      src={imgSource}
      {...props}
      className="object-scale-down"
      onError={handleError}
      onLoad={handlePossibleError}
    />
  );
};

export default ImageWithFallback;
