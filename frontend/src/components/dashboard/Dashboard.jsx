import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../api/api'
import { Modal, Snackbar } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

const LinkDetailsTable = ({ links, loadData, setLoadData }) => {
    const [currentLink, setCurrentLink] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const baseUrl = document.baseURI

    const deleteLink = async () => {
        try {
            const response = await axios.delete(apiUrl + `/remove-link/${currentLink}`)
            console.log(response);
            setOpenModal(false)
            setLoadData(!loadData)
        }
        catch (err) {

        }
    }
    return (
        <div>
            <TableContainer
                component={Paper}
                style={{
                    background: 'rgba(0,0,0,0.4)',
                    overflow: 'auto',
                    maxWidth: '100%',
                    maxHeight: '50vh',
                    border: '2px solid blue',
                    borderRadius: '10px',
                    position: 'relative',
                    scrollbarWidth: 'none'
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
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="left">
                                Short Link
                            </TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="left">
                                Actual URL
                            </TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                                Clicks
                            </TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {links?.length == 0 ?
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '20px', textOverflow: 'ellipsis' }}
                            >
                                <TableCell
                                    colSpan={5}
                                    component="th"
                                    scope="row"
                                    style={{padding:'20px',textAlign:'center', flex: 1, color: 'white' }}
                                >
                                    No Links Generated
                                </TableCell>
                            </TableRow> : ''
                        }
                        {links.map((link) => (
                            <TableRow
                                key={link._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '20px', textOverflow: 'ellipsis' }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ flex: 1, color: 'white' }}
                                >
                                    {link.title}
                                </TableCell>
                                <TableCell align="left" style={{ flex: 1, color: 'white' }}>
                                    {`${baseUrl}${link.link}`}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        maxWidth: '100px',
                                        maxHeight: '10px',
                                        overflow: 'hidden',
                                        color: 'white',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {link.actualUrl}
                                </TableCell>
                                <TableCell align="right" style={{ flex: 1, color: 'white' }}>
                                    {link.clicks}
                                </TableCell>
                                <TableCell style={{ flex: 1, color: 'white', }}>
                                    <div className='flex justify-end space-x-4'>
                                        <DeleteForeverOutlinedIcon onClick={() => { setCurrentLink(link._id); setOpenModal(true) }} htmlColor='red' titleAccess='Delete' />
                                        <DriveFileRenameOutlineRoundedIcon htmlColor='green' titleAccess='Edit link' />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={openModal}
                onClose={() => { setOpenModal(false) }}
                sx={{ backgroundColor: 'rgba(0,0,0,.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none' }}
            >
                <div className='flex flex-col space-y-4 items-center p-8 rounded-xl'>
                    <h1 className='text-2xl text-white'>Are you sure?</h1>
                    <div className='flex space-x-4'>
                        <button onClick={deleteLink} className='p-4 w-32 bg-green-600 text-white text-xl rounded-2xl'>Yeah</button>
                        <button onClick={() => { setOpenModal(false) }} className='p-4 w-32 bg-red-600 text-white text-xl rounded-2xl'>Not sure</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};


export default function Dashboard() {
    const [loadData, setLoadData] = useState(false)
    const [links, setLinks] = useState([])
    const [snackbar, setSnackbar] = useState({ open: false, message: '' })
    const userId = localStorage.getItem('userId')

    const getLinks = async () => {
        try {
            const response = await axios.get(apiUrl + `/get-all-links/${userId}`)
            setLinks(response.data.data)
            setSnackbar({ open: true, message: 'Data Fetched successfully' })
        } catch (err) {
            setSnackbar({ open: true, message: err })
        }
    }
    useEffect(() => {
        getLinks()
    }, [loadData])
    if(userId!='' && userId!=null)
    return (
        <div id='dashboard' style={{ scrollbarWidth: 'none' }} className='text-white h-[90vh] overflow-scroll'>
            <div className='flex flex-col space-y-8'>
                <h1 className='text-3xl font-bold'>Hey Raushan</h1>
                <div id='section1' className='flex justify-between space-x-4 mt-8'>
                    <div id="link-details" className='flex-[1] bg-black/50 px-6 border-2 border-blue-600 py-10 rounded-xl'>
                        <h3 className='text-xl'>No.of links generated : {links.length}</h3>
                        <h3 className='text-xl'>No. of times clicks/redirected : {links.reduce((v,x)=>{
                            v+=x.clicks
                            return v
                        },0)}</h3>
                    </div>
                    <div id="qr-details" className='flex-[1] bg-black/50 px-6 border-2 border-blue-600 py-10 rounded-xl'>
                        <h3 className='text-xl'>No.of QR's generated : 30</h3>
                        <h3 className='text-xl'>No. of times scanned/redirected : 30</h3>
                    </div>
                </div>
                <div id="section2">
                    <LinkDetailsTable links={links} loadData={loadData} setLoadData={setLoadData} />
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
