"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const DeleteUserContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await axios.get(`https://reqres.in/api/users/${id}`);
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      await Swal.fire({
        title: 'Deleted!',
        text: 'The user has been deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      router.push("/users");
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: 'Error!',
        text: 'There was an error deleting the user.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleCancel = () => {
    router.push("/users");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold text-indigo-500">Loading...</div>
          <div className="w-10 h-10 mx-auto border-4 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 text-center bg-gray-200 rounded shadow-md">
        <h2 className="mb-4 text-2xl">Confirm Deletion</h2>
        <p>Are you sure you want to delete the user with the email: <strong>{user.email}</strong>?</p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 mr-2 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 transition duration-200 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteUser = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold text-indigo-500">Loading...</div>
          <div className="w-10 h-10 mx-auto border-4 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
        </div>
      </div>}>
      <DeleteUserContent />
    </Suspense>
  );
};

export default DeleteUser;
