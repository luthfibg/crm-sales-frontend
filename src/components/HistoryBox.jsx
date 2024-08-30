import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import darkTheme from '../styles/darkTheme';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from "axios";
import LeadFeedCard from "./LeadFeedCard";

export default function HistoryBox() {
    const token = localStorage.getItem('token');

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
                marginRight: '1rem',
            }}>
            <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingY:'0.5rem' }}>
                <Typography sx={{ marginLeft:'0.5rem', fontSize:'0.7rem', color: darkTheme.palette.text.disabled }}>Riwayat</Typography>
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
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Typography variant="body2" color="textSecondary" fontSize={'0.7rem'} display={'flex'} flexDirection={'column'}>
                        Tidak Ada Riwayat
                    </Typography>
                </Box>
            </Paper>
            </>
        </Box>
    );
}
