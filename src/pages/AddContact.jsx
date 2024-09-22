import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';
import axiosInstance from "../axiosConfig";

const AddContact = () => {
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)

    const contact_status = [
        { value: 'new', label: 'Baru' },
        { value: 'lead', label: 'Lead' },
        { value: 'opportunity', label: 'Opportunity' },
        { value: 'project', label: 'Project' },
        { value: 'idle', label: 'Idle' },
        { value: 'done', label: 'Successful' }
    ];

    const activities_desc = [
        { value: 'add contact manually' },
        { value: 'add lead manually' },
        { value: 'add product' },
        // Add more activity descriptions here...
    ];

    const navigate = useNavigate();
    const [contact, setContact] = useState({
        contact_name: "",
        contact_address: "",
        contact_institution: "",
        contact_position: "",
        contact_institution_address: "",
        contact_email: "",
        contact_email2: "",
        sales_name: `${username}`,
        contact_phone: "",
        contact_phone2: "",
        contact_socmed_link: "",
        contact_status: contact_status[0].value,
        description: ""
    });

    const [activities, setActivities] = useState({
        sales_name: `${username}`,
        activity_describe: activities_desc[0].value
    });

    // Separate handleChange for contact
    const handleContactChange = (e) => {
        setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Separate handleChange for activities
    const handleActivitiesChange = (e) => {
        setActivities((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnclickSave = async (e) => {
        e.preventDefault();
        try {
            if (!username) {
                alert("Tolong masuk terlebih dahulu!");
                navigate('/login');
                return;
            }
            // Send contact data to backend
            await axiosInstance.post(`https://localhost:2999/${username}/data/contacts`, contact);
            // Send activities data to backend
            await axiosInstance.post(`http://localhost:2999/${username}/data/activities`, activities);
            navigate(`/${username}`);
        } catch (err) {
            console.log(err);
            console.error(err.response.data);
        }
    };

    return (
        <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '31ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }} variant="h5">Daftarkan Kontak Baru</Typography>
                <div>
                    <TextField onChange={handleContactChange} name="contact_name" id="outlined-contact-name" label="Nama Customer" />
                    <TextField onChange={handleContactChange} name="contact_address" id="outlined-contact-address" label="Alamat" />
                    <TextField onChange={handleContactChange} name="contact_institution" id="outlined-contact-institution" label="Nama Institusi" />
                    <TextField onChange={handleContactChange} name="contact_position" id="outlined-contact-position" label="Jabatan" />
                    <TextField onChange={handleContactChange} name="contact_institution_address" id="outlined-contact-institution-address" label="Alamat Institusi" />
                    <TextField onChange={handleContactChange} name="contact_email" id="outlined-contact-email" label="Email" type="email" />
                    <TextField onChange={handleContactChange} name="contact_email2" id="outlined-contact-email2" label="Email 2" type="email" />
                    <TextField onChange={handleContactChange} name="contact_phone" id="outlined-contact-phone" label="Telepon" defaultValue="08" helperText="Nomor Telepon Whatsapp" />
                    <TextField onChange={handleContactChange} name="contact_phone2" id="outlined-contact-phone2" label="Telepon 2" defaultValue="08" helperText="Nomor Telepon Alternatif" />
                    <TextField onChange={handleContactChange} name="contact_socmed_link" id="outlined-contact-socmed" label="Link Media Sosial" type="text" />
                    <TextField name="contact_status" id="outlined-contact-status" select label="Status Kontak" value={contact.contact_status} onChange={handleContactChange} helperText="Pilih Status">
                        {contact_status.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField name="description" id="outlined-description" onChange={handleContactChange} label="Deskripsi" multiline rows={4} />
                    <Box display={"flex"}>
                        <Button onClick={handleOnclickSave} sx={{ width: '30%', mr: '1rem' }} variant="outlined">Simpan</Button>
                        <Button component={Link} to={`/${username}`} sx={{ width: '30%', ml: '1rem' }} variant="outlined">Batal</Button>
                    </Box>
                </div>
            </Box>
        </Container>
    );
}

export default AddContact;
