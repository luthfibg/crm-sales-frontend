import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import darkTheme from '../styles/darkTheme';
import Chip from '@mui/material/Chip';
import axiosInstance from '../axiosConfig';

function OppFeedCard({ opportunity, onPick }) {

    const token = localStorage.getItem('token');
    const handlePick = async () => {
        try {
            await axiosInstance.delete(`http://localhost:2999/data/opp_feeds/${opportunity.of_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onPick(opportunity.of_id); // Mengupdate state di parent component
        } catch (error) {
            console.error('Failed to pick opportunity:', error);
        }
    };


    
    return (
        <>
        <Box bgcolor={darkTheme.palette.background.paper2}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                // marginBottom: '0.5rem',
                width: '100%',
                borderRadius: '4px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="body2" color="textSecondary" fontSize={'0.7rem'} display={'flex'} flexDirection={'column'}>
                <Chip label="Opportunity" color="warning" size="small" sx={{width: 'fit-content', height: 'fit-content', fontSize: '0.55rem', mb: '0.2rem'}} />
                <Box>
                    {opportunity.customer_name} (Kapan: {opportunity.created_at})
                </Box>
            </Typography>
            <Button size="small" variant="contained" color="primary" onClick={handlePick}>
                Pick
            </Button>
        </Box>
        <Divider orientation='horizontal' width='100%' />
        </>
    );
}

export default OppFeedCard;
