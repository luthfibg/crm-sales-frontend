import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, IconButton, Tooltip, styled, tooltipClasses, Button } from '@mui/material';
import darkTheme from '../styles/darkTheme';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OpenInNew from '@mui/icons-material/OpenInNewOutlined';
import Done from '@mui/icons-material/Done';
import axiosInstance from '../axiosConfig';
import { customDisabledButton } from '../utils/disabledButton';

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
                const res = await axiosInstance.get(`/${username}/data/projects`);

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
            const response = await axiosInstance.put(`/${username}/data/projects/${newRow.project_id}`, newRow);
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

    const handleViewProject = () => {
        if (rowSelectionModel.length === 1) {
            navigate(`/${username}/view_project/${rowSelectionModel[0]}`);
        }
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
                    await axiosInstance.delete(`/${username}/data/projects/${projectId}`);
                }));
                // Refresh the projects data after deletion
                const res = await axiosInstance.get(`/${username}/data/projects`);
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
                    await axiosInstance.post(`/${username}/data/projects`, {
                        project_id: projectId,
                    });
                }));
    
                // Refresh the projects data after upgrading
                const res = await axiosInstance.get(`/${username}/data/projects`);
                const projectsWithId = res.data.map(project => ({ ...project, id: project.project_id }));
                setProjects(projectsWithId);
    
                // Optionally, you can avoid reload by just updating the projects state
                // instead of using window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };
    
    const handlePrint = () => {
        window.print();
    };

    const handleOpenReport = () => {
        navigate(`/${username}/report`);
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
                sx={{
                    textTransform: 'none',
                    ...customDisabledButton,
                }}
                color='primary'
                onClick={handleFinishProject}
                cursor={'pointer'}
                disabled={rowSelectionModel < 1}>
                    <Done fontSize='small'/>
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

            <CRMTooltip title="Detail proyek" placement="top" arrow>
                <IconButton
                disabled={rowSelectionModel.length !== 1}
                sx={{
                    textTransform: 'none',
                    height: '2rem',
                    width: '2rem',
                    ...customDisabledButton,
                }}
                onClick={handleViewProject}
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

            <CRMTooltip title="Hapus proyek. Pilih 1 atau lebih proyek untuk dihapus. Ingat: Proyek yang dihapus tidak dapat dikembalikan." placement="top" arrow>
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
        <Stack 
        direction="row"
        width={'100%'}
        spacing={1}
        mt={"1rem"}
        bgcolor={darkTheme.palette.background.paper2}
        sx={{ 
            justifyContent: 'flex-start',
            p: '0.5rem',
            borderRadius: '0.2rem',
        }}>
            <Button variant='contained' onClick={handlePrint}>Cetak Halaman Ini</Button>
            {/* <Button variant='contained' onClick={handleOpenReport}>Cetak Laporan</Button> */}
        </Stack>
        </>
    );
}