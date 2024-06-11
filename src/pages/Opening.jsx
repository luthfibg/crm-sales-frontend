import { Card, Container, Divider, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import FitbitIcon from '@mui/icons-material/Fitbit';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Opening = () => {

    const handleLogin = () => {
        window.location.href = '/login';
    }

    const handleRegister = () => {
        window.location.href = '/register';
    }

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Paper sx={{ 
                height: "calc(100vh - 80px)",
                width:'100%',
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                }} bgcolor="background.paper">
                    <FitbitIcon fontSize='large' color="primary"></FitbitIcon>
                    <Typography variant="h4" sx={{ mt: 2, fontWeight: '700' }}>CR<span style={{ color: '#ffcb52' }}>Mas</span></Typography>

                    <Card
                    sx={{
                        display: 'flex',
                        color: 'text.secondary',
                        '& svg': {
                          m: 1,
                        },
                        '& hr': {
                          mx: 0.5,
                        },
                        mt: 8,
                    }}>
                        <IconButton size="small" color="inherit" onClick={handleLogin}>
                            <LoginIcon  fontSize="small"/>
                        </IconButton>
                        <Divider orientation="vertical" flexItem variant="middle" />
                        <IconButton size="small" color="inherit" onClick={handleRegister}>
                            <AppRegistrationIcon  fontSize="small"/>
                        </IconButton>
                    </Card>
                </Paper>
        </Container>
    );
};

export default Opening;