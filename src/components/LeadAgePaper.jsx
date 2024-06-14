import React from "react";
import { Paper, Typography } from "@mui/material";
import darkTheme from "../styles/darkTheme";
import LeadAge from "./LeadAge";

export default function LeadAgePaper() {
    return (
        <Paper
            sx={{
                width: "100%",
                height: "17rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                bgcolor: darkTheme.palette.background.paper,
                mb: "1rem",
            }}
        >
            <LeadAge/>
        </Paper>
    );
}