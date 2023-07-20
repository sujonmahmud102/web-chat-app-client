import React, { useState } from 'react';
import ChatBox from '../ChatBox/ChatBox';
import Messages from '../Messages/Messages';
import useAuth from '../../hook/useAuth';
import NewChat from '../NewChat/NewChat';
import Chats from '../Chats/Chats';
import People from '../People/People';
import Conversation from '../Conversation/Conversation';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';

const ChatContainer = () => {
    const { user, logOut } = useAuth();
    const [selectPerson, setSelectPerson] = useState(null);


    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log('logout')
            })
            .catch((error => {
                console.log(error)
            }))
    }

    const handleDeleteChat = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this conversation!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://chat-web-app-server.vercel.app/conversation-delete/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your conversation has been deleted.',
                                'success'
                            );
                            setSelectPerson('');
                        }
                    })
            }
        })
    }


    return (
        <div className='flex gap-3 h-[700px] p-10 w-full  relative'>

            {/* conversation */}
            <div className='bg-[rgb(60,62,98)] text-white w-1/4 rounded-lg overflow-hidden'>
                <div className='flex justify-between p-2 bg-gray-800 '>

                    <div className='flex gap-3 '>
                        <img className='w-8 h-8 rounded-full' src={user?.photoURL} alt="" />
                        <h3 className='text-xl'>{user.displayName} </h3>
                    </div>

                    <button onClick={handleLogout} className='btn btn-sm'>Logout</button>
                </div>

                {/* conversations */}
                <div className='overflow-y-auto h-[80%]'>
                    <h3 className='text-center text-xl mt-2 underline'>Conversation Lists</h3>
                    <Conversation setSelectPerson={setSelectPerson} />
                </div>
                {/* new chat */}
                <div className='absolute bottom-5 left-16 lg:hidden'>
                    <NewChat setSelectPerson={setSelectPerson} />
                </div>
            </div>

            {/* messages container*/}
            <div className='relative w-2/4 h-full rounded-xl overflow-hidden'>

                <div className='flex justify-between items-center text-white p-2 bg-gray-600 '>
                    <div className='flex items-center'>
                        {selectPerson &&
                            <img className='w-8 h-8 rounded-full mr-5' src={selectPerson?.receiverName === user?.displayName ? selectPerson?.senderImage : selectPerson?.receiverImage} alt="" />
                        }
                        <h1 className='text-xl font-semibold '>
                            {selectPerson ? (selectPerson?.receiverName === user?.displayName ? selectPerson?.senderName : selectPerson?.receiverName) : 'Welcome to web chat'}
                        </h1>
                    </div>

                    {selectPerson &&
                        <span onClick={() => handleDeleteChat(selectPerson?._id)} className={` hover:text-red-500 px-3 py-2 bg-gray-500 rounded-md hover:cursor-pointer`} title='Delete Conversation'>
                            <AiFillDelete></AiFillDelete>
                        </span>
                    }
                </div>

                <Messages selectPerson={selectPerson}> </Messages>

                {/* chat box */}
                {/* <div className='sticky bottom-0 w-full'>
                    <ChatBox>{selectPerson} </ChatBox>
                </div> */}
            </div>

            {/* people */}

            {/* <div className='w-1/4 rounded-xl overflow-y-auto'>
            
                
            </div> */}
            <div className='bg-blue-300 w-1/4 rounded-lg overflow-hidden'>
                <div className='text-center p-2 bg-zinc-400 '>
                    <h1 className='text-xl text-center'>People</h1>
                </div>

                {/* conversations */}
                <div className=' overflow-y-auto h-[80%]'>
                    <People setSelectPerson={setSelectPerson}></People>
                </div>

            </div>
        </div>
    );
};

export default ChatContainer;