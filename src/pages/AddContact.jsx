import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';


const AddContact = () => {
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)
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
        sales_name:`${username}`,
        phone:"",
        phone2:"",
        socmed_link:"",
        status: status[0].value,
        descriptions:""
    });

    const handleChange = (e) => {
        setContact((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleOnclickSave = async e => {
        e.preventDefault()
        console.log('Contact data being sent:', contact); // logging passed
        try {
            if (!username) {
                alert("Tolong masuk terlebih dahulu!");
                navigate('/login');
                return
            }
            await axios.post(`http://localhost:2999/${username}/data/contacts`, contact);
            navigate(`/${username}`);
        } catch (err) {
            console.log(err);
            console.error(err.response.data);
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
                <TextField onChange={handleChange} name="person" id="outlined-person" label="Nama Customer"/>
                <TextField onChange={handleChange} name="person_address" id="outlined-person-address" label="Alamat"/>
                <TextField onChange={handleChange} name="institution" id="outlined-institution" label="Nama Institusi"/>
                <TextField onChange={handleChange} name="position" id="outlined-position" label="Jabatan"/>
                <TextField onChange={handleChange} name="institution_address" id="outlined-institution-address" label="Alamat Institusi"/>
                <TextField onChange={handleChange} name="email_address" id="outlined-email" label="Email" type="email" />
                <TextField onChange={handleChange} name="email_address2" id="outlined-email2" label="Email 2" type="email" />
                <TextField onChange={handleChange} name="sales_name" id="outlined-sales-name" label="Nama Sales" hidden value={username}/>
                <TextField onChange={handleChange} name="phone" id="outlined-phone"
                label="Telepon"
                defaultValue="08"
                helperText="Nomor Telepon Whatsapp"
                />
                <TextField onChange={handleChange} name="phone2" id="outlined-phone2"
                label="Telepon 2"
                defaultValue="08"
                helperText="Nomor Telepon Alternatif"
                />
                <TextField onChange={handleChange} name="socmed_link" id="outlined-socmed" label="Link Media Sosial" type="text" />
                <TextField name="status" id="outlined-status"
                    select
                    label="Status Kontak"
                    value={contact.status}
                    onChange={handleChange}
                    // defaultValue="Masuk"
                    inputProps={{ "data-testid": "status-input" }}
                    helperText="Pilih Status"
                    >
                    {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField name="descriptions" id="outlined-descriptions" onChange={handleChange} label="Deskripsi" multiline rows={4} />
                <Box display={"flex"}>
                    <Button onClick={handleOnclickSave} sx={{ width:'30%', mr:'1rem' }} variant="outlined">Simpan</Button>
                    <Button component={Link} to={`/${username}`}  sx={{ width:'30%', ml:'1rem' }} variant="outlined">Batal</Button>
                </Box>
            </div>
        </Box>
        </Container>
        
    )
}

export default AddContact