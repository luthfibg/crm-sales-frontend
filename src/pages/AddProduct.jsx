import { Button, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import darkTheme from "../styles/darkTheme";
import MenuItem from "@mui/material/MenuItem";
import axiosInstance from "../axiosConfig";
// import { storage } from "../firebase";
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddProduct() {
    const product_cat = [
        { value: 'corporate', label: 'Korporat' },
        { value: 'c&i', label: 'Komersial dan Industri' },
    ];
    const product_subcat = [
        { value: '', label: '' },
        { value: 'interactive flat panel', label: 'Interactive Flat Panel' },
        { value: 'panel presentation display', label: 'Panel Presentation Display' },
        { value: 'smartboard', label: 'Smartboard' },
        { value: 'video conference', label: 'Video Conference' },
        { value: 'videotron', label: 'Videotron' },
        { value: 'videowall', label: 'Videowall' },
        { value: 'transparent led', label: 'Transparent LED' },
        { value: 'digital signage', label: 'Digital Signage' },
        { value: 'smart podium', label: 'Smart Podium' },
        { value: 'led all in one', label: 'LED All-in-One' },
        { value: 'camera ip', label: 'Smart IP Camera' },
        { value: 'audio', label: 'Audio' },
        { value: 'smart film', label: 'Smart Film' },
        { value: 'projector', label: 'Projector' },
        { value: 'anjungan pendaftaran mandiri', label: 'APM' },
    ];
    const product_subcat2 = [
        { value: '', label: '' },
        { value: 'sublimation printer', label: 'Printer Sublimasi' },
        { value: 'direct to garment printer', label: 'Printer Direct to Garment' },
        { value: 'inkjet printer', label: 'Printer Inkjet' },
        { value: 'scanner', label: 'Scanner' },
        { value: 'heat press machine', label: 'Heat Press Machine' },
        { value: 'cutting machine', label: 'Cutting Machine' },
        { value: 'uv flat bed printer', label: 'UV Flat Bed Printer' },
        { value: 'flag printer', label: 'Flag Printer' },
        { value: 'technical printer', label: 'Technical Printer' },
        { value: 'paper lab', label: 'Paper Lab' },
        { value: 'scanner', label: 'Scanner' },
        { value: 'eco-solvent printer', label: 'Eco-Solvent Printer' },
        { value: 'graphic printer', label: 'Graphic Printer' },
    ];
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_cat: product_cat[0].value,
        product_subcat: product_subcat[0].value,
        product_subcat2: product_subcat2[0].value,
        product_type: "",
        product_spec: "",
        product_tkdn_percentage: 0,
        product_bmp_value: 0,
        product_price: 0.00,
        product_stars: 0,
        product_image_1: null,
        product_image_2: null,
        product_image_3: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === 'file' ? (files ? files[0] : null) : value,
        }));
    };

    // const handleUpload = async (file) => {
    //     const storageRef = ref(storage, `products/${file.name}`);
    //     const snapshot = await uploadBytes(storageRef, file);
    //     return await getDownloadURL(snapshot.ref);
    // };

    const handleOnclickSave = async (e) => {
        e.preventDefault();
        console.log('Product picture: ', product.product_image_1);
    
        try {
            // Create FormData object
            const formData = new FormData();
            for (let key in product) {
                if (product[key]) {
                    formData.append(key, product[key]);
                }
            }
    
            // Send the form data to the backend
            const response = await axiosInstance.post("/data/products", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log(response.data.message);
            navigate('/products');
        } catch (err) {
            console.error(err.response?.data?.error || err.message);
        }
    };
        
    return (
        <Container maxWidth="xl">
            <Paper sx={{
                width: "100%", height: "85vh", marginTop: "10vh", marginBottom: "10vh",
                display: "flex", justifyContent: "center",
                alignItems: "center", flexDirection: "column",
                bgcolor: darkTheme.palette.background.paper2,
                border: "0.05rem solid white", overflow: "auto",
                "& > *": {
                    flex: "0 0 auto", // Prevent flex items from growing or shrinking
                    marginBottom: "1rem", // Add some spacing between flex items
                },
            }}>
                <Typography sx={{ marginBottom: "2rem" }}>Add Product</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 15 }} sx={{ margin: 0 }}>
                    <Grid item xs={4} sm={8} md={4} lg={5} sx={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
                        <TextField
                            name="product_cat"
                            id="outlined-product-cat"
                            select
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                            label="Kategori Produk"
                            value={product.product_cat}
                            onChange={handleChange}
                            inputProps={{ "data-testid": "status-input" }}
                        >
                            {product_cat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            name="product_subcat"
                            id="outlined-product-subcat"
                            select
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                            label="SubKategori Produk"
                            value={product.product_subcat}
                            onChange={handleChange}
                            inputProps={{ "data-testid": "status-input" }}
                        >
                            {product_subcat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            onChange={handleChange}
                            name="product_type"
                            id="outlined-product-type"
                            label="Tipe Produk"
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                        />
                        <TextField
                            onChange={handleChange}
                            multiline
                            rows={3}
                            name="product_spec"
                            id="outlined-product-spec"
                            label="Spesifikasi"
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={8} md={4} lg={5} sx={{ margin: "0 auto" }}>
                        <TextField
                            name="product_subcat2"
                            id="outlined-product-subcat2"
                            select
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                            label="SubKategori Produk"
                            value={product.product_subcat2}
                            onChange={handleChange}
                            inputProps={{ "data-testid": "status-input" }}
                        >
                            {product_subcat2.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            onChange={handleChange}
                            name="product_tkdn_percentage"
                            type="number"
                            id="outlined-product-tkdn-percentage"
                            label="Nilai TKDN"
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                        />
                        <TextField
                            onChange={handleChange}
                            name="product_bmp_value"
                            type="number"
                            id="outlined-product-bmp-value"
                            label="Nilai BMP"
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                        />
                        <TextField
                            onChange={handleChange}
                            name="product_price"
                            type="number"
                            id="outlined-product-price"
                            label="Harga"
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={8} md={4} lg={5} sx={{ margin: "0 auto" }}>
                        <TextField
                            onChange={handleChange}
                            name="product_image_1"
                            type="file"
                            id="outlined-product-image-1"
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                        />
                        <TextField
                            onChange={handleChange}
                            name="product_image_2"
                            type="file"
                            id="outlined-product-image-2"
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                        />
                        <TextField
                            onChange={handleChange}
                            name="product_image_3"
                            type="file"
                            id="outlined-product-image-3"
                            sx={{ width: "96%", marginBottom: "0.5rem" }}
                        />
                    </Grid>
                </Grid>
                <Stack orientation="horizontal">
                    <Button onClick={handleOnclickSave} sx={{ width: '30%', mr: '1rem' }} variant="outlined">Simpan</Button>
                </Stack>
            </Paper>
        </Container>
    );
}
