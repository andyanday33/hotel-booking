import { RoomImage } from "@prisma/client";
import React from "react";
import ImageWithFallback from "./ImageWithFallback";

type Props = {
  images: RoomImage[];
  width?: number;
  height?: number;
};

const Carousel = ({ images, ...props }: Props) => {
  return (
    <div className="carousel w-full">
      {images.map((image, i) => {
        return (
          <div
            id={`slide${i}`}
            key={i}
            className="carousel-item relative justify-center w-full"
          >
            {/* <img src="https://placeimg.com/800/200/arch" className="w-full" /> */}
            <ImageWithFallback
              src={image.url}
              fallBackSrc="/placeholder.jpeg"
              layout="intrinsic"
              {...props}
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${i - 1 < 0 ? images.length - 1 : i - 1}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${(i + 1) % images.length}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        );
      })}
      {/* 
      <div id="slide2" className="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Carousel;
