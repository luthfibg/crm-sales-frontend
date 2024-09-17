import * as React from 'react';
import { useEffect, useState } from "react";
import WishleadModal from './WishleadModal';
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
import UpgradeOutlined from '@mui/icons-material/UpgradeOutlined';
import Clear from '@mui/icons-material/Clear';
import OnlinePrediction from '@mui/icons-material/OnlinePrediction';
import '../styles/init.css';
import axiosInstance from '../axiosConfig';

const CRMTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 160,
    },
});

export default function LeadsTable() {
    const [loading, setLoading] = useState(false);
    const [leads, setLeads] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)

    useEffect(() => {
        const fetchAllLeads = async () => {
            try {
                const res = await axiosInstance.get(`http://localhost:2999/${username}/data/leads`);
                const filteredLeads = res.data.filter(lead => lead.lead_id !== null && lead.lead_id !== undefined);
                
                const leadsWithId = filteredLeads.map(lead => ({ 
                    ...lead, 
                    id: lead.lead_id || `temp-${Math.random()}` 
                }));
                
                setLeads(leadsWithId);
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchAllLeads();
    }, [username]);
    
    const leadColumns = [
        // { field: 'id', headerName: 'ID', width: 30, headerClassName: 'super-app-theme--header', renderHeader: (params) => {
        //     <Tooltip title="ID Lead"><span>{params.colDef.headerName}</span></Tooltip >
        // }},
        { field: 'lead_title', headerName: 'Nama Lead', width: 150, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Judul Lead, Untuk Memudahkan Identifikasi"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'contact_name', headerName: 'Pelanggan', width: 150, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Nama Pelanggan (Link Utama Institusi)"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'contact_institution', headerName: 'Institusi', width: 150, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Nama Institusi Pelanggan"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'trade_value', headerName: 'Value', width: 120, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
            <Tooltip title="Besarnya Nilai Potensi Lead (Dalam Rupiah)"><span>{params.colDef.headerName}</span></Tooltip >
        )},
        { field: 'lead_status',
            headerName: 'Status Lead',
            width: 150,
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
        // { field: 'response_time', headerName: 'Waktu Respon', width: 60, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
        //     <Tooltip title="Rata-Rata Durasi Pelanggan Merespon (Dalam Jam)"><span>{params.colDef.headerName}</span></Tooltip >
        // )},
        // { field: 'interaction_level', headerName: 'Level Interaksi', width: 60, editable: true, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
        //     <Tooltip title="Level Interaksi Pelanggan (Menggunakan Skala 1-5, Diisi Menggunakan Perkiraan Anda). 1 berarti sangat rendah, 5 sangat tinggi"><span>{params.colDef.headerName}</span></Tooltip >
        // )},
        // { field: 'source', headerName: 'Sumber', width: 60, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
        //     <Tooltip title="Sumber Lead Mendapatkan Informasi Tentang Produk Anda"><span>{params.colDef.headerName}</span></Tooltip >
        // )},
        { field: 'converted', headerName: 'Dikonversi?', width: 120, headerClassName: 'super-app-theme--header', renderHeader: (params) => (
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
    ];

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            const response = await axiosInstance.put(`http://localhost:2999/${username}/data/leads/${newRow.lead_id}`, newRow);
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

    const handleUpgradeLeads = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (leadId) => {
                    await axiosInstance.post(`http://localhost:2999/${username}/data/opportunities`, {
                        lead_id: leadId,
                    });
                }));
    
                // Refresh the leads data after upgrading
                const res = await axiosInstance.get(`http://localhost:2999/${username}/data/leads`);
                const leadsWithId = res.data.map(lead => ({ ...lead, id: lead.lead_id }));
                setLeads(leadsWithId);
                window.location.reload();
    
                // Optionally, you can avoid reload by just updating the leads state
                // instead of using window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };    

    const handleAddLead = async () => {
        try {
          setLoading(true); // Set loading state to true
          setOpenModal(true);
        } catch (error) {
          console.error("An error occurred while adding a lead:", error);
          // Handle the error
        } finally {
          setLoading(false); // Set loading state to false regardless of success or failure
        }
    };

    const handleWishlistSaved = () => {
        setOpenModal(false);
        navigate(`/${username}/add_lead`);
    };

    const handleProcessRowUpdateError = (error) => {
        console.error('Error processing row update:', error);
    };

    const handleEditClick = () => {
        if (rowSelectionModel.length === 1) {
            const selectedLeadId = rowSelectionModel[0]; // Gunakan langsung lead_id dari rowSelectionModel
            console.log("Selected lead ID:", selectedLeadId);
    
            // Cari lead berdasarkan lead_id di array leads
            const selectedLead = leads.find(lead => lead.lead_id === selectedLeadId);
    
            if (!selectedLead) {
                console.error("Selected lead not found");
                return;
            }
            if (!username) {
                console.error('Username is null or undefined');
                return; // Jangan lanjut jika username tidak ada
            }
    
            // Arahkan ke halaman update lead dengan lead_id yang sesuai
            navigate(`/${username}/update_lead/${selectedLead.lead_id}`);
        }
    };
    

    const handleDelete = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (leadId) => {
                    console.log('Check leadId retrieved: '+leadId); // test passed
                    await axiosInstance.delete(`http://localhost:2999/${username}/data/leads/${leadId}`);
                }));
                // Refresh the leads data after deletion
                const res = await axiosInstance.get(`http://localhost:2999/${username}/data/leads`);
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
                    const predictionRes = await axiosInstance.post(`http://localhost:2999/${username}/data/leads/${lead.lead_id}/predict`, {
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
                backgroundColor: '#fff',
            }, }} bgcolor={darkTheme.palette.background.paper}>
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

            <CRMTooltip title="Upgrade Ke Opportunity" placement="top" arrow>
                <IconButton 
                sx={{ textTransform: 'none' }} 
                color='primary'
                onClick={handleUpgradeLeads}
                cursor={'pointer'}
                disabled={rowSelectionModel < 1}>
                    <UpgradeOutlined fontSize='small'/>
                </IconButton>
            </CRMTooltip>

            <CRMTooltip title="Tambahkan lead baru" placement="top" arrow>
                <IconButton 
                sx={{ textTransform: 'none' }} 
                color='primary'
                onClick={handleAddLead}
                cursor={'pointer'}>
                    <AddIcon fontSize='small'/>
                </IconButton>
            </CRMTooltip>
            <WishleadModal open={openModal} onClose={handleWishlistSaved} />    
            
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
