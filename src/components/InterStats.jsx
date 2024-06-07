import { Box, Chip, Paper, Typography } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";
import { CircularProgress } from "@mui/material";

export default function InterStats() {
    return (
        <Paper sx={{ width: "100%", bgcolor: darkTheme.palette.background.paper, height: "8rem", margin:'0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{  width:'6rem', height:'6rem', mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
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
                        5
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Leading" size="small" color="secondary" />
            </Box>
            <Box sx={{  width:'6rem', height:'6rem', mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
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
                        3
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Deals" size="small" color="secondary" />
            </Box>
            <Box sx={{  width:'6rem', height:'6rem', mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
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
                        35M
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Revenue" size="small" color="secondary" />
            </Box>
            <Box sx={{  width:'6rem', height:'6rem', mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
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
                        245
                        </Typography>
                    </Box>
                </Box>
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Networks" size="small" color="secondary" />
            </Box>
            <Box sx={{  width:'6rem', height:'6rem', mr:'1rem', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', }}>
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
                <Chip sx={{ marginY: '0.5rem' }} variant="outlined" label="Sales Rate" size="small" color="secondary" />
            </Box>
        </Paper>
    )
}