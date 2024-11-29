import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import logo from '../assets/logo.png'
import GenerateLink from './generateLink/GenerateLink'

export default function UserHomePage() {
    const [activeComponent,setActiveComponent]=useState('Dashboard')
    return (
        <div id='homepage' className='flex h-screen'>
            <div id='navbar' className='flex flex-[1] flex-col pt-6'>
                <Link className='text-white pb-4 border-b-2 border-gray-500 flex space-x-2 items-center text-xl pl-6'><img src={logo} alt='' width={40} /><h1>SHORTSTA</h1></Link>
                <Link onClick={()=>{setActiveComponent('Dashboard')}} className='text-white py-2 pl-6'>Home</Link>
                <Link onClick={()=>{setActiveComponent('Generate-Link')}} className='text-white py-2 pl-6'>Generate Link</Link>
                <Link onClick={()=>{setActiveComponent('Generate-QR')}} className='text-white py-2 pl-6'>Generate QR</Link>
                <Link onClick={()=>{setActiveComponent('Profile')}} className='text-white py-2 pl-6'>Profile</Link>
            </div>
            <div className='flex-[5] p-8' style={{background:'radial-gradient(circle, blue 1%, transparent)'}}>
                {activeComponent=="Generate-Link" && <GenerateLink />}
            </div>
        </div>
    )
}
