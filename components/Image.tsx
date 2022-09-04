import React, { ReactEventHandler, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  fallBackSrc: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

const Image: React.FC<Props> = ({ src, fallBackSrc, ...props }) => {
  const [imgSource, setImgSource] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Add placeholder image if the image has not been loaded properly
    if (imgRef.current && imgRef.current.naturalWidth === 0) {
      console.log("aaaaaaaaa");
      setImgSource(fallBackSrc);
    }
  }, []);

  return (
    <img ref={imgRef} src={imgSource} {...props} className="object-cover" />
  );
};

export default Image;
