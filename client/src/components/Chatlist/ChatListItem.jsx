import React from 'react'
import Avatar from '../common/Avatar'
import { useStateProvider } from '@/context/StateContext'
import { reducerCases } from '@/context/constants'

const ChatListItem = ({data, isContactPage=false}) => {
  const [{useInfo, currentChatUser}, dispatch] = useStateProvider();
  const handleContactClick = () =>{
    //if(currentChatUser?.id === data?.id ){
    //}
    dispatch({type:reducerCases.CHANGE_CURRENT_CHAT_USER, user:{...data}})
    dispatch({type:reducerCases.SET_ALL_CONTACT_PAGE})
  }

  return (
    <div className={`flex cursor-pointer items-center hover:bg-background-default-hover rounded-lg`}
    onClick={handleContactClick}
    >
    <div className={'min-w-fit px-2 pt-3 pb-1'} >
    <Avatar type={"lg"} image={data.profilePicture} />
    </div>
    <div className={'min-h-full flex flex-col justify-center mt-3 pr-2 w-full'} >
    <div className={'flex justify-between'} >
    <>
      <span className={'text-white'} > {data.name} </span>
    </>
    </div>
    <div className={'flex border-b border-conversation-border pb-2 pt-1 pr-2'} >
    <div className={'flex justify-between w-full'} > 
    <span className={'text-secondary text-sm line-clamp-1'} > {data?.about || "\u00A0"} </span>
    </div>
    </div>
    </div>
    </div>
  )
}

export default ChatListItem