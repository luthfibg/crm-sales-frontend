import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";

const LeadFeedCard = ({ wish }) => {
    return (
        <Card sx={{ display: 'flex', mb: 0.5, pr: 2, width: {xs: '95%', md: '90%'}, justifyContent: 'space-between', backgroundColor: darkTheme.palette.background.paper2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography component="div" fontSize={12} fontWeight={700} textTransform={'capitalize'}>
                        {wish.customer_fname} {wish.customer_lname}
                    </Typography>
                    <Typography fontSize={11} color="text.secondary" component="div" textTransform={'capitalize'}>
                        {/* Menampilkan jumlah total produk yang berkaitan dengan wishlist */}
                        {wish.total_products} Produk
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 0.5, pb: 0.5 }}>
                <Button variant="contained" size="small">Pick</Button>
            </Box>
        </Card>
    );
};

export default LeadFeedCard;
