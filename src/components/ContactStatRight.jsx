import { Box } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";

export default function ContactStatRight() {
    return (
        <Box 
        sx={{ 
            display: 'flex',
            width: '100%',
            height: '8rem',
            justifyContent: 'center',
            bgcolor: darkTheme.palette.background.paper2,
            borderRadius: '0.3rem',
        }}>
            <h4>Fitur Chat</h4>
        </Box>
    );
}