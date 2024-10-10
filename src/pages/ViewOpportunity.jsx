import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MyAppBar from '../components/MyAppBar';
import ArrowBackIos from '@mui/icons-material/ArrowBackIosOutlined';
import { Typography, Box, Button, Container, Grid, Paper, Checkbox, Table, TableBody, TableCell, Stack, Chip } from '@mui/material';
import axiosInstance from '../axiosConfig';
import { Snackbar, Alert } from "@mui/material";
import '../styles/tableCustom.css';


const ViewOpportunity = () => {
    const {opportunityId} = useParams();
    const username = localStorage.getItem("username");
    const [opportunity, setOpportunity] = useState([]);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [openSnackbarWarning, setOpenSnackbarWarning] = useState(false);
    const [requirements, setRequirements] = useState({
        purchase_agreement: false,
        down_payment: false,
        execution_schedule: false,
        installation_requirements: false,
        conversion: false,
    });

    useEffect(() => {
        const fetchOpportunity = async () => {
            try {
                const res = await axiosInstance.get(`/${username}/data/opportunities/${opportunityId}`);
                if (res.data.length > 0) {
                    setOpportunity(res.data[0]);
                } else {
                    console.error("Opportunity not found");
                }
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchOpportunity();  // Jalankan hanya untuk mendapatkan data opportunity
    }, [username, opportunityId]);
    
    // UseEffect terpisah untuk update conversion
    useEffect(() => {
        const { purchase_agreement, down_payment, execution_schedule, installation_requirements} = requirements;
        
        // Update conversion ketika keempat checkbox tersebut tercentang
        if (purchase_agreement && down_payment && execution_schedule && installation_requirements) {
            setRequirements((prevState) => ({
                ...prevState,
                conversion: true,
            }));
        } else {
            setRequirements((prevState) => ({
                ...prevState,
                conversion: false,
            }));
        }
    }, [requirements.purchase_agreement, requirements.down_payment, requirements.execution_schedule, requirements.installation_requirements]);
    

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setRequirements((prev) => ({
            ...prev,
            [name]: checked, // Mengubah nilai sesuai dengan checkbox yang diubah
        }));
    };

    const handleClick = () => {
        if (requirements.conversion) {
            handleSaveReqs();
        } else {
            setOpenSnackbarWarning(true);
        }
    }

    const handleSaveReqs = () => {
        console.log(requirements);
        setOpenSnackbarSuccess(true); // Tampilkan snackbar berhasil
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbarWarning(false); // Tutup snackbar peringatan
        setOpenSnackbarSuccess(false); // Tutup snackbar berhasil
    };

  return (
    <>
    <MyAppBar/>
    <Container maxWidth="xl" height="100vh">
        <Box sx={{display: 'flex', width: '100%', justifyContent: 'start', alignItems: 'start', mt: '5rem', flexDirection: 'column' }}>
            <Button
                sx={{
                    textTransform: 'Capitalize',
                }}
                size='small'
                variant="link"
                color="primary"
                onClick={() => window.history.back()}
                gap={5}>
                <ArrowBackIos fontSize='small'/>
                <Typography ml={1} fontSize={'0.8rem'}>Kembali ke dashboard</Typography>
            </Button>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} width={'100%'} height={'auto'} sx={{ mt:'1rem', mr:'0rem' }}>
                <Grid item xs={4} sm={2} md={2} lg={3} sx={{ p: '0px', border: 'none' }}>
                <Paper sx={{ pt:'0.5rem' }}>
                    <Typography variant='body1' m={2}>Opportunity Conversion</Typography>
                    <Box>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="purchase agreement"
                                sx={{ display: 'inline' }}
                                checked={requirements.purchase_agreement}
                                onChange={handleCheckboxChange}
                            />
                            <Typography variant="body2" sx={{ display: 'inline' }}>Persetujuan Pembelian</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="down_payment"
                                sx={{ display: 'inline' }}
                                checked={requirements.down_payment}
                                onChange={handleCheckboxChange}
                            />
                            <Typography variant="body2" sx={{ display: 'inline' }}>Uang Muka</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="execution_schedule"
                                checked={requirements.execution_schedule}
                                onChange={handleCheckboxChange}
                            />
                            <Typography variant="body2">Jadwal Eksekusi</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="installation_requirements"
                                checked={requirements.installation_requirements}
                                onChange={handleCheckboxChange}
                            />
                            <Typography variant="body2">Kebutuhan Instalasi</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="ready_to_convert"
                                checked={requirements.conversion}
                                onChange={()=>{}}
                            />
                            <Typography variant="body2">Siap Dikonversi</Typography>
                        </Stack>
                        {/* Tombol submit untuk mengirim data ke backend */}
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Button type="submit" sx={{ m: '0.5rem' }} onClick={handleClick}>Simpan</Button>
                        </Stack>
                        {/* Snackbar Warning */}
                        <Snackbar
                            open={openSnackbarWarning}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                        >
                            <Alert onClose={handleCloseSnackbar} severity="warning">
                                Anda perlu memastikan peluang memenuhi kriteria untuk dikonversi
                            </Alert>
                        </Snackbar>

                        {/* Snackbar Success */}
                        <Snackbar
                            open={openSnackbarSuccess}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                        >
                            <Alert onClose={handleCloseSnackbar} severity="success">
                                Kriteria telah terpenuhi dan berhasil disimpan
                            </Alert>
                        </Snackbar>
                    </Box>
                </Paper>
                </Grid>
                <Grid item xs={4} sm={6} md={8} lg={10} sx={{ p: '0px', border: 'none' }}>
                    <Paper sx={{ pt:'0.5rem' }}>
                        <Typography variant='body1' m={2}>Opportunity Detail</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Table>
                                    <TableBody>
                                        {opportunity.opportunity_title && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> Judul Peluang:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> {opportunity.opportunity_title}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {opportunity.sales_rep && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> Nama Sales:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> {opportunity.sales_rep}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {opportunity.contact_name && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> Nama Kontak:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> {opportunity.contact_name}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {opportunity.contact_institution && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> Institusi Kontak:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> {opportunity.contact_institution}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                                    </TableBody>
                                </Table>
                            </Grid>

                            <Grid item xs={6}>
                                <Table>
                                    <TableBody>
                                        {opportunity.value && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> Nilai Penjualan:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2"> {opportunity.value}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {opportunity.opportunity_status && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2">Status Peluang:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2">{opportunity.opportunity_status}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {opportunity.created_at && (
                                            <tr>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2">Tanggal Dimulai:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography variant="body2">{opportunity.created_at}</Typography></TableCell>
                                            </tr>
                                        )}
                                        
                                        {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={8} md={2} lg={3} sx={{ p: '0px', border: 'none' }}>
                    <Paper sx={{ pt:'0.5rem' }}>
                        <Typography variant='body1' m={2}>Opportunity Statistic</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </Container>
    </>
  )
}

export default ViewOpportunity