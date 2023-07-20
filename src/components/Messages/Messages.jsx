import { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
import { AiOutlineSend } from "react-icons/ai";
import moment from 'moment';
import EmojiPicker from 'emoji-picker-react';




const Messages = ({ selectPerson }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);


  // msg fetch
  useEffect(() => {
    fetch('https://chat-web-app-server.vercel.app/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
  }, [messages])

  useEffect(() => {
    fetch('https://chat-web-app-server.vercel.app/conversations')
      .then(res => res.json())
      .then(data => setChats(data))
  }, [])

  // onsole.log(messages)

  const findConversationId = chats.find(c => c.senderEmail === user?.email)

  // console.log(findConversationId)

  const handleMessage = (e) => {
    e.preventDefault();
    if (!selectPerson) {
      return alert('Please select a conversation first!')
    }
    const text = e.target.message.value;
    const time = moment().format('MMMM Do YYYY, h:mm:ss a');

    const msg = {
      senderEmail: user?.email,
      senderImage: user?.photoURL,
      conversationId: selectPerson?._id || findConversationId._id,
      receiverEmail: selectPerson?.receiverEmail,
      receiverImage: selectPerson?.receiverImage,
      text,
      time
    }

    // mst send to db
    fetch('https://chat-web-app-server.vercel.app/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(msg)

    }).then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          console.log('messages created');
          e.target.reset();
        }
        console.log(data)
      })

  }


  const filterMsg = messages.filter(m => m.conversationId === (selectPerson?._id || findConversationId?._id))


  // console.log(filterMsg , selectPerson?._id, findConversationId?._id)

  return (
    <div className='w-full  bg-indigo-300 h-[80%] overflow-y-auto py-5'>
      <div className="">
        {/* emoji */}
        <div className="hidden">
          <EmojiPicker />
        </div>

        {
          filterMsg.length === 0 ? <> <h1 className="text-2xl text-center font-semibold mt-5">Start conversation</h1> </> : (
            filterMsg?.map((message) => (
              <div
                key={message._id}
                className={`flex ${user?.email === message.senderEmail ? 'flex-row-reverse' : ''} gap-3 mt-2`}>
                {/* <img className="w-8 h-8 rounded-full mx-1" src={(user?.email === message.senderEmail || user?.email === message.senderEmail) ? user.photoURL : message.receiverImage} alt="" /> */}

                <div className={`${user?.email === message.senderEmail ? 'bg-sky-300' : 'bg-pink-300'} px-3 mx-w-1/3 py-1 rounded-lg mx-5`} title={message.time}>
                  {message.text}
                </div>

              </div>
            ))
          )

        }
      </div>
      <form onSubmit={handleMessage} className="flex absolute  bottom-0 w-full">
        <textarea
          className={`bg-gray-700 w-full h-20 p-2 text-white`}
          type="text"
          placeholder="Chat goes here..."
          required
          name="message"
        // value={message}
        // onChange={handleChange}
        />
        <button className="bg-cyan-500 hover:bg-cyan-300 hover:cursor-pointer px-8">
          <AiOutlineSend />
        </button>

      </form>
    </div>
  );
};

export default Messages;
