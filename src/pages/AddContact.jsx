import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';


const AddContact = () => {
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)
    const contact_status = [
        {
            value:'new',
            label:'Baru'
        },
        {
            value:'lead',
            label:'Lead'
        },
        {
            value:'opportunity',
            label:'Opportunity'
        },
        {
            value:'project',
            label:'Project'
        },
        {
            value:'idle',
            label:'Idle'
        },
        {
            value:'done',
            label:'Successful'
        }
    ];
    
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        contact_name:"",
        contact_address:"",
        contact_institution:"",
        contact_position:"",
        contact_institution_address:"",
        contact_email:"",
        contact_email2:"",
        sales_name:`${username}`,
        contact_phone:"",
        contact_phone2:"",
        contact_socmed_link:"",
        contact_status: contact_status[0].value,
        description:""
    });

    const handleChange = (e) => {
        setContact((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleOnclickSave = async e => {
        e.preventDefault()
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
                <TextField onChange={handleChange} name="contact_name" id="outlined-contact-name" label="Nama Customer"/>
                <TextField onChange={handleChange} name="contact_address" id="outlined-contact-address" label="Alamat"/>
                <TextField onChange={handleChange} name="contact_institution" id="outlined-contact-institution" label="Nama Institusi"/>
                <TextField onChange={handleChange} name="contact_position" id="outlined-contact-position" label="Jabatan"/>
                <TextField onChange={handleChange} name="contact_institution_address" id="outlined-contact-institution-address" label="Alamat Institusi"/>
                <TextField onChange={handleChange} name="contact_email" id="outlined-contact-email" label="Email" type="email" />
                <TextField onChange={handleChange} name="contact_email2" id="outlined-contact-email2" label="Email 2" type="email" />
                <TextField onChange={handleChange} name="sales_name" id="outlined-sales-name" label="Nama Sales" hidden value={username}/>
                <TextField onChange={handleChange} name="contact_phone" id="outlined-contact-phone"
                label="Telepon"
                defaultValue="08"
                helperText="Nomor Telepon Whatsapp"
                />
                <TextField onChange={handleChange} name="contact_phone2" id="outlined-contact-phone2"
                label="Telepon 2"
                defaultValue="08"
                helperText="Nomor Telepon Alternatif"
                />
                <TextField onChange={handleChange} name="contact_socmed_link" id="outlined-contact-socmed" label="Link Media Sosial" type="text" />
                <TextField name="contact_status" id="outlined-contact-status"
                    select
                    label="Status Kontak"
                    value={contact.contact_status}
                    onChange={handleChange}
                    // defaultValue="Masuk"
                    inputProps={{ "data-testid": "status-input" }}
                    helperText="Pilih Status"
                    >
                    {contact_status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField name="description" id="outlined-description" onChange={handleChange} label="Deskripsi" multiline rows={4} />
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