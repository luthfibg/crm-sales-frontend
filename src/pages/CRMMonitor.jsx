import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";

function CRMMonitor() {

    return (
        <>
        <Box sx={{ width:'100%', height:'3rem', display: 'flex', justifyContent: 'start', alignItems: 'center', bgcolor: darkTheme.palette.background.paper2 }}>
            <Typography sx={{ marginLeft:'1rem', fontSize:'1.1rem', color: darkTheme.palette.text.disabled }}>CRMas Monitor</Typography>
        </Box>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}>
            <Grid item xs={4} sm={8} md={6} lg={8} xl={10}>
                <Typography>Paper/Card contain sales live data</Typography>
            </Grid>
        </Grid>
        </>
    );
}

export default CRMMonitor;