import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import darkTheme from '../styles/darkTheme';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from "axios";
import LeadFeedCard from "./LeadFeedCard";

export default function ContactStatLeft() {
    const [leads, setLeads] = useState([]);

    const fetchLeadFeeds = async () => {
        try {
            const response = await axios.get(`http://localhost:2999/data/lead_feeds`);
            const leadData = await Promise.all(response.data.map(async (lead) => {
                const customerResponse = await axios.get(`http://localhost:2999/data/customer_accs/${lead.contact_id}`);
                return {
                    ...lead,
                    customer_name: `${customerResponse.data.customer_fname} ${customerResponse.data.customer_lname}`,
                };
            }));
            setLeads(leadData);
        } catch (err) {
            console.error("Failed to fetch lead feeds", err);
        }
    };

    useEffect(() => {
        fetchLeadFeeds();
    }, []);

    const handlePick = (lf_id) => {
        setLeads(leads.filter(lead => lead.lf_id !== lf_id));
    };
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
                className="scrollable-container"
                sx={{ 
                    width: '100%',
                    height: '17rem',
                    py: '1rem',
                    overflowY: 'scroll',
                }}>
                <Box width={'100%'} height={'100%'}
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'center',
                    }}>
                    {
                        leads.map((lead) => (
                            <LeadFeedCard key={lead.lf_id} lead={lead} onPick={handlePick} />
                        ))
                    }
                </Box>
            </Paper>
            </>
        </Box>
    );
}
