import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../api/api'
import { Snackbar } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const LinkDetailsTable = ({links}) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width:'100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Short Link</TableCell>
                        <TableCell align="right">Actual URL</TableCell>
                        <TableCell align="right">Clicks</TableCell>
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {links.map((link) => (
                        <TableRow
                            key={link._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {link.title}
                            </TableCell>
                            <TableCell align="right">{link.link}</TableCell>
                            <TableCell align="right" width={50} height={30}>{link.actualUrl}</TableCell>
                            <TableCell align="right">{link.clicks}</TableCell>
                            {/* <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function Dashboard() {
    const [links, setLinks] = useState([])
    const [snackbar, setSnackbar] = useState({ open: false, message: '' })

    const getLinks = async () => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.get(apiUrl + `/get-all-links/${userId}`)
            setLinks(response.data.data)
            setSnackbar({ open: true, message: 'Data Fetched successfully' })
        } catch (err) {
            setSnackbar({ open: true, message: err })
        }
    }
    useEffect(() => {
        getLinks()
    }, [])
    return (
        <div id='dashboard' className='text-white h-[100%] overflow-scroll'>
            <div>
                <h1 className='text-3xl font-bold'>Hey Raushan</h1>
                <div id='section1' className='flex justify-between space-x-4 mt-8'>
                    <div id="link-details" className='flex-[1] bg-black/50 px-6 border-2 border-blue-600 py-10 rounded-xl'>
                        <h3 className='text-xl'>No.of links generated : 30</h3>
                        <h3 className='text-xl'>No. of times clicks/redirected : 30</h3>
                    </div>
                    <div id="qr-details" className='flex-[1] bg-black/50 px-6 border-2 border-blue-600 py-10 rounded-xl'>
                        <h3 className='text-xl'>No.of QR's generated : 30</h3>
                        <h3 className='text-xl'>No. of times scanned/redirected : 30</h3>
                    </div>
                </div>
                <div id="section2">
                    {/* <LinkDetailsTable links={links} /> */}
                </div>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbar.open}
                autoHideDuration={2000}
                onClose={() => { setSnackbar({ open: false }) }}
                message={snackbar.message}
            // key={vertical + horizontal}
            />
        </div>
    )
}
