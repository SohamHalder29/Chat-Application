import { useStateProvider } from "@/context/StateContext";
import React from "react";

const ChatContainer = () => {
  const [{ messages, currentChatUser }] = useStateProvider();

  return (
    <div
      className={
        "h-[80vh] w-full flex relative flex-grow overflow-auto custom-scollbar"
      }>
      <div
        className={
          "bg-chat-background bg-fixed h-full w-full bg-[rgb(33,52,25)] z-0 absolute left-0 top-0"
        }>
        <div
            className={"flex flex-col justify-end w-full overflow-auto gap-1"}>
            {
              messages && messages.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={`${
                      message.senderId === currentChatUser.id
                        ? "justify-start"
                        : "justify-end"
                    } z-10`}> 
                    {message.type === "text" && 
                      <div
                        className={`text-white px-2 py-1 text-sm flex items-end gap-2 max-w-[45%] ${
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
