import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import logo from '../assets/logo.png'
import GenerateLink from './generateLink/GenerateLink'
import Dashboard from './dashboard/Dashboard'
import GenerateQRCode from './generateQR/GenerateQRCode'
import Profile from './profile/Profile'
import 'animate.css'

export default function UserHomePage() {
    const [slideFrom, setSlideFrom] = useState(1)
    const [activeComponent, setActiveComponent] = useState('Dashboard')
    return (
        <div id='homepage' className='flex h-screen'>
            <div id='navbar' className='flex flex-[1] flex-col pt-6 space-y-2'>
                <Link className='text-white pb-4 border-b-2 border-gray-500 flex space-x-2 items-center text-xl pl-6'><img src={logo} alt='' width={40} /><h1>SHORTSTA</h1></Link>
                <Link onClick={() => {setActiveComponent('Dashboard');setSlideFrom(1); }} className='text-white py-2 pl-6'>Dashboard</Link>
                <Link onClick={() => {setActiveComponent('Generate-Link');setSlideFrom(2); }} className='text-white py-2 pl-6'>Generate Link</Link>
                <Link onClick={() => {setActiveComponent('Generate-QR');setSlideFrom(3); }} className='text-white py-2 pl-6'>Generate QR</Link>
                <Link onClick={() => {setActiveComponent('Profile');setSlideFrom(4); }} className='text-white py-2 pl-6'>Profile</Link>
            </div>
            <div className='flex-[5] p-8' style={{ background: 'radial-gradient(circle, blue 1%, transparent)' }}>
                {activeComponent == "Dashboard" &&
                    <div className={`animate__animated animate__slideInRight`}>
                        <Dashboard />
                    </div>}
                {activeComponent == "Generate-Link" &&
                    <div className={`animate__animated animate__slideInRight`}>
                        <GenerateLink />
                    </div>}
                {activeComponent == "Generate-QR" &&
                    <div className={`animate__animated animate__slideInRight`}>
                        <GenerateQRCode />
                    </div>}
                {activeComponent == "Profile" &&
                    <div className={`animate__animated animate__slideInRight`}>
                        <Profile />
                    </div>}
            </div>
        </div>
    )
}
