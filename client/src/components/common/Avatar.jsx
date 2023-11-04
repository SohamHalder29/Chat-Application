import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

const Avatar = ({ type, image, setImage }) => {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisiblr] = useState(false);
  const [contextMenuCoordinate, setContextMenuCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [grabImage, setGrabImage] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoordinate({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisiblr(true);
  };

  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event) {
      if (event.target.result) {
        data.src = event.target.result;
        data.setAttribute("data-src", event.target.result);
      } else {
        alert("failed");
      }
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      console.log(data.src);
      setImage(data.src);
    }, 100);
  };

  useEffect(() => {
    if (grabImage) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabImage(false);
        }, 1000);
      };
    }
  }, [grabImage]);

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callBack: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: "Upload from Galary",
      callBack: () => {
        setGrabImage(true);
      },
    },
    {
      name: "Choose from Libary",
      callBack: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Remove Photo",
      callBack: () => {
        setImage("/default_avatar.png");
      },
    },
  ];

  return (
    <>
      <div className={"flex justify-center items-center"}>
        {type === "sm" && (
          <div className={"relative h-10 w-10 cursor-pointer"}>
            <Image src={image} alt={"avater"} className={"rounded-full"} fill sizes={'max-width:100px max-height:100px'} />
          </div>
        )}
        {type === "lg" && (
          <div className={"relative h-16 w-16 cursor-pointer"}>
            <Image src={image} alt={"avater"} className={"rounded-full"} fill />
          </div>
        )}
        {type === "xl" && (
          <div
            className={`relative z-0 cursor-pointer`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <div
              className={`bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex flex-col justify-center gap-2 text-center items-center rounded-full ${
                hover ? "visible" : "hidden"
              } z-10`}
              onClick={(e) => showContextMenu(e)}
              id={"context-opener"}>
              <FaCamera
                className={"text-2xl"}
                id={"context-opener"}
                onClick={(e) => showContextMenu(e)}
              />
              <span onClick={(e) => showContextMenu(e)} id={"context-opener"}>
                Change Profile Photo
              </span>
            </div>
            <div
              className={"relative flex items-center justify-center h-60 w-60"}>
              <Image
                src={image}
                alt={"avater"}
                className={"rounded-full"}
                fill
              />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinate}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisiblr}
        />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary
          setPhoto={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />
      )}
      {grabImage && <PhotoPicker onChange={photoPickerChange} />}
      {showCapturePhoto && <CapturePhoto setPhoto={setImage} hide={setShowCapturePhoto} />}
    </>
  );
};

export default Avatar;
