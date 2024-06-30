import React, { useState, useEffect } from "react";
import MyAppBar from "../components/MyAppBar";
import { Button, Container, Divider, Grid, Paper, Stack, Alert, Snackbar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import darkTheme from "../styles/darkTheme";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from 'axios';

export default function ManageProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [productsSale, setProductsSale] = useState([]);
    // const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // useEffect(() => {
    //     axios.get("/data/products")
    //         .then(response => setProducts(response.data))
    // }, []);
    const handleAddProduct = () => {
        navigate('/add_products');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:2999/data/products");
                setProducts(response.data);
            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        };
        const fetchProductsSale = async () => {
            try {
                const response = await axios.get("http://localhost:2999/data/products_sale");
                setProductsSale(response.data);
            } catch (err) {
                console.error("Failed to fetch products sale", err);
            }
        };
        fetchProducts();
        fetchProductsSale();
    }, []);

    // const handleToggleProduct = async (product) => {
    //     const existingProduct = productsSale.find(p => p.product_type === product.product_type);
    //     if (existingProduct) {
    //         setSnackbarOpen(true);
    //         return;
    //     }

    //     setProductsSale([...productsSale, product]);

    //     try {
    //         await axios.post("http://localhost:2999/data/products_sale", product);
    //     } catch (err) {
    //         console.error("Failed to add product to sale", err);
    //     }
    // };

    const handleToggleProduct = async (product) => {
        const isProductInSale = productsSale.some(p => p.product_type === product.product_type);
    
        if (isProductInSale) {
            setSnackbar({ open: true, message: 'Product already in sale list', severity: 'error' });
            return;
        }
    
        try {
            console.log('Sending product to backend:', product);
            const response = await axios.post("http://localhost:2999/data/products_sale", { product_id: product.product_id });
            console.log('Response from backend:', response.data);
            setProductsSale(productsSale => [...productsSale, product]);
            setSnackbar({ open: true, message: 'Product added to sale list', severity: 'success' });
        } catch (error) {
            console.error('Error adding product to sale list:', error);
        }
    };
    const handleRemoveProduct = async (product) => {
        const updatedProductsSale = productsSale.filter(p => p.product_type !== product.product_type);
        setProductsSale(updatedProductsSale);

        try {
            await axios.delete(`http://localhost:2999/data/products_sale/${product.product_id}`);
            console.log(product.product_id)
        } catch (err) {
            console.error("Failed to remove product from sale", err);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <MyAppBar />
            <Container maxWidth="xl" sx={{ marginTop: "5rem" }}>
                <Stack direction="row" spacing={2} sx={{ marginY: "1rem" }}>
                    <Button variant="link" onClick={handleAddProduct}>
                        <AddIcon fontSize="small" />&nbsp;Add Product
                    </Button>
                </Stack>
                <Divider orientation="horizontal" flexItem sx={{ marginBottom: "2rem" }} />
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
                    <Grid item xs={4} sm={8} md={6} lg={8}>
                        <Paper sx={{ width: "100%", height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", bgcolor: darkTheme.palette.background.paper2 }}>
                            {products.map((product) => (
                                <ProductCard key={product.product_id} product={product} onToggle={handleToggleProduct} initialDisplay={'off'} />
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item xs={4} sm={8} md={6} lg={8}>
                        <Paper sx={{ width: "100%", height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", bgcolor: darkTheme.palette.background.paper2 }}>
                            {productsSale.map((product) => (
                                <ProductCard key={product.product_id} product={product} onToggle={() => handleRemoveProduct(product)} initialDisplay={'on'}/>
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
