import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import darkTheme from "../styles/darkTheme";

export default function LeadGraphSub() {
    return (
        <Paper
            sx={{
                width: "100%",
                height: "17rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: darkTheme.palette.background.paper,
                mb: "1rem",
            }}
        >
            <Typography>Chart Line Resume</Typography>
        </Paper>
    );
}