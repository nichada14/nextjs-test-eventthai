"use client";

import { useRouter } from "next/navigation"; 

const Navbar = () => {
  const router = useRouter(); 

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    router.push("/login"); 
  };

  return (
    <nav className="flex p-4 bg-transparent">
      <button 
        onClick={handleLogout}
        className="px-4 py-2 ml-auto text-white bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
