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
import UpgradeOutlined from '@mui/icons-material/UpgradeOutlined';

const CRMTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 160,
    },
});

export default function ProjectsTable() {
    const [projects, setProjects] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const navigate = useNavigate();
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const res = await axios.get(`http://localhost:2999/${username}/data/projects`);

                // filter out null and undefined of projects
                const filteredProjects = res.data.filter(project => project.project_id !== null && project.project_id !== undefined);

                // Add id property for DataGrid
                const projectsWithId = filteredProjects.map(project => ({ ...project, id: project.project_id }));
                
                setProjects(projectsWithId);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllProjects();
    }, [username]);

    const projectColumns = [
        { field: 'project_id', headerName: 'ID', width: 30 },
        { field: 'project_name', headerName: 'Nama Proyek', width: 150 },
        { field: 'project_customer', headerName: 'Pelanggan Proyek', width: 150 },
        { field: 'project_institution', headerName: 'Institusi Proyek', width: 150 },
        { field: 'project_revenue', headerName: 'Pendapatan', width: 120 },
        { field: 'end_date', headerName: 'Tgl. Selesai', width: 150 },
        { field: 'project_status', headerName: 'Status Proyek', width: 60 },
        { field: 'description', headerName: 'Deskripsi', width: 200 },
    ];

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            const response = await axios.put(`http://localhost:2999/${username}/data/projects/${newRow.project_id}`, newRow);
            // Update the local state with the updated row data
            setProjects((prevProjects) =>
                prevProjects.map((row) => (row.projects_id === newRow.projects_id ? { ...newRow, id: newRow.projects_id } : row))
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
            navigate(`/${username}/update_project/${rowSelectionModel[0]}`);
        }
    };

    const handleDelete = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (projectId) => {
                    console.log('Check projectId retrieved: '+projectId); // test passed
                    await axios.delete(`http://localhost:2999/${username}/data/projects/`+ projectId);
                }));
                // Refresh the projects data after deletion
                const res = await axios.get(`http://localhost:2999/${username}/data/projects`);
                // Add id property for DataGrid
                const projectsWithId = res.data.map(project => ({ ...project, id: project.project_id }));
                setProjects(projectsWithId);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handlePaginationModelChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel);
    };

    const handleFinishProject = async () => {
        if (rowSelectionModel.length > 0) {
            try {
                await Promise.all(rowSelectionModel.map(async (projectId) => {
                    await axios.post(`http://localhost:2999/${username}/data/projects`, {
                        project_id: projectId,
                    });
                }));
    
                // Refresh the projects data after upgrading
                const res = await axios.get(`http://localhost:2999/${username}/data/projects`);
                const projectsWithId = res.data.map(project => ({ ...project, id: project.project_id }));
                setProjects(projectsWithId);
    
                // Optionally, you can avoid reload by just updating the projects state
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
                backgroundColor: 'rgba(33, 45, 51, 1.0)',
            }, }} bgcolor={darkTheme.palette.background.paper2}>
            <DataGrid
                rows={projects}
                columns={projectColumns}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                getRowId={(row) => row.project_id} // Use opportunity_id as the unique row ID
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

            <CRMTooltip title="Selesaikan proyek" placement="top" arrow>
                <IconButton 
                sx={{ textTransform: 'none' }} 
                color='primary'
                onClick={handleFinishProject}
                cursor={'pointer'}
                disabled={rowSelectionModel < 1}>
                    <UpgradeOutlined fontSize='small'/>
                </IconButton>
            </CRMTooltip>

            <CRMTooltip title="Tambahkan proyek baru manual" placement="top" arrow>
                <span>
                    <IconButton 
                    sx={{ textTransform: 'none' }} 
                    color='primary'
                    onClick={() => navigate(`/${username}/add_project`)}
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

            <CRMTooltip title="Hapus proyek. Pilih 1 atau lebih proyek untuk dihapus. Ingat: Proyek yang dihapus tidak dapat dikembalikan." placement="top" arrow>
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

            <CRMTooltip title="Tampilkan seluruh proyek" placement="top" arrow>
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