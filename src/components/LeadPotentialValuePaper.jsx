import React from "react";
import { Paper } from "@mui/material";
import darkTheme from "../styles/darkTheme";
import LeadPotentialValue from "./LeadPotentialValue";

export default function LeadPotentialValuePaper() {
    const username = localStorage.getItem('username');
    return (
        <Paper
            sx={{
                width: "100%",
                height: "17rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: darkTheme.palette.background.paper,
            }}>
            {/* <LeadPotentialValue username={username}/> */}
        </Paper>
    );
}

