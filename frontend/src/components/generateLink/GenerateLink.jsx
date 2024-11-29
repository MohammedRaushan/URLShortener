import React, { useState } from 'react'
import taskDone from '../../assets/task-done.webp'
import AssignmentIcon from '@mui/icons-material/Assignment';
import { apiUrl } from '../api/api';
import axios from 'axios'
import { Snackbar } from '@mui/material';


export default function GenerateLink() {
  const [title, setTitle] = useState('')
  const [actualUrl, setActualURL] = useState('')
  const [outputURL, setOutputURL] = useState('')
  const [copySnackBar, setCopySnackbar]=useState(false)
  const generateLink = async () => {
    const userId = localStorage.getItem('userId')
    const baseUrl = document.baseURI
    const linkData = {
      title,
      actualUrl,
      userId
    }
    const response = await axios.post(apiUrl + "/add-link", { linkData, baseUrl })
    if (response.status == 200) {
      setOutputURL(response.data.data.link)
    }
  }
  const copyLink = () => {
    navigator.clipboard.writeText(outputURL)
    setCopySnackbar(true)
  }
  const TaskSuccess = () => {
    return (
      <>
        <img src={taskDone} className='w-20 h-20' alt="" />
        {/* <img src={checked} className='w-20 h-20' alt="" /> */}

        <div className='text-center'>
          <h4 className='text-2xl'>Your generated link:</h4>
          <div className=' flex items-center text-4xl bg-black/20 rounded-xl overflow-hidden'>
            <h1 className='p-2'>{outputURL}</h1>
            <h1 className='bg-black/50 p-2' onClick={copyLink}><AssignmentIcon fontSize='large' /></h1>
          </div>
        </div>
      </>
    )
  }
  return (
    <div id='generateLink'>
      <div id="header">
        <h1 className='text-3xl text-white font-bold '>Generate Shortened URL</h1>
      </div>
      <div id="link-input" className='flex flex-col justify-center items-center my-10 p-4 bg-black/20 rounded'>
        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className='bg-[transparent] outline-none w-full  px-4 text-white pb-2' placeholder='Title' />
        <input type="text" value={actualUrl} onChange={(e) => { setActualURL(e.target.value) }} className='w-full bg-[transparent] px-4 text-white outline-none' placeholder='Your URL' />
        <button onClick={generateLink} className='text-white'>Generate Link</button>
      </div>
      <div id="link-output" className='bg-black/20 text-white h-80 rounded-2xl flex flex-col justify-center items-center space-y-4'>
        <TaskSuccess />
      </div>
      <Snackbar
        anchorOrigin={{ vertical:'bottom',horizontal: 'right' }}
        open={copySnackBar}
        autoHideDuration={2000}
        onClose={()=>{setCopySnackbar(false)}}
        message="Text copied"
        // key={vertical + horizontal}
      />
    </div>
  )
}
