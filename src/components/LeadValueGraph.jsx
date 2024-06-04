import { Box, Grid } from "@mui/material";
import React from "react";
import LeadGraphLine from "./LeadGraphLine";
import LeadGraphSub from "./LeadGraphSub";

export default function LeadValueGraph() {
    return (
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
            <Grid item xs={4} sm={8} md={9} lg={12}>
                <LeadGraphLine/>
            </Grid>
            <Grid item xs={4} sm={8} md={3} lg={4}>
                <LeadGraphSub/>
            </Grid>
        </Grid>
    );
}

