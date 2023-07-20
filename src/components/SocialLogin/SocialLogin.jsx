import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hook/useAuth';

const SocialLogin = () => {
    const { createdByGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || '/';

    // user create by google
    const registerByGoogle = () => {
        createdByGoogle()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                const saveUser = { name: loggedUser.displayName, email: loggedUser.email, photo: loggedUser.photoURL };

                fetch('https://chat-web-app-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                    })
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'User Login Successful.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <div onClick={registerByGoogle} className='flex justify-center items-center btn btn-outline btn-light'>
                <div>
                    <FaGoogle></FaGoogle>
                </div>
                <button className='ml-4'>
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;