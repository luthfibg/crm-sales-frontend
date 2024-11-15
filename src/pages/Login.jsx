import { Box, Button, Container, Paper, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState({ username: "", password: ""});
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setSales((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnclickSave = async (e) => {
        e.preventDefault();
        try {
            if (!sales.username || !sales.password) {
                throw new Error("Nama Pengguna dan Password wajib diisi.");
            }
            const response = await axios.post("https://crm-sales-backend-production.up.railway.app/login", sales);
            localStorage.setItem('token', response.data.token); // Save the token to local storage
            localStorage.setItem('username', sales.username); // Save the username to local storage
            localStorage.setItem('fullname', sales.fullname); // Save the fullname to local storage
            navigate(`/${sales.username}`); // Redirect to the user's dashboard
        } catch (err) {
            console.error(err.response?.data?.error || err.message);
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            {error && (
                <Snackbar
                open={true}
                autoHideDuration={3000}
                onClose={handleCloseError}
                message={error}></Snackbar>
            )}
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '31ch' } }}
                noValidate
                autoComplete="off"
            >
                <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }} variant="h5">Login CRM Sales</Typography>
                <Paper sx={{ height: '60vh', width:'80vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '0.4rem' }}>
                    <>
                    <TextField onChange={handleChange} name="username" id="outlined-username" label="Nama Pengguna" sx={{ maxWidth:'90%', }} />
                    <TextField onChange={handleChange} name="password" id="outlined-password" label="Password" type="password" sx={{ maxWidth:'90%' }} />
                    </>
                    <Box display={"flex"} justifyContent={"center"} marginTop={"1rem"}>
                        <Button onClick={handleOnclickSave} sx={{ width: '100%', mr: '1rem' }} variant="outlined">Masuk</Button>
                        <Button component={Link} to="/register" sx={{ width: '100%', ml: '1rem' }} variant="outlined">Daftar</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
