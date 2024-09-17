import { Box, Chip, Paper, Typography } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";

export default function InterStats() {

    const [totalLeads, setTotalLeads] = useState(0); // useState untuk total leads
    const [totalOpportunities, setTotalOpportunities] = useState(0); // useState untuk total opportunities
    const [totalProjects, setTotalProjects] = useState(0); // useState untuk total projects
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axiosInstance.get(`/${username}/data/leads`);
                const data = response.data;
                setTotalLeads(data.length); // Set total leads
            } catch (err) {
                console.log(err);
            }
        };
        fetchLeads();
    
        const fetchOpportunities = async () => {
            try {
                const response = await axiosInstance.get(`/${username}/data/opportunities`);
                const data = response.data;
                setTotalOpportunities(data.length); // Set total opportunities
            } catch (err) {
                console.log(err);
            }
        };
        fetchOpportunities();
    
        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get(`/${username}/data/projects`);
                const data = response.data;
                setTotalProjects(data.length); // Set total projects
            } catch (err) {
                console.log(err);
            }
        };
        fetchProjects();
    
    }, [username]);

    return (
        <Paper sx={{ width: "100%", bgcolor: darkTheme.palette.background.paper, height: "8rem", margin:'0px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scroll', '@media (min-width: 900px)': { overflow:'hidden'}, borderRadius: '0.3rem' }}>
            <Box sx={{  width:'20%', height:'6rem', '@media (min-width: 900px)': { width:'12%'}, borderRadius: '0.3rem', mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
                    <CircularProgress variant="determinate" value={45} size={100} thickness={4} style={{ width: '70px', height: '70px' }} />
                    <Box
                        sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" fontSize={'1rem'} component="div" color={darkTheme.palette.secondary.main}>
                        {totalLeads}
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Leading" size="small" color="default" />
            </Box>
            <Box sx={{  width:'20%', height:'6rem', '@media (min-width: 900px)': { width:'12%'}, mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
                    <CircularProgress variant="determinate" value={28} size={100} thickness={4} style={{ width: '70px', height: '70px' }} />
                    <Box
                        sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" fontSize={'1rem'} component="div" color={darkTheme.palette.secondary.main}>
                        {totalOpportunities}
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Opportunities" size="small" color="default" />
            </Box>
            <Box sx={{  width:'20%', height:'6rem', '@media (min-width: 900px)': { width:'12%'}, mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
                    <CircularProgress variant="determinate" value={30} size={100} thickness={4} style={{ width: '70px', height: '70px' }} />
                    <Box
                        sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" fontSize={'1rem'} component="div" color={darkTheme.palette.secondary.main}>
                        {totalProjects}
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Projects" size="small" color="default" />
            </Box>
            <Box sx={{  width:'20%', height:'6rem', '@media (min-width: 900px)': { width:'12%'}, mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
                    <CircularProgress variant="determinate" value={40} size={100} thickness={4} style={{ width: '70px', height: '70px' }} />
                    <Box
                        sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" fontSize={'1rem'} component="div" color={darkTheme.palette.secondary.main}>
                        245M
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Incoming Revenue" size="small" color="default" />
            </Box>
            <Box sx={{  width:'20%', height:'6rem', '@media (min-width: 900px)': { width:'12%'}, mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
                    <CircularProgress variant="determinate" value={85} size={100} thickness={4} style={{ width: '70px', height: '70px' }} />
                    <Box
                        sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" fontSize={'1rem'} component="div" color={darkTheme.palette.secondary.main}>
                        8.5
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Sales Rate" size="small" color="default" />
            </Box>
        </Paper>
    )
}