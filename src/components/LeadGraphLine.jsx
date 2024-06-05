import React from "react";
import { Paper, Typography } from "@mui/material";
import darkTheme from "../styles/darkTheme";

export default function LeadGraphLine() {
    return (
        <Paper
            sx={{
                width: "100%",
                height: "17rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: darkTheme.palette.background.paper,
            }}
        >
            <Typography>Line Chart</Typography>
        </Paper>
    );
}