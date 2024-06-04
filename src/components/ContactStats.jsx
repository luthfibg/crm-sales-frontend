import { Stack, Grid } from "@mui/material";
import React from "react";
import darkTheme from '../styles/darkTheme';
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
        <Grid container spacing={2} marginBottom={2}>
            <Grid item xs>
                <ContactStatLeft/>
            </Grid>
            <Grid item xs>
                <ContactStatRight/>
            </Grid>
        </Grid>
    );
}