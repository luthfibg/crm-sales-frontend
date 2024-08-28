import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import axios from 'axios';
import darkTheme from '../styles/darkTheme';

function LeadFeedCard({ lead, onPick }) {

    const token = localStorage.getItem('token');
    const handlePick = async () => {
        try {
            await axios.delete(`http://localhost:2999/data/lead_feeds/${lead.lf_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onPick(lead.lf_id); // Mengupdate state di parent component
        } catch (error) {
            console.error('Failed to pick lead:', error);
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
            <Typography variant="body2" color="textSecondary">
                {lead.customer_name} (Produk: {lead.product_count})
            </Typography>
            <Button size="small" variant="contained" color="primary" onClick={handlePick}>
                Pick
            </Button>
        </Box>
        <Divider orientation='horizontal' width='100%' />
        </>
    );
}

export default LeadFeedCard;
