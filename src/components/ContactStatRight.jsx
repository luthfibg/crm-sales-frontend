import { Box, Paper, Typography, Stack, IconButton, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import darkTheme from "../styles/darkTheme";
import ReplayIcon from '@mui/icons-material/Replay';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import CustomLegend from "../styles/legendCustom";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

export default function ContactStatRight() {

    const [contactData, setContactData] = useState([]);

    // fetch contacts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:2999/data/contacts');
                const data = await response.json();
                setContactData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchContacts();
    }, []);

    // retrieve contact status count
    const getStatusCount = () => {
        const statusCount = {
            'Masuk': 0,
            'Follow Up': 0,
            'Menganggur': 0,
            'Gagal': 0,
            'Deal': 0
        };

        contactData.forEach(contact => {
            statusCount[contact.status] += 1;
        });

        return Object.keys(statusCount).map(key => ({
            name: key,
            value: statusCount[key]
        }));
    };

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
                <Typography sx={{ marginLeft:'0.5rem', fontSize:'0.7rem' }}>Contact Resume</Typography>
                <Stack direction="row" spacing={1} sx={{ marginLeft: 'auto', marginRight: '0.5rem' }}>
                    <IconButton size="small" sx={{ width: '1.2rem', height: '1.2rem' }}>
                        <ReplayIcon fontSize="small" color="primary"/>
                    </IconButton>
                    <IconButton size="small" sx={{ width: '1.2rem', height: '1.2rem' }}>
                        <BuildCircleIcon fontSize="small" color="primary"/>
                    </IconButton>
                </Stack>
            </Box>
            <Paper
                sx={{ 
                    width: '100%',
                    height: '17rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    m:'0 px',
                    px: '0.5rem',
                }}>
                <Stack spacing={1} direction={"row"} width={'100%'}>
                    <Typography width={'40%'} textAlign={'center'}>Horizontal Statistical Lines</Typography>
                    <Divider variant="middle" orientation="vertical" flexItem/>
                    <PieChart width={260} height={200}>
                        <Pie
                            data={getStatusCount()}
                            cx={140}
                            cy={110}
                            innerRadius={50}
                            outerRadius={70}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            legendType="circle"
                            // label={({ name, value }) => `${name}: ${value}`}
                            >
                            {
                                getStatusCount().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend content={<CustomLegend />} />
                    </PieChart>
                </Stack>
            </Paper>
            </>
        </Box>
    );
}