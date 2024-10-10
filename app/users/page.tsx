"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Users = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://reqres.in/api/users");
                setUsers(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold text-indigo-400">User List</h2>
            <table className="min-w-full text-center border">
                <thead>
                    <tr className="text-xs font-semibold tracking-widest text-white uppercase bg-indigo-400 ">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">First Name</th>
                        <th className="p-2 border">Last Name</th>
                        <th className="p-2 border">Avatar</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="p-2 border">{user.id}</td>
                            <td className="p-2 border">{user.first_name}</td>
                            <td className="p-2 border">{user.last_name}</td>
                            <td className="flex items-center justify-center p-2 border">
                                <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.first_name} />
                            </td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => router.push(`/edit-user?id=${user.id}`)}
                                    className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button 
                                    className="px-4 py-2 ml-4 text-white bg-red-500 rounded hover:bg-red-600" 
                                    onClick={() => router.push(`/delete-user?id=${user.id}`)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
