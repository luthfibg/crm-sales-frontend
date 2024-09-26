import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import darkTheme from '../styles/darkTheme';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from "axios";
import ActivityCard from "./ActivityCard";
import axiosInstance from "../axiosConfig";

export default function ActivityBox() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const [activities, setActivities] = useState([]);

    const fetchActivities = async () => {
        try {
            const response = await axiosInstance.get(`/${username}/data/activities`);
            setActivities(response.data);
        } catch (err) {
            console.error("Failed to fetch activities", err);
        }
    };

    // Fetch activities only once on mount
    useEffect(() => {
        fetchActivities();
    }, []); // Empty dependency array ensures it runs only once

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
                <Typography sx={{ marginLeft:'0.5rem', fontSize:'0.7rem', color: darkTheme.palette.text.disabled }}>Aktivitas</Typography>
                <Stack direction="row" sx={{ marginLeft: 'auto', marginRight: '0.5rem' }}>
                    <IconButton size="small" sx={{ width: '1.2rem', height: '1.2rem' }} onClick={fetchActivities}>
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
                    py: '0rem',
                    overflowY: 'scroll',
                }}>
                <Box width={'100%'} height={'100%'}
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'start',
                }}>
                    {activities && activities.length > 0 ? (
                        activities.map((activity) => (
                            <ActivityCard key={activity.activity_id} activity={activity} username={username} />
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary" fontSize={'0.7rem'} display={'flex'} flexDirection={'column'}>
                            Tidak Ada Aktivitas
                        </Typography>
                    )}
                </Box>
            </Paper>
            </>
        </Box>
    );
}
