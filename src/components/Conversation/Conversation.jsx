import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import useAuth from '../../hook/useAuth';

const Conversation = ({ setSelectPerson }) => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);


    useEffect(() => {
        fetch('https://chat-web-app-server.vercel.app/conversations')
            .then(res => res.json())
            .then(data => setConversations(data))
    }, [conversations])


    const handleNameSet = u => {
        // console.log(u);
        setSelectPerson(u);
    }

    const checkSender = conversations.filter(c => (c.senderEmail === user?.email || c.receiverEmail === user?.email))

    // console.log(conversations)
    // console.log(checkSender)

    return (
        <div className=''>

            {checkSender.length > 0 &&
                checkSender.map((c, i) => (
                    <div
                        key={i}
                        onClick={() => handleNameSet(c)}
                        className='flex justify-start items-center p-5  border-b border-b-gray-500 gap-4 hover:bg-gray-500 cursor-pointer '>
                        <img className='w-10 h-10 rounded-full' src={c.senderEmail === user.email ? c?.receiverImage : c?.senderImage} alt="" />

                        <h3 className=''>{c.senderEmail === user.email ? c.receiverName : c.senderName} </h3>

                    </div>
                ))
            }

        </div>
    );
};

export default Conversation;