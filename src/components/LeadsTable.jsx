import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FormatListNumberedRtlOutlinedIcon from '@mui/icons-material/FormatListNumberedRtlOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import darkTheme from '../styles/darkTheme';
import '../styles/init.css';

export default function LeadsTable() {
    const [leads, setLeads] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const navigate = useNavigate();
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)

    useEffect(() => {
        const fetchAllLeads = async () => {
            try {
                const res = await axios.get(`http://localhost:2999/${username}/data/leads`);
                setLeads(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllLeads();
    }, [username]);

    const leadColumns = [
        { field: 'id', headerName: 'ID', width: 70, headerClassName: 'super-app-theme--header' },
        { field: 'lead_title', headerName: 'Nama Lead', width: 150, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'person', headerName: 'Pelanggan', width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'institution', headerName: 'Institusi', width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'descriptions', headerName: 'Deskripsi', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'trade_value', headerName: 'Value', width: 100, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'lead_status', headerName: 'Status Lead', width: 150, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'unqualified_reason', headerName: 'Alasan Diskualifikasi', width: 150, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'lead_age', headerName: 'Umur Lead', width: 70, headerClassName: 'super-app-theme--header' },
        { field: 'notes', headerName: 'Catatan', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
    ];

    const handleEditClick = () => {
        if (rowSelectionModel.length === 1) {
            navigate(`/${username}/update_lead/${rowSelectionModel[0]}`);
        }
    };

    const handleDelete = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (leadId) => {
                    console.log('Check leadId retrieved: '+leadId); // test passed
                    await axios.delete(`http://localhost:2999/${username}/data/leads/`+leadId);
                }));
                // Refresh the leads data after deletion
                const res = await axios.get(`http://localhost:2999/${username}/data/leads`);
                setLeads(res.data);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handlePaginationModelChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel);
    };

    return (
        <>
        <Box sx={{
            height: 400,
            width: '100%',
            mb: '1rem',
            '& .super-app-theme--header': {
                backgroundColor: 'rgba(33, 45, 51, 1.0)',
            }, }} bgcolor={darkTheme.palette.background.paper2}>
            <DataGrid
                rows={leads.map((lead, index) => ({ id: index + 1, ...lead }))}
                columns={leadColumns}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                sx={{ 
                    '@media (min-width: 1200px)': {fontSize: 12}
                }}
            />
        </Box>
        <Stack 
        direction="row"
        width={'100%'}
        spacing={0.5}
        bgcolor={darkTheme.palette.background.paper2}
        sx={{ 
            justifyContent: 'flex-end',
            p: '0.5rem',
            borderRadius: '0.2rem',
        }}>
            <IconButton 
            sx={{ textTransform: 'none' }} 
            color='primary'
            onClick={() => navigate(`/${username}/add_lead`)}
            cursor={'pointer'}>
                <AddIcon fontSize='small'/>
            </IconButton>
            
            <IconButton
                sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
                size='small'
                variant="outlined"
                disabled={rowSelectionModel.length !== 1}
                color='primary'
                onClick={handleEditClick}
                cursor={'pointer'}>
                <EditIcon fontSize='small'/>
            </IconButton>
            <IconButton
                sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
                size='small'
                variant="outlined"
                color="error"
                disabled={rowSelectionModel < 1}
                onClick={handleDelete}>
                <RemoveCircleOutlineIcon fontSize='small'/>
            </IconButton>
            <IconButton
            sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
            size='small'
            color='primary'>
                <FormatListNumberedRtlOutlinedIcon fontSize='small' />
            </IconButton>
        </Stack>
        </>
    )

}