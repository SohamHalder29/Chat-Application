import React from 'react'
import Avatar from '../common/Avatar'
import { useStateProvider } from '@/context/StateContext'
import {BsFillChatLeftTextFill, BsThreeDotsVertical} from 'react-icons/bs'
const ChatListHeader = () => {
    const [{userInfo}, dispatch] = useStateProvider();
  return (
    <div className={'px-4 py-3 h-16 flex justify-between items-center'} >
    <div className={'cursor-pointer'} >
    { userInfo?.profileImage && <Avatar type={"sm"}  image={userInfo?.profileImage} />}
    </div>
    <div className={'flex gap-6'} > 
    <BsFillChatLeftTextFill />
    </div>
    </div>
  )
}

export default ChatListHeader