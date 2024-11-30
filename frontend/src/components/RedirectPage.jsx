import axios from 'axios';
import React, { useEffect } from 'react'
import { apiUrl } from './api/api';
import { Mosaic } from 'react-loading-indicators';

export default function RedirectPage() {
    const redirectLink = async()=>{
        const link = document.baseURI
        const response = await axios.post(apiUrl+"/get-redirect-link",{link})
        window.location=(response.data.data[0].actualUrl);
    }
    useEffect(()=>{
        setTimeout(() => {
            redirectLink()
        }, 4000);
    },[])
  return (
    <div id='redirectpage' className='bg-[transparent] flex justify-center items-center'>
        <Mosaic color={'white'} />
    </div>
  )
}
