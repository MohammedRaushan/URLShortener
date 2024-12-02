import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../api/api'
import { Snackbar } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const LinkDetailsTable = ({ links }) => {
    return (
        <TableContainer
            component={Paper}
            style={{
                background: 'rgba(0,0,0,0.4)',
                overflow: 'auto',
                maxWidth: '100%',
                maxHeight: '50vh',
                border: '2px solid blue',
                borderRadius:'10px',
                position: 'relative',
                scrollbarWidth:'none'
            }}
        >
            <Table
                sx={{ minWidth: 650, tableLayout: 'fixed' }}
                aria-label="simple table"
            >
                <TableHead
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        background: 'rgba(13, 17, 23, 0.8)', // Transparent black-blue color
                        backdropFilter: 'blur(5px)', // Adds a blur effect to the header
                    }}
                >
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                            Short Link
                        </TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                            Actual URL
                        </TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                            Clicks
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {links.map((link) => (
                        <TableRow
                            key={link._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ flex: 1, color: 'white' }}
                            >
                                {link.title}
                            </TableCell>
                            <TableCell align="right" style={{ flex: 1, color: 'white' }}>
                                {link.link}
                            </TableCell>
                            <TableCell
                                align="right"
                                style={{
                                    overflow: 'hidden',
                                    maxWidth: '100px',
                                    maxHeight: '20px',
                                    color: 'white',
                                }}
                            >
                                {link.actualUrl}
                            </TableCell>
                            <TableCell align="right" style={{ flex: 1, color: 'white' }}>
                                {link.clicks}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


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
        <div id='dashboard' style={{scrollbarWidth:'none'}} className='text-white h-[90vh] overflow-scroll'>
            <div className='flex flex-col space-y-8'>
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
                <div id="section2" className=''>
                    <LinkDetailsTable links={links} />
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
