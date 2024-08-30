import * as React from 'react';
import { Container, Box, Typography, Divider } from '@mui/material';
import MyAppBar from "../components/MyAppBar";
import '../styles/init.css';
import ContactsTable from '../components/ContactsTable';
import LeadsTable from '../components/LeadsTable';
import darkTheme from '../styles/darkTheme';
import ContactStats from '../components/ContactStats';
import LeadValueGraph from '../components/LeadValueGraph';
// import LeadDigitalStats from '../components/LeadDigitalStats';
import InterStats from '../components/InterStats';
import OpportunitiesTable from '../components/OpportunitiesTable';
import ProjectsTable from '../components/ProjectsTable';

export default function Dashboard() {

    return (
        <>
            <MyAppBar />
            <Container maxWidth="xl" sx={{ marginBottom: '4rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mb: '1rem', mt:'5rem', justifyContent: 'start', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem' }}>
                    <Typography sx={{ 
                        marginY: '0.5rem',
                        marginLeft:'1rem',
                        fontSize:'0.9rem',
                        color: darkTheme.palette.text.disabled,
                        '@media (min-width: 900px)': { 
                            fontSize: '1rem'
                        }
                    }}>
                        Personal Statistik
                    </Typography>
                    <InterStats/>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', mb: '1rem', mt:'1rem', paddingX: '1rem', justifyContent: 'start', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem' }}>
                    <Typography sx={{ 
                        marginY: '0.5rem', 
                        fontSize:'0.9rem', 
                        color: darkTheme.palette.text.disabled,
                        '@media (min-width: 900px)': { 
                            fontSize: '1rem'
                        }
                    }}>
                        Daftar Kontak <i>(Contacts)</i>
                    </Typography>
                </Box>
                <ContactStats/>
                <ContactsTable/>
                <Divider orientation='horizontal' flexItem />
                <Box sx={{ display: 'flex', width: '100%', mb: '1rem', mt:'1rem', paddingX: '1rem', justifyContent: 'start', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem' }}>
                    <Typography sx={{ 
                        marginY: '0.5rem',
                        fontSize:'0.9rem',
                        color: darkTheme.palette.text.disabled,
                        '@media (min-width: 900px)': { 
                            fontSize: '1rem'
                    }
                }}>
                        Daftar Lead <i>(Leads)</i>
                    </Typography>
                </Box>
                <LeadValueGraph/>
                {/* <LeadDigitalStats/> */}
                <LeadsTable/>
                <Divider orientation='horizontal' flexItem />
                <Box sx={{ display: 'flex', width: '100%', mb: '1rem', mt:'1rem', paddingX: '1rem', justifyContent: 'start', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem' }}>
                    <Typography sx={{ 
                        marginY: '0.5rem',
                        fontSize:'0.9rem',
                        color: darkTheme.palette.text.disabled,
                        '@media (min-width: 900px)': { 
                            fontSize: '1rem'
                    }
                }}>
                        Daftar Peluang <i>(Opportunities)</i>
                    </Typography>
                </Box>
                <OpportunitiesTable/>
                <Divider orientation='horizontal' flexItem />
                <Box sx={{ display: 'flex', width: '100%', mb: '1rem', mt:'1rem', paddingX: '1rem', justifyContent: 'start', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem' }}>
                    <Typography sx={{ 
                        marginY: '0.5rem',
                        fontSize:'0.9rem',
                        color: darkTheme.palette.text.disabled,
                        '@media (min-width: 900px)': { 
                            fontSize: '1rem'
                    }
                }}>
                        Daftar Projek <i>(Projects)</i>
                    </Typography>
                </Box>
                <ProjectsTable/>
            </Container>
        </>
    );
};