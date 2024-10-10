"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://reqres.in/api/login", {
                // email,
                // password,
                email: "eve.holt@reqres.in",
                password: "cityslicka",
            });
            console.log(response.data);

            await Swal.fire({
                title: 'Success!',
                text: 'You have logged in successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            router.push('/users');
        } catch (error) {
            console.error(error);

            await Swal.fire({
                title: 'Error!',
                text: 'Login failed. Please check your credentials.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-400 bg-opacity-10">
            <div className="w-full max-w-xs lg:max-w-sm">
                <div className="px-4 pt-4 pb-4 bg-gray-200 border-2 border-indigo-300 rounded-2xl">
                    <form onSubmit={handleLogin} className="p-2">
                        <h2 className="text-2xl font-bold text-center text-indigo-400">Login</h2>
                        
                        {/* Email input */}
                        <label htmlFor="email" className="flex p-2 font-bold text-indigo-400">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-3 pr-10 leading-tight border-2 border-indigo-400 rounded-2xl focus:bg-white focus:outline-none"
                                required
                            />
                            <MdOutlineMail className="absolute text-xl text-indigo-400 transform -translate-y-1/2 right-3 top-1/2" />
                        </div>

                        {/* Password input */}
                        <label htmlFor="password" className="flex p-2 font-bold text-indigo-400">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-3 pr-10 leading-tight border-2 border-indigo-400 rounded-2xl focus:bg-white focus:outline-none"
                                required
                            />
                            <RiLockPasswordLine className="absolute text-xl text-indigo-400 transform -translate-y-1/2 right-3 top-1/2" />
                        </div>

                        {/* Button section */}
                        <div className="mt-6">
                            <button type="submit" className="w-full py-3 font-semibold text-white bg-indigo-400 rounded-2xl hover:bg-indigo-600">
                                Login
                            </button>
                        </div>
                        <div className="flex items-center justify-start p-4 text-sm font-semibold text-indigo-400">
                            <p>Don&apos;t have an account?</p>
                            <Link href="/register" className="px-1 hover:text-white">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
