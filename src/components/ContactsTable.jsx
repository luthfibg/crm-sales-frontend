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
import '../styles/init.css';
import darkTheme from '../styles/darkTheme';
  

export default function ContactsTable() {
    const [contacts, setContacts] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllContacts = async () => {
            try {
                const res = await axios.get('http://localhost:2999/data/contacts');
                setContacts(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllContacts();
    }, []);

    const contactColumns = [
        // with custom datagrid header
        { field: 'id', headerName: 'ID', width: 70 , headerClassName: 'super-app-theme--header'},
        { field: 'person', headerName: 'Nama', width: 150, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'person_address', headerName: 'Alamat', width: 150, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'institution', headerName: 'Institusi', width: 150, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'position', headerName: 'Posisi', width: 150, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'institution_address', headerName: 'Alamat Institusi', width: 150, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'status', headerName: 'Status', width: 100, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'descriptions', headerName: 'Deskripsi', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
    ];

    const handleEditClick = () => {
        if (rowSelectionModel.length === 1) {
            navigate(`/update_contact/${rowSelectionModel[0]}`);
            console.log(rowSelectionModel[0]);
        }
    };

    const handleDelete = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (contactId) => {
                    // const contactId = rowSelectionModel[0];
                    await axios.delete("http://localhost:2999/data/contacts/" + contactId);
                    console.log('Check contactId retrieved: '+ contactId); // test passed
                }));
                // Refresh the contacts data after deletion
                const res = await axios.get('http://localhost:2999/data/contacts');
                setContacts(res.data);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
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
                rows={contacts.map((contact, index) => ({ id: index + 1, ...contact }))}
                columns={contactColumns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
            />
        </Box>
        <Stack 
        direction="row"
        width={'100%'}
        spacing={2}
        bgcolor={darkTheme.palette.background.paper2}
        // boxShadow={'0 0.1rem 0.3rem 0 rgba(198, 48, 192, 0.3)'}
        sx={{ 
            justifyContent: 'flex-end',
            p: '0.5rem',
            borderRadius: '0.2rem',
        }}>
            <IconButton
            sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
            size='small'
            color='primary'
            LinkComponent={Link}
            to="/add_contact"
            onClick={() => navigate('/add_contact')}
            cursor={'pointer'}>
                <AddIcon fontSize='small'/>
            </IconButton>
            <IconButton
            sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
            size='small'
            disabled={rowSelectionModel.length !== 1}
            color='primary'
            LinkComponent={Link}
            to={`/update_contact/${rowSelectionModel[0]}`}
            onClick={handleEditClick}
            cursor={'pointer'}>
                <EditIcon fontSize='small'/>
            </IconButton>
            <IconButton
            sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
            size='small'
            disabled={rowSelectionModel.length < 1}
            color='error'
            onClick={handleDelete}
            cursor={'pointer'}>
                <RemoveCircleOutlineIcon fontSize='small'/>
            </IconButton>
            <IconButton
            sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
            size='small'
            color='primary'
            cursor={'pointer'}>
                <FormatListNumberedRtlOutlinedIcon fontSize='small'/>
            </IconButton>
        </Stack>
        </>
    )

}