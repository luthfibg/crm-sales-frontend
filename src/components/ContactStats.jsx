import { Grid } from "@mui/material";
import React from "react";
import ContactStatLeft from "./ContactStatLeft";
import ContactStatRight from "./ContactStatRight";

export default function ContactStats() {
    return (
        // <Stack
        //     direction="row"
        //     spacing={2}
        //     sx={{ 
        //         mt: '1rem',
        //         mb: '1rem',
        //         width: '100%',
        //         borderRadius: '0.3rem',
        //     }}
        //     bgcolor={darkTheme.palette.background.paper2}
        //     >
        //         <ContactStatLeft/>
        //         <ContactStatRight/>
        // </Stack>
        <Grid container spacing={2} marginBottom={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
            <Grid item xs={4} sm={4} md={6} lg={8}>
                <ContactStatLeft/>
            </Grid>
            <Grid item xs={4} sm={4} md={6} lg={8}>
                <ContactStatRight/>
            </Grid>
        </Grid>
    );
}