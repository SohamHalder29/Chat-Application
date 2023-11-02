import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

const PhotoLibrary = ({ setPhoto, hidePhotoLibrary }) => {
  const images = [
    "/avaters/1.png",
    "/avaters/2.png",
    "/avaters/3.png",
    "/avaters/4.png",
    "/avaters/5.png",
    "/avaters/6.png",
    "/avaters/7.png",
    "/avaters/8.png",
    "/avaters/9.png",
  ];

  return (
    <div className="fixed top-0 left-0 max-h-screen max-w-[100vw] h-full w-full flex justify-center items-center">
      <div className="h-max w-max bg-slate-800 gap-6 rounded-lg p-4">
        <div
          onClick={() => hidePhotoLibrary(false)}
          className="pt-2 pr-2 flex items-end justify-end cursor-pointer"
        >
          <IoClose className="h-10 w-10 cursor-pointer" />
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-16 p-20 w-full">
          {images.map((image, idx) => (
            <div
              key={idx} // Add a unique key for each item
              onClick={() => {
                setPhoto(images[idx]);
                hidePhotoLibrary(false);
              }}
            >
              <div className="h-24 w-24 cursor-pointer relative">
                <Image src={image} alt="avatar" fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLibrary;
