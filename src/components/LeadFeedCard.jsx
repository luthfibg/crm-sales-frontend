import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";

const LeadFeedCard = ({ wish }) => {
    const productSubcategory = wish.product_cat === 'corporate' ? wish.product_subcat : wish.product_subcat2;

    return (
        <Card sx={{ display: 'flex', pr: 2, width: {xs: '95%', md: '90%'}, justifyContent: 'space-between', backgroundColor: darkTheme.palette.background.paper2 }}>
            <CardMedia
                component="img"
                sx={{ width: 120 }}
                image={wish.image_url || "/static/images/cards/live-from-space.jpg"}
                alt={wish.product_type || "Product image"}
            />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" fontSize={16} fontWeight={700}>
                        {wish.product_type}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary" component="div">
                        {productSubcategory}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" fontSize={16} fontWeight={700}>
                        {wish.customer_fname} {wish.customer_lname}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary" component="div">
                        {wish.customer_institution}
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
