import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, IconButton, Tooltip, styled, tooltipClasses } from '@mui/material';
import darkTheme from '../styles/darkTheme';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OpenInNew from '@mui/icons-material/OpenInNewOutlined';
import UpgradeOutlined from '@mui/icons-material/UpgradeOutlined';
import axiosInstance from '../axiosConfig';
import { customDisabledButton } from '../utils/disabledButton';

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
                const res = await axiosInstance.get(`/${username}/data/opportunities`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // filter out null and undefined of opportunity
                const filteredOpportunities = res.data.filter(opportunity => opportunity.opportunity_id !== null && opportunity.opportunity_id !== undefined);

                // Add id property for DataGrid
                const opportunitiesWithId = filteredOpportunities.map(opportunity => ({ ...opportunity, id: opportunity.opportunity_id }));
                
                setOpportunities(opportunitiesWithId);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllOpportunities();
    }, [username]);

    const oppsColumns = [
        { field: 'opportunity_id', headerName: 'ID', width: 30 },
        { field: 'opportunity_title', headerName: 'Peluang', width: 150 },
        { field: 'sales_rep', headerName: 'Sales', width: 120 },
        { field: 'contact_name', headerName: 'Pelanggan', width: 150 },
        { field: 'contact_institution', headerName: 'Institusi', width: 150 },
        { field: 'value', headerName: 'Nilai', width: 150 },
        { field: 'opportunity_status', headerName: 'Status', width: 60 },
    ];

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            const response = await axiosInstance.put(`/${username}/data/opportunities/${newRow.opportunity_id}`, newRow);
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

    const handleViewOpportunity = () => {
        if (rowSelectionModel.length === 1) {
            const selectedOpportunityId = rowSelectionModel[0]; // Gunakan langsung opportunity_id dari rowSelectionModel
            console.log("Selected opportunity ID:", selectedOpportunityId);
    
            // Cari opportunity berdasarkan opportunity_id di array opportunities
            const selectedOpportunity = opportunities.find(opportunity => opportunity.opportunity_id === selectedOpportunityId);
    
            if (!selectedOpportunity) {
                console.error("Selected opportunity not found");
                return;
            }    
            if (!username) {
                console.error('Username is null or undefined');
                return; // Jangan lanjut jika username tidak ada
            }
    
            // Arahkan ke halaman view opportunity dengan opportunity_id yang sesuai
            navigate(`/${username}/view_opportunity/${selectedOpportunity.opportunity_id}`);
        }
    };

    const handleEditClick = () => {
        if (rowSelectionModel.length === 1) {
            const selectedOpportunityId = rowSelectionModel[0]; // Gunakan langsung opportunity_id dari rowSelectionModel
            console.log("Selected opportunity ID:", selectedOpportunityId);
    
            // Cari opportunity berdasarkan opportunity_id di array opportunities
            const selectedOpportunity = opportunities.find(opportunity => opportunity.opportunity_id === selectedOpportunityId);
    
            if (!selectedOpportunity) {
                console.error("Selected opportunity not found");
                return;
            }    
            if (!username) {
                console.error('Username is null or undefined');
                return; // Jangan lanjut jika username tidak ada
            }
    
            // Arahkan ke halaman update opportunity dengan opportunity_id yang sesuai
            navigate(`/${username}/update_opportunity/${selectedOpportunity.opportunity_id}`);
        }
    };

    const handleDelete = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (opportunityId) => {
                    console.log('Check opportunityId retrieved: '+opportunityId); // test passed
                    await axiosInstance.delete(`/${username}/data/opportunities/${opportunityId}`);
                }));
                // Refresh the opportunities data after deletion
                const res = await axiosInstance.get(`/${username}/data/opportunities`);
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

    const handleUpgradeOpportunity = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (opportunityId) => {
                    await axiosInstance.post(`/${username}/data/projects`, {
                        opportunity_id: opportunityId,
                        
                    });
                }));
    
                // Refresh the opportunities data after upgrading
                const res = await axiosInstance.get(`/${username}/data/opportunities`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const opportunitiesWithId = res.data.map(opportunity => ({ ...opportunity, id: opportunity.opportunity_id }));
                setOpportunities(opportunitiesWithId);
    
                // Optionally, you can avoid reload by just updating the opportunities state
                // instead of using window.location.reload();
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
                backgroundColor: '#fff',
            }, }} bgcolor={darkTheme.palette.background.paper}>
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

            <CRMTooltip title="Upgrade Ke Project" placement="top" arrow>
                <IconButton 
                sx={{
                    textTransform: 'none',
                    ...customDisabledButton,
                }}
                color='primary'
                onClick={handleUpgradeOpportunity}
                cursor={'pointer'}
                disabled={rowSelectionModel < 1}>
                    <UpgradeOutlined fontSize='small'/>
                </IconButton>
            </CRMTooltip>

            <CRMTooltip title="Untuk menambahkan peluang baru, silahkan konversi lead" placement="top" arrow>
                <span>
                    <IconButton 
                    sx={{
                        textTransform: 'none',
                        ...customDisabledButton,
                    }} 
                    color='primary'
                    onClick={() => navigate(`/${username}/add_opportunity`)}
                    cursor={'pointer'}
                    disabled>
                        <AddIcon fontSize='small'/>
                    </IconButton>
                </span>
            </CRMTooltip>

            <CRMTooltip title="Detail peluang" placement="top" arrow>
                <IconButton
                disabled={rowSelectionModel.length !== 1}
                sx={{ textTransform: 'none',
                    height: '2rem',
                    width: '2rem',
                    ...customDisabledButton,
                }}
                onClick={handleViewOpportunity}
                size='small'
                color='primary'>
                    <OpenInNew fontSize='small' />
                </IconButton>
            </CRMTooltip>
            
            <CRMTooltip title="Edit peluang. Anda hanya dapat memilih 1 peluang untuk diedit" placement="top" arrow>
                <span>
                <IconButton
                    sx={{
                        textTransform: 'none',
                        height: '2rem',
                        width: '2rem',
                        ...customDisabledButton,
                    }}
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
                    sx={{
                        textTransform: 'none',
                        height: '2rem',
                        width: '2rem',
                        ...customDisabledButton,
                    }}
                    size='small'
                    variant="outlined"
                    color="error"
                    disabled={rowSelectionModel < 1}
                    onClick={handleDelete}>
                    <RemoveCircleOutlineIcon fontSize='small'/>
                </IconButton>
                </span>
            </CRMTooltip>
        </Stack>
        </>
    );
}