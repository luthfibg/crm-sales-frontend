import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import MyAppBar from "../components/MyAppBar";
import '../styles/init.css';
import ContactsTable from '../components/ContactsTable';
import LeadsTable from '../components/LeadsTable';

export default function Dashboard() {

    return (
        <>
            <MyAppBar />
            <Container maxWidth="xl" sx={{ marginBottom: '4rem' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '5rem' }}>
                    <Typography variant="h5" sx={{ marginY: '2rem' }}>
                        Daftar Kontak
                    </Typography>
                </Box>
                <ContactsTable/>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '6rem' }}>
                    <Typography variant="h5" sx={{ marginY: '2rem' }}>
                        Daftar Lead
                    </Typography>
                </Box>
                <LeadsTable/>
            </Container>
        </>
    );
};