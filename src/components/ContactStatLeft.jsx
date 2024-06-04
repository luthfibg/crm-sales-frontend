import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import darkTheme from '../styles/darkTheme';
import ReplayIcon from '@mui/icons-material/Replay';

export default function ContactStatLeft() {
    return (
        <Box 
        sx={{ 
            display: 'flex',
            width: '100%',
            height: 'auto',
            justifyContent: 'center',
            flexDirection: 'column',
            bgcolor: darkTheme.palette.background.paper2,
            borderRadius: '0.3rem',
            p: '0 0.5rem 0.5rem 0.5rem'
        }}>
            <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingY:'0.5rem' }}>
                <Typography sx={{ marginLeft:'0.5rem', fontSize:'0.7rem' }}>Leading Contacts</Typography>
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
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Typography>Leading List Table</Typography>
            </Paper>
            </>
        </Box>
    );
}