import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../styles/formCustom.css';
import axiosInstance from "../axiosConfig";
import Alert from "@mui/material/Alert";

const UpdateContact = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const username = localStorage.getItem('username');
    const { contactId } = useParams();

    const [contact, setContact] = useState({
        contact_name:"",
        contact_address:"",
        contact_institution:"",
        contact_position:"",
        contact_institution_address:"",
        contact_email:"",
        contact_email2:"",
        contact_phone:"",
        contact_phone2:"",
        contact_socmed_link:"",
        contact_status: "new",
        description:""
    });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axiosInstance.get(`/${username}/data/contacts/${contactId}`);
                if (res.data.length > 0) {
                    setContact(res.data[0]); // Ambil elemen pertama dari array
                } else {
                    // Jika kontak tidak ditemukan
                    console.error("Contact not found");
                    // Jika kontak belum memiliki sales
                    callAlertUnsalesed();
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchContact();
    }, [contactId, username]);
    
    const contact_status = [
        { value:'new', label:'Baru' },
        { value:'lead', label:'Lead' },
        { value:'opportunity', label:'Opportunity' },
        { value:'project', label:'Project' },
        { value:'idle', label:'Idle' },
        { value:'done', label:'Done' }
    ];

    const callAlertUnsalesed = () => {
        <Alert severity="warning">Kontak ini belum memiliki sales.</Alert>
    }

    const handleChange = (e) => {
        setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnclickSave = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`http://localhost:2999/${username}/data/contacts/${contactId}`, contact);
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
                autoComplete="off"
            >
                <Typography sx={{ display:'flex', justifyContent:'center', mb:'2rem' }} variant="h5">
                    Update Kontak
                </Typography>
                { contact.contact_name ? (
                <div>
                    <TextField
                        onChange={handleChange}
                        name="contact_name"
                        label="Nama Customer"
                        value={contact.contact_name}
                        autoComplete="off"
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_address"
                        label="Alamat"
                        type="text"
                        value={contact.contact_address}
                        autoComplete="off"
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_institution"
                        label="Nama Institusi"
                        type="text"
                        value={contact.contact_institution}
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_position"
                        label="Jabatan"
                        value={contact.contact_position}
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_institution_address"
                        label="Alamat Institusi"
                        type="text"
                        value={contact.contact_institution_address}
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_email"
                        label="Email"
                        type="email"
                        value={contact.contact_email}
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_email2"
                        label="Email 2"
                        type="email"
                        value={contact.contact_email2}
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_phone"
                        label="Telepon"
                        value={contact.contact_phone}
                        helperText="Nomor Telepon Whatsapp"
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_phone2"
                        label="Telepon 2"
                        value={contact.contact_phone2}
                        helperText="Nomor Telepon Alternatif"
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_socmed_link"
                        label="Link Media Sosial"
                        type="text"
                        value={contact.contact_socmed_link}
                    />
                    <TextField
                        onChange={handleChange}
                        name="contact_status"
                        select
                        label={"Status"}
                        value={contact.contact_status}
                        helperText="Pilih Status"
                    >
                        {contact_status.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        onChange={handleChange}
                        name="descriptions"
                        label="Deskripsi"
                        type="text"
                        multiline
                        value={contact.description}
                        rows={4}
                    />
                    <Box display={"flex"}>
                        <Button onClick={handleOnclickSave} sx={{ width:'30%', mr:'1rem' }} variant="outlined">
                            Simpan
                        </Button>
                        <Button component={Link} to={`/${username}`} sx={{ width:'30%', ml:'1rem' }} variant="outlined">
                            Batal
                        </Button>
                    </Box>
                </div>
                ) : (
                    <Typography variant="h6" textAlign={"center"}>--- Loading Data ---</Typography>
                )}
                
            </Box>
        </Container>
    );
};

export default UpdateContact;
