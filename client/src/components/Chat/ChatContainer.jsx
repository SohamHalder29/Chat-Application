import React from 'react'

const ChatContainer = () => {
  return (
    <div className={'h-[80vh] w-full flex relative flex-grow overflow-auto custom-scollbar'} >
    <div className={'bg-chat-background bg-fixed h-full w-full opacity-5 z-0 fixed left-0 top-0'} >
    <div className={'w-full h-full'} >
    <div className={'flex flex-col justify-end w-full overflow-auto gap-1'} > </div>
    </div>
    </div>
    </div>
  )
}

export default ChatContainer