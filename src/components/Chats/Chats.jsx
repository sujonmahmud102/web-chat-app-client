import React, { useEffect, useState } from 'react';

const Chats = ({ selectPerson }) => {
    const [chats, setChats] = useState([]);


    useEffect(() => {
        // fetch('https://chat-web-app-server.vercel.app/chats', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(selectPerson)

        // }).then(res => res.json())
        //     .then(data => {
        //         if (data.insertedId) {
        //             console.log('chats conv. added')
        //         }
        //         console.log(data)
        //     });

        // fetch data
        // fetch('https://chat-web-app-server.vercel.app/chats')
        //     .then(res => res.json())
        //     .then(data => setChats(data))


    }, [])

    return (
        <div>
            {
                chats.map(chat => (
                    <div key={chat._id} className='flex p-5  border-b gap-4 hover:bg-gray-500 cursor-pointer'>
                        <img className='w-10 h-10 rounded-full' src={chat.photo} alt="" />
                        <h3 className='text-2xl'>{chat.name}</h3>
                    </div>

                ))
            }

        </div>
    );
};

export default Chats;