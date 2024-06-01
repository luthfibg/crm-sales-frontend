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

export default function LeadsTable() {
    const [leads, setLeads] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllLeads = async () => {
            try {
                const res = await axios.get('http://localhost:2999/data/leads');
                setLeads(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllLeads();
    }, []);

    const leadColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'invoice_date', headerName: 'Invoice', width: 130, editable: true },
        { field: 'lead_title', headerName: 'Nama Lead', width: 150, editable: true },
        { field: 'sales_name', headerName: 'Nama Sales', width: 150, editable: true },
        { field: 'person', headerName: 'Pelanggan', width: 150 },
        { field: 'institution', headerName: 'Institusi', width: 150 },
        { field: 'descriptions', headerName: 'Deskripsi', width: 200, editable: true },
        { field: 'trade_value', headerName: 'Value', width: 100, editable: true },
        { field: 'lead_stage', headerName: 'Tahap Lead', width: 150, editable: true },
        { field: 'lead_status', headerName: 'Status Lead', width: 150, editable: true },
        { field: 'notes', headerName: 'Catatan', width: 200, editable: true },
        { field: 'deal_date', headerName: 'Tanggal Deal', width: 150, editable: true },
    ];

    const handleEditClick = () => {
        if (rowSelectionModel.length === 1) {
            navigate(`/edit_contact/${rowSelectionModel[0]}`);
        }
    };

    const handleDelete = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (leadId) => {
                    await axios.delete("http://localhost:2999/data/leads/"+leadId);
                    console.log('Check leadId retrieved: '+leadId); // test passed
                }));
                // Refresh the leads data after deletion
                const res = await axios.get('http://localhost:2999/data/leads');
                setLeads(res.data);
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
                rows={leads.map((lead, index) => ({ id: index + 1, ...lead }))}
                columns={leadColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
            />
        </Box>
        <Stack direction="row" spacing={2}>
            <Button sx={{ textTransform: 'none' }} variant="outlined" component={Link} to="/add_lead">
                <AddIcon />&nbsp;
                Lead Baru
            </Button>
            
            <Button
                sx={{ textTransform: 'none' }}
                variant="outlined"
                disabled={rowSelectionModel.length !== 1}
                onClick={handleEditClick}>
                <EditIcon />&nbsp;
                Edit Lead
            </Button>
            <Button
                sx={{ textTransform: 'none' }}
                variant="outlined"
                color="error"
                disabled={rowSelectionModel < 1}
                onClick={handleDelete}>
                <RemoveCircleOutlineIcon />&nbsp;
                Hapus Lead
            </Button>
            <Button sx={{ textTransform: 'none' }} variant="outlined" href="#text-buttons">
                <FormatListNumberedRtlOutlinedIcon />&nbsp;
                Lihat Semua
            </Button>
        </Stack>
        </>
    )

}