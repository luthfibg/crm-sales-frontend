import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FormatListNumberedRtlOutlinedIcon from '@mui/icons-material/FormatListNumberedRtlOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import '../styles/init.css';

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
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'person', headerName: 'Nama', width: 150, editable: true },
        { field: 'person_address', headerName: 'Alamat', width: 150, editable: true },
        { field: 'institution', headerName: 'Institusi', width: 150, editable: true },
        { field: 'position', headerName: 'Posisi', width: 150, editable: true },
        { field: 'institution_address', headerName: 'Alamat Institusi', width: 150, editable: true },
        { field: 'status', headerName: 'Status', width: 100, editable: true },
        { field: 'descriptions', headerName: 'Deskripsi', width: 200, editable: true },
    ];

    const handleEditClick = () => {
        if (rowSelectionModel.length === 1) {
            navigate(`/edit_contact/${rowSelectionModel[0]}`);
        }
    };

    const handleDelete = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (contactId) => {
                    await axios.delete("http://localhost:2999/data/contacts/" + contactId);
                    console.log('Check contactId retrieved: '+contactId); // test passed
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
        <Box sx={{ height: 400, width: '100%', mb: '2rem' }}>
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
        <Stack direction="row" spacing={2}>
            <Button sx={{ textTransform: 'none' }} variant="outlined" component={Link} to="/add_contact">
                <AddIcon />&nbsp;
                Kontak Baru
            </Button>
            <Button
                sx={{ textTransform: 'none' }}
                variant="outlined"
                disabled={rowSelectionModel.length !== 1}
                onClick={handleEditClick}
                component={Link}
                to={`/update_contact/${rowSelectionModel[0]}`}>
                <EditIcon />&nbsp;
                Update Kontak
            </Button>
            <Button
                sx={{ textTransform: 'none' }}
                variant="outlined"
                color="error"
                disabled={rowSelectionModel.length < 1}
                onClick={handleDelete}>
                <RemoveCircleOutlineIcon />&nbsp;
                Hapus Kontak
            </Button>
            <Button sx={{ textTransform: 'none' }} variant="outlined" href="#">
                <FormatListNumberedRtlOutlinedIcon />&nbsp;
                Lihat Semua
            </Button>
        </Stack>
        </>
    )

}