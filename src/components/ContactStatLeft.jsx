import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import darkTheme from '../styles/darkTheme';
import ReplayIcon from '@mui/icons-material/Replay';
import ContactStatLeftTable from "./ContactStatLeftTable";
import axios from "axios";
import { useEffect, useState } from "react";
import LeadFeedCard from "./LeadFeedCard";


export default function ContactStatLeft() {

    const [contacts, setContacts] = useState([]);
    const [leads, setLeads] = useState([]);
    const username = localStorage.getItem('username');
  
    // load data from API/backend

    return (
        <Box 
        sx={{ 
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            flexDirection: 'column',
            bgcolor: darkTheme.palette.background.paper2,
            borderRadius: '0.3rem',
            p: '0 0.5rem 0.5rem 0.5rem'
        }}>
            <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingY:'0.5rem' }}>
                <Typography sx={{ marginLeft:'0.5rem', fontSize:'0.7rem', color: darkTheme.palette.text.disabled }}>Lead Feeds</Typography>
                <Stack direction="row" sx={{ marginLeft: 'auto', marginRight: '0.5rem' }}>
                    <IconButton size="small" sx={{ width: '1.2rem', height: '1.2rem' }}>
                        <ReplayIcon fontSize="small" color="primary"/>
                    </IconButton>
                </Stack>
            </Box>
            <Paper
                sx={{ 
                    width: '100%',
                    height: '17rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    py: '1rem'
                }}>
                <LeadFeedCard />
            </Paper>
            </>
        </Box>
    );
}