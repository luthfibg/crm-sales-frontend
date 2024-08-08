import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import darkTheme from '../styles/darkTheme';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from "axios";
import LeadFeedCard from "./LeadFeedCard";

export default function ContactStatLeft() {
    const [wishlist, setWishlist] = useState([]);
  
    // Load data from API/backend
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:2999/data/wishlist`);
                setWishlist(response.data);
            } catch (err) {
                console.error("Failed to fetch wishlist", err);
            }
        };
        fetchWishlist();
    }, []);

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
                        wishlist.map((wish) => (
                            <LeadFeedCard key={wish.wishlist_id} wish={wish} />
                        ))
                    }
                </Box>
            </Paper>
            </>
        </Box>
    );
}
