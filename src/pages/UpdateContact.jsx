import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';


const UpdateContact = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const contactId = location.pathname.split('/')[2];
    console.log(contactId);

    const [contacts, setContacts] = useState({
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
        status: "Masuk" | "Follow Up" | "Menganggur" | "Gagal" | "Deal",
        descriptions:""
    });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get(`http://localhost:2999/data/contacts/${contactId}`);
                setContacts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContact();
    }, [contactId]);

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
        status: 'Masuk' | 'Follow Up' | 'Menganggur' | 'Gagal' | 'Deal',
        descriptions:""
    });

    const handleChange = (e) => {
        setContact((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleOnclickSave = async e => {
        e.preventDefault()
        console.log('Contact data being sent:', contact); // logging passed
        try {
            await axios.put(`http://localhost:2999/data/contacts/${contactId}`, contact)
            navigate('/');
        } catch (err) {
            console.log(err);
            console.error(err.response.data)
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
            <Typography sx={{ display:'flex', justifyContent:'center', mb:'2rem' }} variant="h5">Update Kontak</Typography>
            <div>
                <TextField onChange={handleChange} name="person"
                id="outlined-person"
                label="Nama Customer"
                defaultValue={contacts.person}
                autoComplete="off"
                />
                <TextField onChange={handleChange} name="person_address"
                id="outlined-person-address"
                label="Alamat"
                type="text"
                defaultValue={contacts.person_address}
                autoComplete="off"
                />
                <TextField onChange={handleChange} name="institution"
                id="outlined-institution"
                label="Nama Institusi"
                type="text"
                defaultValue={contacts.institution}
                />
                <TextField onChange={handleChange} name="position"
                id="outlined-position"
                label="Jabatan"
                defaultValue={contacts.position}
                />
                <TextField onChange={handleChange} name="institution_address"
                id="outlined-institution-address"
                label="Alamat Institusi"
                type="text"
                defaultValue={contacts.institution_address}
                />
                <TextField onChange={handleChange} name="email_address" id="outlined-email" defaultValue={contacts.email_address} label="Email" type="email" />
                <TextField onChange={handleChange} name="email_address2" id="outlined-email2" defaultValue={contacts.email_address2} label="Email 2" type="email" />
                <TextField onChange={handleChange} name="phone"
                id="outlined-phone"
                label="Telepon"
                defaultValue={contacts.phone}
                helperText="Nomor Telepon Whatsapp"
                />
                <TextField onChange={handleChange} name="phone2"
                id="outlined-phone2"
                label="Telepon 2"
                defaultValue={contacts.phone2}
                helperText="Nomor Telepon Alternatif"
                />
                <TextField onChange={handleChange} defaultValue={contacts.socmed_link} name="socmed_link" id="outlined-socmed" label="Link Media Sosial" type="text" />
                <TextField
                    id="outlined-select-status"
                    select
                    label="Status"
                    name="status"
                    defaultValue=""
                    inputProps={{ "data-testid": "status-input" }}
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
                defaultValue={contacts.descriptions}
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

export default UpdateContact