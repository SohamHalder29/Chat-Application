import React, { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const CapturePhoto = ({ hide, setPhoto }) => {
  const vedioRef = useRef(null);

    useEffect( ()=>{
        let stream;
        const startCamera = async () =>{
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            vedioRef.current.srcObject = stream;
        }
        startCamera();
        return () =>{
            stream?.getTracks().forEach((track) => track.stop());
        }
    },[])

    const capturePhoto = () =>{
        const canvas = document.createElement("canvas");
        canvas.getContext("2d").drawImage(vedioRef.current, 0, 0, 300, 150);
        setPhoto(canvas.toDataURL("image/jpeg"));
        hide(false);
    }

  return (
    <div
      className={
        "absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 pt-2 rounded-lg flex items-center justify-center"
      }>
      <div className={"flex flex-col gap-4 w-full justify-center"}>
        <div
          onClick={() => hide(false)}
          className='pt-2 pr-2 flex items-end justify-end cursor-pointer'>
          <IoClose className='h-10 w-10 cursor-pointer' />
        </div>
        <div className={"flex justify-center"}>
          <video id={"vedio"} width={400} height={400} ref={vedioRef}></video>
        </div>
        <button
          className={
            "h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10"
          }
          onClick={capturePhoto}></button>
      </div>
    </div>
  );
};

export default CapturePhoto;
