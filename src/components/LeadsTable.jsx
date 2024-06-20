import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FormatListNumberedRtlOutlinedIcon from '@mui/icons-material/FormatListNumberedRtlOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import darkTheme from '../styles/darkTheme';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Clear from '@mui/icons-material/Clear';
import OnlinePrediction from '@mui/icons-material/OnlinePrediction';
import '../styles/init.css';

const CRMTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 160,
    },
});

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
                // Add id property for DataGrid
                const leadsWithId = res.data.map(lead => ({ ...lead, id: lead.lead_id }));
                setLeads(leadsWithId);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllLeads();
    }, [username]);

    const leadColumns = [
        { field: 'id', headerName: 'ID', width: 30, headerClassName: 'super-app-theme--header', renderHeader: (params) => {
            <Tooltip title="ID Lead"><span>{params.colDef.headerName}</span></Tooltip >
        }},
        { field: 'lead_title', headerName: 'Nama Lead', width: 130, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Judul Lead, Untuk Memudahkan Identifikasi"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'person', headerName: 'Pelanggan', width: 130, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Nama Pelanggan (Link Utama Institusi)"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'institution', headerName: 'Institusi', width: 130, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Nama Institusi Pelanggan"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'descriptions', headerName: 'Deskripsi', width: 200, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Dapat Diisi Dengan Detail Lead"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'trade_value', headerName: 'Value', width: 100, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Besarnya Nilai Potensi Lead (Dalam Rupiah)"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'lead_status',
            headerName: 'Status Lead',
            width: 100,
            editable: true,
            type: 'singleSelect',
            valueOptions: [
                {value: 'baru', label: 'Baru'},
                {value: 'mencoba menghubungi', label: 'Mencoba Menghubungi'},
                {value: 'dihubungi', label: 'Dihubungi'}, 
                {value: 'sukses', label: 'Sukses'}, 
                {value: 'diskualifikasi', label: 'Diskualifikasi'}
            ],
            headerClassName: 'super-app-theme--header',
            renderHeader: (params) => (
                <Tooltip title="Status Lead Saat Ini"><span>{params.colDef.headerName}</span></Tooltip >
            )},
        { field: 'response_time', headerName: 'Waktu Respon', width: 60, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Rata-Rata Durasi Pelanggan Merespon (Dalam Jam)"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'interaction_level', headerName: 'Level Interaksi', width: 60, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Level Interaksi Pelanggan (Menggunakan Skala 1-5, Diisi Menggunakan Perkiraan Anda). 1 berarti sangat rendah, 5 sangat tinggi"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'source', headerName: 'Sumber', width: 60, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Sumber Lead Mendapatkan Informasi Tentang Produk Anda"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'converted', headerName: 'Dikonversi?', width: 70, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Apakah Pelanggan Berhasil Dikonversi? (1 artinya Ya, 0 artinya Tidak). Prediksi Lead Akan Menaruh Nilai Disini, Namun Sifatnya Sementara. Anda Dapat Mengeditnya Untuk Menyimpannya Secara Permanen"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        {
            field: 'xgboost_predict',
            headerName: 'Predict',
            width: 100,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                const lead = leads.find((l) => l.id === params.row.id);
                const convertedValue = lead ? (lead.converted === 1 ? 'convert' : 'disqualify') : '';
                return (
                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }} fontSize={'12px'} color={lead.converted === 1 ? '#69f0ae' : '#ff7043'}>
                        {convertedValue} &nbsp; {convertedValue === 'convert' ? <ArrowUpward fontSize='12px' /> : <Clear fontSize='12px' />}
                    </Typography>
                );
            },
            renderHeader: (params) => (
                <Tooltip title="Hasil Prediksi Lead. Anda Dapat Meng-Klik Untuk Meningkatkannya Ke Opportunity, Atau Menurunkannya Dalam Daftar Lead Terdiskualifikasi"><span>{params.colDef.headerName}</span></Tooltip >
            )
        },
        { field: 'unqualified_reason', headerName: 'Alasan Diskualifikasi', width: 150, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Alasan Leas Didiskualifikasi"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'lead_age', headerName: 'Umur Lead', width: 50, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Umur Lead Saat Ini (Dalam Hari), Dihitung Mulai Lead Ditambahkan. Jika Umur Lead Lebih Dari 15 Hari, Maka Lead Akan Di Diskualifikasi Otomatis."><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'notes', headerName: 'Catatan', width: 200, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Catatan Tambahan Mengenai Lead"><span>{params.colDef.headerName}</span></Tooltip >
        )},
    ];

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            const response = await axios.put(`http://localhost:2999/${username}/data/leads/${newRow.lead_id}`, newRow);
            // Update the local state with the updated row data
            setLeads((prevLeads) =>
                prevLeads.map((row) => (row.lead_id === newRow.lead_id ? { ...newRow, id: newRow.lead_id } : row))
            );
            return newRow;
        } catch (error) {
            console.error('Failed to update:', error);
            // If the update fails, return the old row to revert the changes in the grid
            return oldRow;
        }
    };

    const handleProcessRowUpdateError = (error) => {
        console.error('Error processing row update:', error);
    };

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
                // Add id property for DataGrid
                const leadsWithId = res.data.map(lead => ({ ...lead, id: lead.lead_id }));
                setLeads(leadsWithId);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handlePaginationModelChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel);
    };

    const handlePrediction = async () => {
        try {
            const updatedLeads = await Promise.all(
                leads.map(async (lead) => {
                    console.log("Lead ID:" + lead.lead_id);
                    const predictionRes = await axios.post(`http://localhost:2999/${username}/data/leads/${lead.lead_id}/predict`, {
                        lead_status: lead.lead_status,
                        response_time: lead.response_time,
                        interaction_level: lead.interaction_level,
                        source: lead.source
                    });
                    return { ...lead, converted: predictionRes.data.prediction };
                })
            );
            setLeads(updatedLeads);
        } catch (err) {
            console.log(err);
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
                rows={leads}
                columns={leadColumns}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                getRowId={(row) => row.lead_id} // Use lead_id as the unique row ID
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
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
            <CRMTooltip title={
                <React.Fragment>
                    <Typography color='text.secondary' fontSize={12}>Prediksi Konversi Leads</Typography>
                    <Divider orientation='horizontal' />
                    <Typography color='text.secondary' fontSize={10}><Typography color='text.primary' display={'inline'} fontSize={14}>&#183;</Typography>&nbsp;Menggunakan Algoritma ML</Typography>
                    <Typography color='text.secondary' fontSize={10}><Typography color='text.primary' display={'inline'} fontSize={14}>&#183;</Typography>&nbsp;Prediksi yang dihasilkan merupakan rekomendasi, bukan eksak</Typography>
                    <Typography color='text.secondary' fontSize={10}><Typography color='text.primary' display={'inline'} fontSize={14}>&#183;</Typography>&nbsp;Hasil prediksi tidak disimpan permanen, anda yang mengambil keputusan.</Typography>
                </React.Fragment>
            } placement='top'>
                <IconButton 
                sx={{ textTransform: 'none' }} 
                color='primary'
                onClick={handlePrediction}
                cursor={'pointer'}>
                    <OnlinePrediction fontSize='small'/>
                </IconButton>
            </CRMTooltip>

            <CRMTooltip title="Tambahkan lead baru" placement="top" arrow>
                <IconButton 
                sx={{ textTransform: 'none' }} 
                color='primary'
                onClick={() => navigate(`/${username}/add_lead`)}
                cursor={'pointer'}>
                    <AddIcon fontSize='small'/>
                </IconButton>
            </CRMTooltip>
            
            <CRMTooltip title="Edit lead. Anda hanya dapat memilih 1 lead untuk diedit" placement="top" arrow>
                <span>
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
                </span>
            </CRMTooltip>

            <CRMTooltip title="Hapus lead. Pilih 1 atau lebih lead untuk dihapus. Ingat: Lead yang dihapus tidak dapat dikembalikan." placement="top" arrow>
                <span>
                <IconButton
                    sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
                    size='small'
                    variant="outlined"
                    color="error"
                    disabled={rowSelectionModel < 1}
                    onClick={handleDelete}>
                    <RemoveCircleOutlineIcon fontSize='small'/>
                </IconButton>
                </span>
            </CRMTooltip>

            <CRMTooltip title="Tampilkan seluruh lead" placement="top" arrow>
                <IconButton
                sx={{ textTransform: 'none', height: '2rem', width: '2rem' }}
                size='small'
                color='primary'>
                    <FormatListNumberedRtlOutlinedIcon fontSize='small' />
                </IconButton>
            </CRMTooltip>
        </Stack>
        </>
    );
}
