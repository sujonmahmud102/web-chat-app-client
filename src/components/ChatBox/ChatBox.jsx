import { FaBold, FaItalic, FaStrikethrough, FaLink, FaListUl, FaListOl, FaPlus } from "react-icons/fa";
import { RiCodeSSlashFill } from 'react-icons/ri';
import { PiCodeBlockLight } from "react-icons/pi";
import { TbBlockquote } from "react-icons/tb";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import io from 'socket.io-client';

const ChatBox = ({ children }) => {
    const { user } = useAuth();
    const [message, setMessage] = useState("");
    const [empty, setEmpty] = useState(false);

    // console.log(children[0])

    const handleMessage = (e) => {
        e.preventDefault();
        if (!message) {
            setEmpty(true);
            return alert('Please type message')
        }
        const time = new Date();


        // Emit the message to the server
        const socket = io('https://chat-web-app-server.vercel.app');

        socket.emit('chatMessage', { text: message });


        // const newMessage = {
        //     send: message, senderName: user.displayName, senderEmail: user.email, receiverName: children[0].name, receiverEmail: children[0].email, time
        // }
        // fetch('https://chat-web-app-server.vercel.app/messages', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(newMessage)

        // }).then(res => res.json())
        //     .then(data => {
        //         if (data.insertedId) {
        //             console.log('ok')
        //         }
        //         console.log(data)
        //     })


        // console.log(newMessage);
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
        setEmpty(false);
    };



    return (
        <div className='w-full bg-gray-700 text-white p-3 mx-auto'>

            <div className="flex gap-8">
                <button>
                    <FaBold />
                </button>
                <button> <FaItalic /></button>
                <button>  <FaStrikethrough /></button>
                <button> <FaLink /></button>
                <button> <FaListUl /></button>
                <button> <FaListOl /></button>
                <button> <TbBlockquote /></button>
                <button> <RiCodeSSlashFill /></button>
                <button> <PiCodeBlockLight /></button>
            </div>
            <textarea
                className={`bg-gray-700 ${empty ? "border rounded-md border-red-500" : ""}  my-4 w-full p-2 text-white`}
                placeholder="Chat goes here..."
                required
                value={message}
                onChange={handleChange}
            />
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <button><FaPlus /></button>
                    <button><HiOutlineEmojiHappy /></button>
                    <button><span>@</span></button>
                </div>
                <button onClick={handleMessage} className="bg-cyan-500 hover:bg-cyan-300 px-5 py-1 rounded-md">
                    <AiOutlineSend />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;