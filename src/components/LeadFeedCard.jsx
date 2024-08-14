import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

function LeadFeedCard({ lead, onPick }) {
    const handlePick = async () => {
        try {
            // Menghapus lead dari lead_feeds setelah dipick
            await axios.delete(`http://localhost:2999/data/lead_feeds/${lead.lf_id}`);
            onPick(lead.lf_id); // Mengupdate state di parent component
        } catch (error) {
            console.error('Failed to pick lead:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '90%',
                backgroundColor: '#f5f5f5',
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
    );
}

export default LeadFeedCard;
