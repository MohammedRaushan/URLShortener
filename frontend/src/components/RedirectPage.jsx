import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiUrl } from './api/api';
import { Mosaic } from 'react-loading-indicators';
import { useParams } from 'react-router-dom';

export default function RedirectPage() {
    const {linkToken} = useParams()
    const [loading,setLoading]=useState(true)

    const redirectLink = async()=>{
        try{
            const response = await axios.post(apiUrl+"/get-redirect-link",{'link':linkToken})
            let data = response.data.data[0]
            data.clicks++
            data = await axios.put(apiUrl+`/edit-link/${data._id}`,{linkData:data})
            console.log(data);
            setTimeout(()=>{
                window.location=(data.data.data.actualUrl);
            },4000)
        }
        catch(err){
            setLoading(false)
        }
    }
    useEffect(()=>{
        redirectLink()
    },[])
  return (
    <div id='redirectpage' className='bg-[transparent] flex justify-center items-center'>
        {loading?<Mosaic color={'white'} />:<h1 className='text-white text-3xl'>Link does not exists or goes inactive</h1>}
    </div>
  )
}
