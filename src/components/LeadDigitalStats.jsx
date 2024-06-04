import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";

export default function LeadDigitalStats() {
    return (
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} width={'auto'} height={'auto'} sx={{ mb:'1rem' }}>
            <Grid item xs={4} sm={8} md={6} lg={8}>
                <Paper
                    sx={{
                        width: "100%",
                        height: "6rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: darkTheme.palette.background.paper,
                    }}>
                    <Typography>Timelines Progress</Typography>
                </Paper>
            </Grid>
            <Grid item xs={4} sm={8} md={6} lg={8}>
                <Paper
                    sx={{
                        width: "100%",
                        height: "6rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: darkTheme.palette.background.paper,
                    }}>
                    <Typography>Digital Stats</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}