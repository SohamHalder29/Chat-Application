import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";
const VoiceMessage = dynamic( ()=> import ("./VoiceMessage"), {ssr:false});

const ChatContainer = () => {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();

  return (
    <div
      className={
        "h-[80vh] w-full flex relative flex-grow overflow-auto custom-scollbar"
      }>
      <span
        className={
          "bg-chat-background h-screen w-screen fixed opacity-10 "
        }></span>
      <div className={" bg-fixed h-full w-full z-0 absolute right-0 top-2"}>
        <div
          className={"flex flex-col justify-start w-full overflow-auto gap-1"}>
          {messages &&
            messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className={`${
                    message.senderId === currentChatUser.id
                      ? "justify-end"
                      : "justify-start"
                  } z-10 flex px-4 py-2 gap-2`}>
                  {message.type === "text" && (
                    <div
                      className={`rounded-md text-white px-4 py-2 text-sm flex relative gap-2 max-w-[45%] ${
                        message.senderId === currentChatUser.id
                          ? "bg-incoming-background "
                          : "bg-outgoing-background "
                      }`}>
                      <span className={"break-all text-white"}>
                        {message.message}
                      </span>
                      <div className={"flex items-end gap-1"}>
                        <span
                          className={
                            "text-bubble-meta text-[11px] pt-1 min-w-fit"
                          }>
                          {calculateTime(message.createAt)}
                        </span>
                        <span>
                          <MessageStatus
                            messageStatus={message.messageStatus}
                          />
                        </span>
                      </div>
                    </div>
                  )}
                  {message.type === "image" && <ImageMessage message={message} />}
                  {message.type === "audio" && <VoiceMessage message={message} />}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
