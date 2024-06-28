import React from "react";
import MyAppBar from "../components/MyAppBar";
import { Button, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import darkTheme from "../styles/darkTheme";
import { useNavigate } from "react-router-dom";


export default function ManageProducts() {
    const navigate = useNavigate();
    const handleAddProduct = () => {
        navigate('/add_products');
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
                        <Paper sx={{ width: "100%", height: "16rem", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: darkTheme.palette.background.paper }}>
                            <Typography>Product List</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} sm={8} md={6} lg={8}>
                        <Paper sx={{ width: "100%", height: "16rem", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: darkTheme.palette.background.paper }}>
                            <Typography>Product Sale</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}