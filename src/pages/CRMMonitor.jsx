import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";

function CRMMonitor() {

    return (
        <>
        <Box sx={{ width:'100%', height:'3rem', display: 'flex', justifyContent: 'start', alignItems: 'center', bgcolor: darkTheme.palette.background.paper2 }}>
            <Typography sx={{ marginLeft:'1rem', fontSize:'1.1rem', color: darkTheme.palette.text.disabled }}>CRMas Monitor</Typography>
        </Box>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}>
            <Grid item xs={4} sm={8} md={12} lg={16} xl={20}>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}>
                    <Grid item xs={4} sm={8} md={3} lg={3} xl={4}>
                        <Paper></Paper>
                    </Grid>
                    <Grid item xs={4} sm={8} md={3} lg={5} xl={6}>
                        <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography>Live Data 3</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} sm={8} md={3} lg={5} xl={6}>
                        <Typography>Live Data 3</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={3} lg={3} xl={4}>
                        <Typography>Live Data 4</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sm={8} md={12} lg={16} xl={20}>
                <Typography>Paper/Card contain sales live data</Typography>
            </Grid>
        </Grid>
        </>
    );
}

export default CRMMonitor;