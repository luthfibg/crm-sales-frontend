import { Typography, Box, Divider } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";

export default function ActivityCard({ activity, username }) {
    return (
        <>
        <Box bgcolor={darkTheme.palette.background.paper}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                width: '100%',
                borderRadius: '4px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                // marginBottom: '0.5rem', // Add margin between cards
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                <Typography variant="body2" color="textSecondary" fontSize={'0.9rem'}>
                    {username}
                </Typography>
                {
                    activity.activity_describe === 'add contact manually' ? (
                        <Typography variant="body2" color="textSecondary" fontSize={'0.9rem'}>
                            1 Kontak Ditambahkan Manual
                        </Typography>
                    ) : activity.activity_describe === 'add lead manually' ?  (
                        <Typography variant="body2" color="textSecondary" fontSize={'0.9rem'}>
                            1 Lead Ditambahkan Manual
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="textSecondary" fontSize={'0.9rem'}>
                            {activity.activity_describe}
                        </Typography>
                    )
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '20%' }}>
                <Typography variant="body2" color="textSecondary" fontSize={'0.7rem'} display={'flex'} flexDirection={'column'}>
                    2 minutes ago
                </Typography>
            </Box>
        </Box>
        <Divider orientation="horizontal" width="100%" />
        </>
    );
}
