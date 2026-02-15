'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TbSwords } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Searchparams } from '@/Redux/Slices/searchSlice';

const Navbar = () => {


  //Functions

      // Redux Slice for Search

        const dispatch= useDispatch();



  return (
<div className="bg-gray-900 h-16 fixed top-0 left-0 w-full z-50 border-b border-[#712cdf70] flex items-center justify-between px-6 shadow-md">
  {/* Logo Section */}
  <Link className="flex items-center space-x-3 cursor-pointer" href={'/'}>
    <TbSwords size={32} className="text-[#702cdf]" />
    <h1 className="text-2xl font-semibold text-white hidden sm:block">Bizzo</h1>
  </Link>

  {/* Right Section */}
  <div className="flex items-center space-x-2 sm:space-x-5">
    {/* Search Bar */}
    <div className="flex items-center bg-gray-800 focus:border-2 focus:border-[#702cdf] rounded-full h-10 px-3 w-[150px] sm:w-[300px]">
      <IoSearchOutline size={18} className="text-[#702cdf]" />
      <input
        type="text"
        placeholder="Search"
        onChange={( e )=> dispatch(Searchparams(e.target.value))}
        className="ml-2 w-full bg-transparent text-white placeholder-gray-400 text-sm outline-none"
      />
    </div>

    {/* User Icon */}
    <Link href={'/user'} className="flex items-center justify-center bg-[#702cdf]/20 hover:bg-[#702cdf]/40 transition-colors duration-200 rounded-full p-2 cursor-pointer">
      <CiUser size={22} className="text-[#702cdf]" />
    </Link>
  </div>
</div>
  )
}

export default Navbar
