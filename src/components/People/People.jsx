import React, { useEffect, useState } from 'react';
import useAuth from '../../hook/useAuth';

const People = ({ setSelectPerson }) => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('https://chat-web-app-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data));

    }, []);

    const handleNameSet = u => {

        const selectP = {
            senderEmail: user.email,
            senderName: user.displayName,
            senderImage: user.photoURL,
            receiverEmail: u.email,
            receiverName: u.name,
            receiverImage: u.photo,
        }
        // console.log(selectP);
        setSelectPerson(selectP);

        const newConversation = {
            senderEmail: user.email,
            senderName: user.displayName,
            senderImage: user.photoURL,
            receiverEmail: u.email,
            receiverName: u.name,
            receiverImage: u.photo

        }

        fetch('https://chat-web-app-server.vercel.app/conversations', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newConversation)

        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('conversation created')
                }
                console.log(data)
            })
    }

    //   handle filter
    const handleFilter = e => {
        setSearchQuery(e.target.value)
    }

    const filteredItems = users.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className=''>

            <div className='my-5 flex justify-center'>
                <div>
                    <input onChange={handleFilter} className="p-1 rounded-md text-black" type="text" name="name" id="" placeholder='search by name' />

                    <ul className='overflow-y-auto'>
                        {

                            filteredItems.map(u =>
                                <li
                                    key={u._id}
                                    onClick={() => handleNameSet(u)}
                                    className="hover:bg-blue-200 cursor-pointer p-1 rounded-md">{u.name} </li>
                            )

                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default People;