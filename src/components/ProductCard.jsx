import { Box, Card, CardActionArea, CardActions, Stack, Typography, ToggleButton, ToggleButtonGroup, Divider, Menu, MenuItem } from "@mui/material";
import PowerSharp from '@mui/icons-material/PowerSharp';
import PowerOffSharp from '@mui/icons-material/PowerOffSharp';
import React from "react";
import axios from "axios";

export default function ProductCard({ product, onToggle, onRemove, initialDisplay, disableToggleOn }) {
    const [display, setDisplay] = React.useState(initialDisplay);
    const productOptions = ['Datasheet', 'Edit', 'Remove'];
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    const username = localStorage.getItem('username');

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (anchorEl && !anchorEl.contains(event.target)) {
                handleCloseProductMenu();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [anchorEl]);
    
    const handleChange = (event, newDisplay) => {
        if (newDisplay === 'on' && disableToggleOn) return;
        setDisplay(newDisplay);
        if (newDisplay === 'on') {
            onToggle(product);
        } else if (newDisplay === 'off') {
            onRemove(product);
        }
    };

    const handleOpenProductMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseProductMenu = () => {
        setAnchorEl(null);
    };

    const handleRemoveProduct = async () => {
        try {
            await axios.delete(`http://localhost:2999/data/products/${product.product_id}`);
            console.log('Product deleted successfully');
            onRemove(product);
            window.location.reload();
        } catch (error) {
            error.response ? console.log(error.response.data) : console.log(error.message);
        }
    }

    return (
        <Card sx={{ width: '90%', height: '4rem', flexDirection: 'row', display: 'flex', alignItems: 'center', my: '0.25rem' }}>
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
                            <ToggleButton value="on" disabled={disableToggleOn}><PowerSharp /></ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </CardActions>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}
                    onClick={(event) => {
                        event.stopPropagation();  // Mencegah bubbling ke elemen lain
                        handleOpenProductMenu(event);  // Fungsi untuk membuka menu
                    }}
                    onMouseDown={(e) => e.stopPropagation()} // stop the event from bubbling up to the parent element
                    >
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
                    <Menu
                        sx={{ mt: '45px', borderColor: 'divider' }}
                        id="menu-product"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={(event) => {
                            event.stopPropagation();  // Jika diperlukan, untuk mencegah bubbling saat menutup menu
                            handleCloseProductMenu();  // Menutup menu
                        }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {productOptions.map((option) => (
                            <div key={option}>
                                <MenuItem onClick={() => {
                                    if (option === 'Datasheet') {
                                        window.open(product.product_datasheet);
                                    } else if (option === 'Edit') {
                                        window.location.href = `/edit_product/${product.product_id}`;
                                    } else if (option === 'Remove') {
                                        handleRemoveProduct();
                                    }
                                    handleCloseProductMenu(); // Tutup menu setelah memilih opsi
                                }}>
                                    {option}
                                </MenuItem>
                                <Divider sx={{ my: '0', margin: 0 }} />
                            </div>
                        ))}
                    </Menu>


                </CardActionArea>
            </Stack>
        </Card>
    );
}
