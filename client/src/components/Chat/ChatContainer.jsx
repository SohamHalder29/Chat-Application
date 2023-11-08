import { useStateProvider } from "@/context/StateContext";
import React from "react";

const ChatContainer = () => {
  const [{ messages, currentChatUser }] = useStateProvider();

  return (
    <div
      className={
        "h-[80vh] w-full flex relative flex-grow overflow-auto custom-scollbar"
      }>
      <span className={"bg-chat-background h-screen w-screen fixed opacity-10 "} ></span>
      <div
        className={
          " bg-fixed h-full w-full z-0 absolute right-0 top-2"
        }>
        <div
            className={"flex flex-col justify-start w-full overflow-auto gap-1"}>
            {
              messages && messages.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={`${
                      message.senderId === currentChatUser.id
                        ? "justify-end"
                        : "justify-start"
                    } z-10 flex px-4 gap-2`}> 
                    {message.type === "text" && 
                      <div
                        className={`rounded-md text-white px-2 py-1 text-sm flex relative gap-2 max-w-[45%] ${
                          message.senderId === currentChatUser.id
                            ? "bg-incoming-background"
                            : "bg-outgoing-background"
                        }`}> 
                        <span className={"break-all text-white"}> {message.message} </span>
                        </div>}
                    </div>
                    )
                  })
                  }
          </div>
        </div>
      </div>
  );
};

export default ChatContainer;
