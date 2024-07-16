import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const LeadFeedCard = () => {
    return (
        <Card sx={{ display: 'flex', pr: 2, width: '90%', justifyContent: 'space-between'}}>
            <CardMedia
                component="img"
                sx={{ width: 120 }}
                image="/static/images/cards/live-from-space.jpg"
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" fontSize={16} fontWeight={700}>
                        CV. Mekarjaya
                    </Typography>
                    <Typography fontSize={12} color="text.secondary" component="div">
                        Arya Wardhana
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button variant="contained" size="small">Pick</Button>
            </Box>
        </Card>
    );
};

export default LeadFeedCard;
                