import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, IconButton, Tooltip, styled, tooltipClasses } from '@mui/material';
import darkTheme from '../styles/darkTheme';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FormatListNumberedRtlOutlinedIcon from '@mui/icons-material/FormatListNumberedRtlOutlined';

const CRMTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 160,
    },
});

export default function OpportunitiesTable() {
    const [opportunities, setOpportunities] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const navigate = useNavigate();
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)

    useEffect(() => {
        const fetchAllOpportunities = async () => {
            try {
                const res = await axios.get(`http://localhost:2999/${username}/data/opportunities`);

                console.log(res.data);

                // filter out null and undefined of opportunity
                const filteredOpportunities = res.data.filter(opportunity => opportunity.opportunity_id !== null && opportunity.opportunity_id !== undefined);

                // Add id property for DataGrid
                const opportunitiesWithId = filteredOpportunities.map(opportunity => ({ ...opportunity, id: opportunity.opportunity_id }));
                
                console.log("Opportunities Data With ID:", opportunitiesWithId);
                setOpportunities(opportunitiesWithId);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllOpportunities();
        console.log("Opportunities Data:", opportunities);
    }, [username]);

    const oppsColumns = [
        { field: 'opportunity_id', headerName: 'ID', width: 30 },
        { field: 'opportunity_title', headerName: 'Peluang', width: 150 },
        { field: 'sales_rep', headerName: 'Sales', width: 120 },
        { field: 'person', headerName: 'Pelanggan', width: 150 },
        { field: 'institution', headerName: 'Institusi', width: 150 },
        { field: 'value', headerName: 'Nilai', width: 150 },
        { field: 'status', headerName: 'Status', width: 60 },
    ];

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            const response = await axios.put(`http://localhost:2999/${username}/data/opportunities/${newRow.opportunity_id}`, newRow);
            // Update the local state with the updated row data
            setOpportunities((prevOpportunities) =>
                prevOpportunities.map((row) => (row.opportunity_id === newRow.opportunity_id ? { ...newRow, id: newRow.opportunity_id } : row))
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
            navigate(`/${username}/update_opportunity/${rowSelectionModel[0]}`);
        }
    };

    const handleDelete = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (opportunityId) => {
                    console.log('Check opportunieId retrieved: '+opportunityId); // test passed
                    await axios.delete(`http://localhost:2999/${username}/data/opportunities/`+opportunityId);
                }));
                // Refresh the opportunities data after deletion
                const res = await axios.get(`http://localhost:2999/${username}/data/opportunities`);
                // Add id property for DataGrid
                const opportunitiesWithId = res.data.map(opportunity => ({ ...opportunity, id: opportunity.opportunity_id }));
                setOpportunities(opportunitiesWithId);
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
                rows={opportunities}
                columns={oppsColumns}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                getRowId={(row) => row.opportunity_id} // Use opportunity_id as the unique row ID
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
            {/* <CRMTooltip title={
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
            </CRMTooltip> */}

            <CRMTooltip title="Tambahkan peluang baru" placement="top" arrow>
                <span>
                    <IconButton 
                    sx={{ textTransform: 'none' }} 
                    color='primary'
                    onClick={() => navigate(`/${username}/add_opportunity`)}
                    cursor={'pointer'}
                    disabled>
                        <AddIcon fontSize='small'/>
                    </IconButton>
                </span>
            </CRMTooltip>
            
            <CRMTooltip title="Edit peluang. Anda hanya dapat memilih 1 peluang untuk diedit" placement="top" arrow>
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

            <CRMTooltip title="Hapus peluang. Pilih 1 atau lebih peluang untuk dihapus. Ingat: Peluang yang dihapus tidak dapat dikembalikan." placement="top" arrow>
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

            <CRMTooltip title="Tampilkan seluruh peluang" placement="top" arrow>
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