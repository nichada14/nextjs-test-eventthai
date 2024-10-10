"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const EditUser = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [email, setEmail] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const response = await axios.get(`https://reqres.in/api/users/${id}`);
                    const userData = response.data.data;
                    setEmail(userData.email);
                    setFirst_name(userData.first_name);
                    setLast_name(userData.last_name);
                } catch (error) {
                    console.error("Error fetching user:", error);
                } finally {
                    setIsLoading(false); 
                }
            } else {
                setIsLoading(false); 
            }
        };

        fetchUser();
    }, [id]);

    const handleEdit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.put(`https://reqres.in/api/users/${id}`, {
                email,
                first_name,
                last_name,
            });

            await Swal.fire({
                title: 'Updated!',
                text: 'User details have been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            router.push('/users');
        } catch (error) {
            console.error("Error updating user:", error);
            await Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the user.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-200">
                <div className="text-center">
                    <div className="mb-4 text-2xl font-semibold text-indigo-500">Loading user data...</div>
                    <div className="w-10 h-10 mx-auto border-4 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="w-full max-w-lg lg:max-w-xl">
                <div className="px-4 pt-4 pb-4 bg-gray-200 border-2 border-indigo-400 rounded-2xl">
                    {/* form section */}
                    <form onSubmit={handleEdit} className="p-2">
                        <h2 className="text-2xl font-bold text-center text-indigo-400">Edit User</h2>
                        <label htmlFor="first_name" className="flex p-2 font-bold text-indigo-400">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            className="w-full px-3 py-3 border-2 border-indigo-300 rounded-2xl"
                            required
                        />
                        <label htmlFor="last_name" className="flex p-2 font-bold text-indigo-400">Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            className="w-full px-3 py-3 border-2 border-indigo-300 rounded-2xl"
                            required
                        />
                        <label htmlFor="email" className="flex p-2 font-bold text-indigo-400">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-3 border-2 border-indigo-300 rounded-2xl"
                            required
                        />
                        {/* button section */}
                        <div className="mt-6">
                            <button type="submit" className="w-full py-3 font-semibold text-white bg-indigo-400 rounded-2xl hover:bg-indigo-500">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
