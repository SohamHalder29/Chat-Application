import React from 'react'
import Avatar from '../common/Avatar'
import { useStateProvider } from '@/context/StateContext'
import { reducerCases } from '@/context/constants'
import { calculateTime } from '@/utils/CalculateTime'
import MessageStatus from '../common/MessageStatus'
import { FaCamera, FaMicrophone } from 'react-icons/fa'

const ChatListItem = ({data, isContactsPage}) => {
  const [{useInfo, currentChatUser}, dispatch] = useStateProvider();
  const handleContactClick = () =>{
    //if(currentChatUser?.id === data?.id ){
    //}
    if(!isContactsPage){
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          email: data.email,
          id: useInfo?.id === data.senderId ? data.receiverId : data.senderId,
        },
      });
    }else{
    dispatch({type:reducerCases.CHANGE_CURRENT_CHAT_USER, user:{...data}})
    dispatch({type:reducerCases.SET_ALL_CONTACT_PAGE})
    }
  }

  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover rounded-lg`}
      onClick={handleContactClick}>
      <div className={"min-w-fit px-2 pt-3 pb-1"}>
        <Avatar type={"lg"} image={data.profilePicture} />
      </div>
      <div
        className={"min-h-full flex flex-col justify-center mt-3 pr-2 w-full"}>
        <div className={"flex justify-between"}>
          <div>
            <span className={"text-white"}> {data.name} </span>
          </div>
          {!isContactsPage && (
            <div>
              <span
                className={`${
                  data.totalUnreadMessages > 0
                    ? "text-secondary"
                    : "text-icon-green"
                } text-sm`}>
                {calculateTime(data.createAt)}
              </span>
            </div>
          )}
        </div>
        <div
          className={"flex border-b border-conversation-border pb-2 pt-1 pr-2"}>
          <div className={"flex justify-between w-full"}>
            <span className={"text-secondary text-sm line-clamp-1"}>
              {isContactsPage ? (
                data?.about || "\u00A0"
              ) : (
                <div className={"flex items-center gap-1 max-w-[200px]"}>
                  {useInfo && data.senderId === useInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === "text" && (
                    <span className={"truncate"}>{data.message} </span>
                  )}
                  {data.type === "audio" && (
                    <span className={"flex items-center gap-1"}>
                      <FaMicrophone className={"text-panel-header-icon"} />{" "}
                      {data.type}
                    </span>
                  )}
                  {data.type === "image" && (
                    <span className={"flex items-center gap-1"}>
                      {" "}
                      <FaCamera className={"text-panel-header-icon"} />
                      {data.type}
                    </span>
                  )}
                </div>
              )}
            </span>
            {data.totalUnreadMessages > 0 && (
              <span className={"bg-icon-green px-[5px] rounded-full text-sm"}>
                {data.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem
