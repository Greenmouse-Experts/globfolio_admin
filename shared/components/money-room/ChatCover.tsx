import Image from 'next/image'
import React from 'react'

const ChatCover = () => {
  return (
    <>
        <div className='w-full h-full place-center bg-chat rounded-r-[15px]'>
            <div>
                <Image src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1692974669/globfolio/chat_b0bmyv.png' alt='chat' width={500} height={400} className='w-4/12 mx-auto'/>
                <p className='text-center fw-600 text-4xl mt-8'>Start a chat</p>
            </div>
        </div>
    </>
  )
}

export default ChatCover