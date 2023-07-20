import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hook/useAuth';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { io } from 'socket.io-client';



const Register = () => {
    const { registerByEmailPass, user, updateUserInfo } = useAuth();
    const [passwordType, setPasswordType] = useState('password');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const navigate = useNavigate();
   


    // handle password type change
    const handlePassType = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
        }
        else {
            setPasswordType('password')
        }
    }

    // handle submit
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;

        // console.log(name, email, password, photo)


        registerByEmailPass(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                // user creat to database
                const saveUser = { name: name, email: email, photo: photo, };

                fetch('https://chat-web-app-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)

                }).then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {

                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setPassError('');
                            setEmailError('');
                            form.reset();
                            navigate('/login');
                        }
                        console.log(data)
                    })

                // update profile
                updateUserInfo(name, photo)
                    .then()
                    .catch(error => {
                        console.log(error)
                    });
                navigate('/login');
            }
            )
            .catch(error => {
                console.log(error);
                if (error.message === 'Firebase: Error (auth/invalid-email).') {
                    setPassError('');
                    setEmailError('Please provide valid email format')
                }
                else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setPassError('');
                    setEmailError('Already account created for this email')
                }
                else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    setEmailError('');
                    setPassError('Password should be at least 6 characters')
                }
                else {
                    setPassError('');
                }

            })

        // console.log(name, email, password, photo)
    }
   

    return (
        <section className='bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen px-4 py-6 md:py-12 md:px-16'>
            <div className="hero">
                <div className="lg:w-3/4 flex justify-center">

                    <div className="w-full md:w-1/2 shadow-2xl rounded-lg">
                        <div>
                            <div className="card-body ">
                                <div>
                                    <h1 className="text-2xl lg:text-4xl font-bold mb-3">Register</h1>
                                    <p>Already have an account?  <Link className='text-white' to='/login'>Login</Link></p>
                                </div>
                                {/* form start */}
                                <form onSubmit={handleSubmit} >
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" name='name' placeholder="Name" required className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name='email' placeholder="Email" required className="input input-bordered" />
                                        <p className='text-red-500 text-sm'>
                                            <small>{emailError}</small>
                                        </p>
                                    </div>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type={passwordType} name='password' placeholder="Password" required className="input input-bordered pr-10" />
                                        <p className='text-red-500 text-sm'>
                                            <small>{passError}</small>
                                        </p>
                                        <div className="absolute right-1 top-11 p-2 rounded-md" onClick={handlePassType}>
                                            {
                                                passwordType === 'password' ?
                                                    <span>  < FaEye ></FaEye></span>
                                                    :
                                                    <span> <FaEyeSlash></FaEyeSlash></span>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo URL</span>
                                        </label>
                                        <input type="text" name='photo' placeholder="Photo URL" required className="input input-bordered" />
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="py-2 btn btn-neutral rounded-lg">Register</button>
                                    </div>
                                </form>
                                {/* form end */}
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;