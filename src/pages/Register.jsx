import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';

const Register = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState({
        firstname: "",
        lastname: "",
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        bio: "",
        role: "sales",
    });
    // const [error, setError] = useState(null);

    const handleChange = (e) => {
        setSales((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnclickSave = async (e) => {
        e.preventDefault();
        console.log('Sales data being registered:', sales); // logging sales sended
        try {
            const response = await axios.post("https://crm-sales-backend-production.up.railway.app/register", sales);
            console.log(response.data.message);
            navigate('/:username');
        } catch (err) {
            console.error(err.response?.data?.error || err.message);
        }
    };

    return (
        <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1,'@media (min-width: 540px) and (max-width: 767.98px) and (orientation: portrait)': { width: 'calc(100%/2.15)'}, '@media (min-width: 768px)': { width: 'calc(100%/3.25)'}, width: '95%' } }}
                noValidate
                autoComplete="off"
            >
                <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }} variant="h5">Mendaftar CRM Sales</Typography>
                <Paper sx={{ height: '100vh', width:'90vw', '@media (min-width: 1200px)': { height: '60vh', width:'80vw'}, '@media (min-width: 768px) and (max-width: 1199px)': { height: '60vh', width:'90vw'}, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '0.4rem' }}>
                    <Box width={'95%'} sx={{ '@media (min-width: 768px) and (max-width: 1199px)': { width: '95%'} }} >
                        <TextField onChange={handleChange} name="firstname" id="outlined-firstname" label="Nama Depan" />
                        <TextField onChange={handleChange} name="lastname" id="outlined-lastname" label="Nama Belakang" />
                        <TextField onChange={handleChange} name="fullname" id="outlined-fullname" label="Nama Lengkap" />
                        <TextField onChange={handleChange} name="username" id="outlined-username" label="Nama Pengguna" />
                        <TextField onChange={handleChange} name="email" id="outlined-email" label="Email" type="email" />
                        <TextField onChange={handleChange} name="phone" id="outlined-phone" label="Nomor Telepon" defaultValue={'08'} helperText="Nomor Telepon Whatsapp" />
                        <TextField onChange={handleChange} name="password" id="outlined-password" label="Password" type="password" />
                        <TextField onChange={handleChange} name="address" id="outlined-address" label="Alamat" multiline rows={3} helperText="Alamat saat ini" />
                        <TextField onChange={handleChange} name="bio" id="outlined-bio" label="Bio" multiline rows={3} helperText="Deskripsi singkat tentang anda" />
                    </Box>
                    <Box display={"flex"} width={"100%"} justifyContent={"center"}>
                        <Button onClick={handleOnclickSave} sx={{ width: '30%', mr: '1rem' }} variant="outlined">Simpan</Button>
                        <Button component={Link} to="/" sx={{ width: '30%', ml: '1rem' }} variant="outlined">Batal</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Register;
