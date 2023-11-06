import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";
const ChatListHeader = () => {
  const [{ userInfo }, dispatch] = useStateProvider();
  const handleAllContactPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACT_PAGE });
  };
  return (
    <div className={"px-4 py-3 h-16 flex justify-between items-center"}>
      <div className={"cursor-pointer"}>
        {userInfo?.profileImage && (
          <Avatar type={"sm"} image={userInfo?.profileImage} />
        )}
      </div>
      <div className={"flex gap-6"}>
        <BsFillChatLeftTextFill
          className={"text-panel-header-icon cursor-pointer text-xl"}
          onClick={handleAllContactPage}
          title={"new-Chat"}
        />
        <>
          <BsThreeDotsVertical
            className={"text-panel-header-icon cursor-pointer text-xl"}
            title={"chat-menu"}
          />
        </>
      </div>
    </div>
  );
};

export default ChatListHeader;
