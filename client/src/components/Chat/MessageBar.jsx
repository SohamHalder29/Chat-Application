import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import {
  ADD_IMAGE_MESSAGE,
  ADD_IMAGE_MESSAGE_ROUTE,
  ADD_MESSAGE_ROUTE,
} from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import PhotoPicker from "../common/PhotoPicker";
import dynamic from "next/dynamic"
const CaptureAudio =  dynamic(()=> import("../common/CaptureAudio"), {ssr: false});

const MessageBar = () => {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [grabImage, setGrabImage] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  const photoPickerChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo.id,
          to: currentChatUser.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: response.data.message,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: { ...response.data.message },
          fromSelf: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutSideClick);
    return () => document.removeEventListener("click", handleOutSideClick);
  }, []);

  const handleEmojiModel = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((preMessage) => (preMessage += emoji.emoji));
  };

  const SendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
      socket.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: { ...data.message },
        fromSelf: true,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        "bg-panel-header-background h-20 px-4 flex items-center gap-6 relative"
      }>
      { !showAudioRecorder &&
      <>
        <div className={"flex gap-6"}>
          <BsEmojiSmile
            className={"text-panel-header-icon cursor-pointer text-xl"}
            title={"Emoji"}
            id={"emoji-open"}
            onClick={handleEmojiModel}
          />
          {showEmojiPicker && (
            <div
              className={"absolute bottom-24 left-16 z-40"}
              ref={emojiPickerRef}>
              {" "}
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme={"dark"}
              />{" "}
            </div>
          )}
          <ImAttachment
            className={"text-panel-header-icon cursor-pointer text-xl"}
            title={"Attach File"}
            onClick={() => setGrabImage(true)}
          />
        </div>
        <div className={"w-full flex items-center h-10 rounded-lg"}>
          <input
            type={"text"}
            placeholder={"Type a message "}
            className={
              "bg-input-background text-sm focus:outline-none h-10 rounded-lg text-white px-5 py-4 w-full"
            }
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className={"flex items-center justify-center w-10"}>
          <button>
            {message.length ? (
              <MdSend
                className={"text-panel-header-icon cursor-pointer text-xl"}
                title={"SendMessage"}
                onClick={SendMessage}
              />
            ) : (
              <FaMicrophone
                className={"text-panel-header-icon cursor-pointer text-xl"}
                title={"Record"}
                onClick={()=> setShowAudioRecorder(true)}
              />
            )}
          </button>
        </div>
      </>
      }
      {grabImage && <PhotoPicker onChange={photoPickerChange} />}
      { showAudioRecorder && <CaptureAudio hide={setShowAudioRecorder} />}
    </div>
  );
};

export default MessageBar;
