import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import darkTheme from '../styles/darkTheme';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from "axios";
import LeadFeedCard from "./LeadFeedCard";
import OppFeedCard from "./OppFeedCard";
import axiosInstance from "../axiosConfig";

export default function ContactStatLeft() {
    const [leads, setLeads] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const token = localStorage.getItem('token');

    const fetchLeadFeeds = async () => {
        try {
            const response = await axiosInstance.get('/data/lead_feeds');
            const leadData = await Promise.all(response.data.map(async (lead) => {
                const customerResponse = await axiosInstance.get(`/data/customer_accs/${lead.customer_id}`);
                return {
                    ...lead,
                    customer_name: `${customerResponse.data.customer_fname} ${customerResponse.data.customer_lname}`
                };
            }));
            setLeads(leadData);
        } catch (err) {
            console.error("Failed to fetch lead feeds", err);
        }
    };

    const fetchOppFeeds = async () => {
        try {
            const response = await axiosInstance.get('/data/opp_feeds', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const opportunityData = await Promise.all(response.data.map(async (opportunity) => {
                const customerResponse = await axiosInstance.get(`/data/customer_accs/${opportunity.customer_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return {
                    ...opportunity,
                    customer_name: `${customerResponse.data.customer_fname} ${customerResponse.data.customer_lname}`,
                };
            }));
            setOpportunities(opportunityData);
        } catch (err) {
            console.error("Failed to fetch opportunity feeds", err);
        }
    };

    useEffect(() => {
        fetchLeadFeeds();
        fetchOppFeeds();
    }, []);

    const handleLeadPick = (lf_id) => {
        setLeads(leads.filter(lead => lead.lf_id !== lf_id));
    };

    const handleOppPick = (of_id) => {
        setOpportunities(opportunities.filter(opportunity => opportunity.of_id !== of_id));
    };

    return (
        <Box 
            sx={{ 
                display: 'flex',
                width: '50%',
                height: '100%',
                justifyContent: 'center',
                flexDirection: 'column',
                bgcolor: darkTheme.palette.background.paper2,
                borderRadius: '0.3rem',
            }}>
            <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingY:'0.5rem' }}>
                <Typography sx={{ marginLeft:'0.5rem', fontSize:'0.7rem', color: darkTheme.palette.text.disabled }}>Umpan Baru</Typography>
                <Stack direction="row" sx={{ marginLeft: 'auto', marginRight: '0.5rem' }}>
                    <IconButton size="small" sx={{ width: '1.2rem', height: '1.2rem' }}>
                        <ReplayIcon fontSize="small" color="primary"/>
                    </IconButton>
                </Stack>
            </Box>
            <Paper
                className="scrollable-container"
                elevation={2}
                sx={{ 
                    width: '100%',
                    height: '17rem',
                    overflowY: 'scroll',
                }}>
                <Box width={'100%'} height={'100%'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: (leads.length === 0 && opportunities.length === 0) ? 'center' : 'start',
                        alignItems: 'center',
                    }}>                    
                    {(leads.length === 0 && opportunities.length === 0) ? (
                        <Typography variant="body2" color="textSecondary" fontSize={'0.7rem'} display={'flex'} flexDirection={'column'}>
                            Tidak ada umpan
                        </Typography>
                    ) : (
                        <>
                            {leads.length > 0 && (
                                <>
                                    {leads.map((lead) => (
                                        <LeadFeedCard key={lead.lf_id} lead={lead} onPick={handleLeadPick} />
                                    ))}
                                </>
                            )}

                            {opportunities.length > 0 && (
                                <>
                                    {opportunities.map((opportunity) => (
                                        <OppFeedCard key={opportunity.of_id} opportunity={opportunity} onPick={handleOppPick} />
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Paper>
            </>
        </Box>
    );
}
