import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import darkTheme from "../styles/darkTheme";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

export default function AddProduct() {

    const product_cat = [
        { value:'corporate', label:'Korporat' },
        { value:'c&i', label:'Komersial dan Industri' },
    ]
    const product_subcat = [
        { value:'', label:'' },
        { value:'ifp', label:'Interactive Flat Panel'},
        { value:'ppd', label:'Panel Presentation Display' },
        { value:'smartboard', label:'Smartboard' },
        { value:'video conference', label:'Video Conference' },
        { value:'videotron', label:'Videotron' },
        { value:'videowall', label:'Videowall' },
        { value:'led aio', label: 'LED All-in-One' },
        { value:'camera ip', label: 'Camera IP' },
        { value:'digital signage', label: 'Digital Signage' },
        { value:'apm', label: 'APM' },
    ];
    const product_subcat2 = [
        { value:'', label:'' },
        { value:'sublimation printer', label:'Printer Sublimasi'},
        { value:'dtg printer', label:'Printer Direct to Garment'},
        { value:'inkjet printer', label:'Printer Inkjet'},
        { value:'scanner', label:'Scanner' },
        { value:'hpm', label:'Heat Press Machine' },
        { value:'cutting machine', label:'Cutting Machine' },
        { value:'paper lab', label:'Paper Lab' },
    ];
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_cat: product_cat[0].value,
        product_subcat: product_subcat[0].value,
        product_subcat2: product_subcat2[0].value,
        product_type:"",
        product_spec:"",
        product_tkdn_precentage:"",
        product_bmp_value:"",
        product_price:"",
        product_stars:"",
        product_image_1:"",
        product_image_2:"",
        product_image_3:"",
    });

    const handleChange = (e) => {
        setProduct((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleOnclickSave = async e => {
        e.preventDefault()

        console.log('Product being sent:', product); // logging passed
        try {
            const response = await axios.post("http://localhost:2999/data/product", product);
            console.log(response.data.message);
            navigate('/products');
        } catch (err) {
            console.error(err.response?.data?.error || err.message);
        }
    };

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "100%", height: "16rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor: darkTheme.palette.background.paper2, border: "0.2rem solid white" }}>
                <Typography>Add Product</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 15 }}>
                    <Grid item xs={4} sm={8} md={4} lg={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <TextField name="product_cat" id="outlined-product-cat"
                            select
                            label="Kategori Produk"
                            value={product.product_cat}
                            onChange={handleChange}
                            // defaultValue="Masuk"
                            inputProps={{ "data-testid": "status-input" }}
                            helperText="Pilih Kategori"
                            >
                            {product_cat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField name="product_subcat" id="outlined-product-subcat"
                            select
                            label="SubKategori Produk"
                            value={product.product_subcat}
                            onChange={handleChange}
                            // defaultValue="Masuk"
                            inputProps={{ "data-testid": "status-input" }}
                            helperText="Pilih Sub-Kategori"
                            >
                            {product_subcat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>    
                    <Grid item xs={4} sm={8} md={4} lg={5}></Grid>    
                    <Grid item xs={4} sm={8} md={4} lg={5}></Grid>    
                </Grid>
            </Paper>
        </Container>
    );
}