import { Box, Card, CardActionArea, CardActions, Stack, Typography, ToggleButton, ToggleButtonGroup, Divider } from "@mui/material";
import PowerSharp from '@mui/icons-material/PowerSharp';
import PowerOffSharp from '@mui/icons-material/PowerOffSharp';
import React from "react";

export default function ProductCard({ product, onToggle, onRemove, initialDisplay }) {
    const [display, setDisplay] = React.useState(initialDisplay);

    const handleChange = (event, newDisplay) => {
        setDisplay(newDisplay);
        if (newDisplay === 'on') {
            onToggle(product);
        } else if (onRemove) {
            onRemove(product);
        }
    };

    return (
        <Card sx={{ width: '90%', flexDirection: 'row', display: 'flex', alignItems: 'center', my: '0.25rem' }}>
            <Stack orientation="row" spacing={1} direction="row">
                <CardActions>
                    <Box sx={{ flexGrow: 1 }}>
                        <ToggleButtonGroup
                            color="primary"
                            value={display}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="off"><PowerOffSharp /></ToggleButton>
                            <ToggleButton value="on"><PowerSharp /></ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </CardActions>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography align="center" gutterBottom fontSize={11} component="div">
                            Category
                        </Typography>
                        <Divider orientation="horizontal" flexItem />
                        <Typography align="center" className="product_attr" gutterBottom fontSize={11} component="div">
                            {product.product_cat}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                        <Typography align="center" gutterBottom fontSize={11} component="div">
                            Sub Category
                        </Typography>
                        <Divider orientation="horizontal" flexItem />
                        <Typography align="center" className="product_attr" gutterBottom fontSize={11} component="div">
                            {product.product_subcat}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                        <Typography align="center" gutterBottom fontSize={11} component="div">
                            Type
                        </Typography>
                        <Divider orientation="horizontal" flexItem />
                        <Typography align="center" className="product_attr" gutterBottom fontSize={11} component="div">
                            {product.product_type}
                        </Typography>
                    </Box>
                </CardActionArea>
            </Stack>
        </Card>
    );
}
