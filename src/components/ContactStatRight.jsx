import { Box, Paper, Typography, Stack, IconButton, Divider, useMediaQuery, useTheme, Card, CardContent, CardActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import darkTheme from "../styles/darkTheme";
import ReplayIcon from '@mui/icons-material/Replay';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
// import { styled } from '@mui/material/styles';
// import CustomLegend from "../styles/legendCustom";

const COLORS = [darkTheme.palette.primary.light, '#E48EB2', '#EA8F8B', '#EF8F63', darkTheme.palette.secondary.dark, '#E469ED'];

export default function ContactStatRight() {

    const [totalContacts, setTotalContacts] = useState(0); // useState untuk total contacts
    const [contactData, setContactData] = useState([]);
    const theme = useTheme();

    // set screen size for responsive charts
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    // fetch contacts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:2999/data/contacts');
                const data = await response.json();
                setContactData(data);
                setTotalContacts(data.length); // Set total contacts
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
            if (statusCount.hasOwnProperty(contact.status)) {
                statusCount[contact.status] += 1;
            }
        });

        return Object.keys(statusCount).map(key => ({
            name: key,
            value: statusCount[key]
        }));
    };

    const renderCustomizedLabel = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        const outerX = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
        const outerY = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

        return (
            <>
                <line x1={outerX} y1={outerY} x2={x} y2={y} stroke={COLORS[index % COLORS.length]} strokeWidth={1} />
                <text
                    x={outerX}
                    y={outerY}
                    fill={COLORS[index % COLORS.length]}
                    textAnchor={outerX > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    fontSize={14} // Set the desired font size here
                >
                    {`${getStatusCount()[index].name}: ${getStatusCount()[index].value}`}
                </text>
            </>
        );
    };

    let chartSize = { width: 200, height: 200 };
    if (isXs) {
        chartSize = { width: 150, height: 150 };
    } else if (isSm) {
        chartSize = { width: 250, height: 250 };
    } else if (isMd) {
        chartSize = { width: 350, height: 350 };
    } else if (isLg) {
        chartSize = { width: 450, height: 450 };
    } else if (isXl) {
        chartSize = { width: 550, height: 550 };
    }

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
                <Typography sx={{ marginLeft:'0.5rem', fontSize:'0.7rem', color: darkTheme.palette.text.disabled }}>Contact Resume</Typography>
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
                    overflow: 'hidden',
                }}>
                <Stack spacing={1} direction={"row"} width={'100%'} alignItems={"center"}>
                    <Stack spacing={1} direction={"column"} width={'50%'} alignItems={"center"}>
                        <Card sx={{ width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 22 }} color="secondary.main" textAlign={'center'}>{totalContacts}</Typography>
                                <Typography sx={{ 
                                    fontSize: 10,
                                    '@media(min-width: 1200px)': { fontSize: 12 },
                                }} color="primary.light" textAlign={'center'}>Total Kontak</Typography>
                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>
                        <Card sx={{ width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 22 }} color="secondary.main" textAlign={'center'}>7</Typography>
                                <Typography sx={{ 
                                    fontSize: 10,
                                    '@media(min-width: 1200px)': { fontSize: 12 },
                                }} color="primary.light" textAlign={'center'}>Need Reactivate</Typography>
                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                        <Card sx={{ width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 22 }} color="secondary.main" textAlign={'center'}>---</Typography>
                                <Typography sx={{ 
                                    fontSize: 10,
                                    '@media(min-width: 1200px)': { fontSize: 12 },
                                }} color="primary.light" textAlign={'center'}>Top RFM Score</Typography>
                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>
                    </Stack>
                    <Divider variant="middle" orientation="vertical" flexItem/>
                    <PieChart width={chartSize.width} height={chartSize.height} title="Status Kontak">
                        <Pie
                            data={getStatusCount()}
                            cx={chartSize.width / 2}
                            cy={chartSize.height / 2}
                            innerRadius={chartSize.width / 6}
                            outerRadius={chartSize.width / 4}
                            fill="#8884d8"
                            paddingAngle={4}
                            dataKey="value"
                            label={renderCustomizedLabel}
                            
                            >
                            {
                                getStatusCount().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        {/* <Legend content={<CustomLegend />} /> */}
                    </PieChart>
                </Stack>
            </Paper>
            </>
        </Box>
    );
}