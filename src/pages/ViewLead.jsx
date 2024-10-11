import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MyAppBar from '../components/MyAppBar';
import ArrowBackIos from '@mui/icons-material/ArrowBackIosOutlined';
import { Typography, Box, Button, Container, Grid, Paper, Checkbox, Table, TableBody, TableCell, Stack, Chip, css } from '@mui/material';
import axiosInstance from '../axiosConfig';
import { Snackbar, Alert } from "@mui/material";
import '../styles/tableCustom.css';
import LeadRadarChart from '../components/ui/LeadRadarChart';

const ViewLead = () => {
    const {leadId} = useParams();
    const username = localStorage.getItem("username");
    const [lead, setLead] = useState([]);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [openSnackbarWarning, setOpenSnackbarWarning] = useState(false);
    const [requirements, setRequirements] = useState({
        products_wants: false,
        needed_for: false,
        budget_availability: false,
        purchase_plan: false,
        consideration_vendor: false,
        conversion: false,
    });

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const res = await axiosInstance.get(`/${username}/data/leads/${leadId}`);
                if (res.data.length > 0) {
                    setLead(res.data[0]);
                } else {
                    console.error("Lead not found");
                }
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchLead();  // Jalankan hanya untuk mendapatkan data lead
    }, [username, leadId]);
    
    // UseEffect terpisah untuk update conversion
    useEffect(() => {
        const { products_wants, needed_for, budget_availability, purchase_plan } = requirements;
        
        // Update conversion ketika keempat checkbox tersebut tercentang
        if (products_wants && needed_for && budget_availability && purchase_plan) {
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
    }, [requirements.products_wants, requirements.needed_for, requirements.budget_availability, requirements.purchase_plan]);
    

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const res = await axiosInstance.get(`/${username}/data/opportunity-reqs/${leadId}`);
                if (res.data) {
                    setRequirements(res.data);  // Memuat data terbaru ke state requirements
                }
            } catch (err) {
                console.error('Error fetching latest opportunity requirements:', err);
            }
        };
    
        fetchRequirements();  // Panggil fungsi fetch saat halaman pertama kali dimuat
    }, [username]); // Gunakan username atau id lainnya untuk mendapatkan data yang sesuai
    
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setRequirements((prev) => ({
            ...prev,
            [name]: checked, // Mengubah nilai sesuai dengan checkbox yang diubah
        }));
    };

    // needed to perform conversion later

    // const handleClick = (e) => {
    //     if (requirements.conversion) {
    //         handleSaveReqs(e);
    //     } else {
    //         setOpenSnackbarWarning(true);
    //     }
    // }

    const handleSaveReqs = async (e) => {
        e.preventDefault();

        try {
            // Kirim data ke server
            await axiosInstance.post(`/${username}/data/opportunity-reqs`, {
                lead_id: lead.lead_id,
                ...requirements,
            });
            
            // Ambil data terbaru setelah disimpan
            const res = await axiosInstance.get(`/${username}/data/opportunity-reqs/latest`); // endpoint ini mengembalikan data terbaru
            
            // Perbarui state requirements berdasarkan data yang diambil
            setRequirements(res.data);
    
            // Tampilkan snackbar sukses
            setOpenSnackbarSuccess(true); 
            window.location.reload();
        } catch (err) {
            console.error('Error saving opportunity requirements:', err);
            // Tampilkan error handling (misalnya snackbar error)
        }
    };
    

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
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} width={'100%'} height={'auto'} sx={{ mt:'1rem', mr:'0rem', pb:'2rem' }}>
                <Grid item xs={4} sm={2} md={2} lg={3} sx={{ p: '0px', border: 'none' }}>
                <Paper sx={{ pt:'0.5rem', height: '30rem' }}>
                    <Typography variant='body1' m={2}>Lead Conversion</Typography>
                    <Box>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="products_wants"
                                sx={{ display: 'inline' }}
                                checked={requirements.products_wants}
                                onChange={handleCheckboxChange}
                            />
                            <Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2" sx={{ display: 'inline' }}>Produk yang diinginkan</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="needed_for"
                                sx={{ display: 'inline' }}
                                checked={requirements.needed_for}
                                onChange={handleCheckboxChange}
                            />
                            <Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2" sx={{ display: 'inline' }}>Kebutuhan</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="budget_availability"
                                checked={requirements.budget_availability}
                                onChange={handleCheckboxChange}
                            />
                            <Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Ketersediaan Anggaran</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="purchase_plan"
                                checked={requirements.purchase_plan}
                                onChange={handleCheckboxChange}
                            />
                            <Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Rencana Pembelian</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="consideration_vendor"
                                checked={requirements.consideration_vendor}
                                onChange={handleCheckboxChange}
                            />
                            <Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Vendor Lain</Typography>
                        </Stack>
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Checkbox
                                name="ready_to_convert"
                                checked={requirements.conversion}
                                onChange={()=>{}}
                            />
                            <Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Siap Dikonversi</Typography>
                        </Stack>
                        {/* Tombol submit untuk mengirim data ke backend */}
                        <Stack spacing={0} direction={'row'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Button type="submit" sx={{ m: '0.5rem' }} onClick={(e) => handleSaveReqs(e)}>Simpan</Button>
                        </Stack>
                        {/* Snackbar Warning */}
                        <Snackbar
                            open={openSnackbarWarning}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                        >
                            <Alert onClose={handleCloseSnackbar} severity="warning">
                                Centang semua checkbox terlebih dahulu sebelum menyimpan!
                            </Alert>
                        </Snackbar>

                        {/* Snackbar Success */}
                        <Snackbar
                            open={openSnackbarSuccess}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                        >
                            <Alert onClose={handleCloseSnackbar} severity="success">
                                Data berhasil disimpan!
                            </Alert>
                        </Snackbar>
                    </Box>
                </Paper>
                </Grid>
                <Grid item xs={4} sm={6} md={7} lg={9} sx={{ p: '0px', border: 'none' }}>
                    <Paper sx={{ pt:'0.5rem', height:'26rem' }}>
                        <Typography variant='body1' m={2}>Lead Detail</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Table>
                                    <TableBody>
                                        {lead.lead_title && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> Lead Title:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> {lead.lead_title}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.sales_name && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> Sales Name:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> {lead.sales_name}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.contact_name && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> Contact Name:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> {lead.contact_name}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.contact_institution && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> Contact Institution:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> {lead.contact_institution}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.trade_value && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> Trade Value:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2"> {lead.trade_value}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                                    </TableBody>
                                </Table>
                            </Grid>

                            <Grid item xs={6}>
                                <Table>
                                    <TableBody>
                                        {lead.lead_status && (
                                            <tr className='table-row'>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Lead Status:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">{lead.lead_status}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.response_time && (
                                            <tr>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Response Time:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">{lead.response_time}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.interaction_level && (
                                            <tr>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Interaction Level:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">{lead.interaction_level}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.source && (
                                            <tr>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Source:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">{lead.source}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {(lead.converted === 1 || lead.converted === 0) && (
                                            <tr>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Converted:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">{lead.converted === 1 ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="error" size="small" />}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.unqualified_reason && (
                                            <tr>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Unqualified Reason:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">{lead.unqualified_reason}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {lead.notes && (
                                            <tr>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">Notes:</Typography></TableCell>
                                                <TableCell sx={{ borderBottom: '0.1rem solid #ddd' }}><Typography fontSize={{ xs: '0.6rem', md: '0.8rem' }} variant="body2">{lead.notes}</Typography></TableCell>
                                            </tr>
                                        )}
                                        {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper sx={{ mt: '1rem', p: '0.5rem' }}>
                        <Button variant='contained' color='primary' size='small'>Konversi Lead</Button>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={8} md={3} lg={4} sx={{ p: '0px', border: 'none' }}>
                    <Paper sx={{ pt: '0.5rem', px: '0.5rem', height: '30rem', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
                        <Typography variant='body1' m={2} sx={{ textAlign: 'center' }}>Lead Statistic</Typography>
                        <div style={{ width: '95%', height: '50%' }}>
                            <LeadRadarChart lead={lead} />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </Container>
    </>
  )
}

export default ViewLead