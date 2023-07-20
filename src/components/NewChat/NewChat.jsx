import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import { useEffect, useRef, useState } from "react";

const NewChat = ({ setSelectPerson }) => {
    const { user } = useAuth();
    const [close, setClose] = useState(true);
    const [users, setUsers] = useState([]);
    const modalRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        fetch('https://chat-web-app-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data));

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setClose(true);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleNameSet = user => {
        // console.log(user);
        setSelectPerson(user)
    }

    //   handle filter
    const handleFilter = e => {
        setSearchQuery(e.target.value)
    }

    const filteredItems = users.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
            <button onClick={() => setClose(!close)} className="flex items-center justify-center gap-3 bg-gray-800 px-6 py-2 rounded-2xl hover:bg-gray-600"><FaPlusCircle /> New Chat</button>

            {/* modal for new chat */}
            <div ref={modalRef} className={`${close ? 'hidden' : 'block'} absolute -top-[200px] -right-10 bg-blue-500 p-4 rounded-md`}>

                <input onChange={handleFilter} className="p-1 rounded-md text-black" type="text" name="name" id="" placeholder='search by name' />

                <ul className='h-28 overflow-y-auto'>
                    {

                        filteredItems.map(u =>
                            <li
                                key={u._id}
                                onClick={() => handleNameSet(u)}
                                className="hover:bg-error cursor-pointer p-1 rounded-md">{u.name} </li>
                        )

                    }
                </ul>

            </div>

        </div>
    );
};

export default NewChat;