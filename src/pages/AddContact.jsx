import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';


const AddContact = () => {

    const status = [
        {
            value:'Masuk',
            label:'Masuk'
        },
        {
            value:'Follow Up',
            label:'Follow Up'
        },
        {
            value:'Menganggur',
            label:'Menganggur'
        },
        {
            value:'Gagal',
            label:'Gagal'
        },
        {
            value:'Deal',
            label:'Deal'
        }
    ];
    

    const navigate = useNavigate();
    const [contact, setContact] = useState({
        person:"",
        person_address:"",
        institution:"",
        position:"",
        institution_address:"",
        email_address:"",
        email_address2:"",
        phone:"",
        phone2:"",
        socmed_link:"",
        status:"",
        descriptions:""
    });

    const handleChange = (e) => {
        setContact((prev) => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleOnclickSave = async e => {
        e.preventDefault();
        console.log('Contact data being sent:', contact); // logging passed
        try {
            await axios.post("http://localhost:2999/data/contacts", contact);
            navigate('/');    
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container maxWidth='lg' sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
            <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '31ch' },
        }}
        noValidate
        autoComplete="off">
            <Typography sx={{ display:'flex', justifyContent:'center', mb:'2rem' }} variant="h5">Daftarkan Kontak Baru</Typography>
            <div>
                <TextField onChange={handleChange} name="person"
                id="outlined-required"
                label="Nama Customer"
                />
                <TextField onChange={handleChange} name="person_address"
                id="outlined-disabled"
                label="Alamat"
                type="text"
                />
                <TextField onChange={handleChange} name="institution"
                id="outlined-password-input"
                label="Nama Institusi"
                type="text"
                autoComplete="current-password"
                />
                <TextField onChange={handleChange} name="position"
                id="outlined-position-input"
                label="Jabatan"
                />
                <TextField onChange={handleChange} name="institution_address"
                id="outlined-number"
                label="Alamat Institusi"
                type="text"
                />
                <TextField onChange={handleChange} name="email_address" id="outlined-email" label="Email" type="email" />
                <TextField onChange={handleChange} name="email_address2" id="outlined-email2" label="Email 2" type="email" />
                <TextField onChange={handleChange} name="phone"
                id="outlined-helperText"
                label="Telepon"
                defaultValue="08"
                helperText="Nomor Telepon Whatsapp"
                />
                <TextField onChange={handleChange} name="phone2"
                id="outlined-helperText"
                label="Telepon 2"
                defaultValue="08"
                helperText="Nomor Telepon Alternatif"
                />
                <TextField onChange={handleChange} name="socmed_link" id="outlined-socmed" label="Link Media Sosial" type="text" />
                <TextField
                    id="outlined-select-status"
                    select
                    label="Status Kontak"
                    name="status"
                    defaultValue="Masuk"
                    helperText="Pilih Status"
                    >
                    {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField 
                onChange={handleChange} 
                name="descriptions" id="outlined-desc" 
                label="Deskripsi" type="text"
                multiline
                rows={4} />
                <Box display={"flex"}>
                    <Button onClick={handleOnclickSave} sx={{ width:'30%', mr:'1rem' }} variant="outlined">Simpan</Button>
                    <Button component={Link} to="/"  sx={{ width:'30%', ml:'1rem' }} variant="outlined">Batal</Button>
                </Box>
            </div>
        </Box>
        </Container>
        
    )
}

export default AddContact