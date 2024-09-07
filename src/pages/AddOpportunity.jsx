import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';

const opportunityStatus = [
    { value: 'open', label: 'Open' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'closed won', label: 'Closed Won' },
    { value: 'closed lost', label: 'Closed Lost' },
]

const AddOpportunity = () => {
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)
    const [contact, setContact] = useState([]);
    const [personName, setPersonName] = useState("");
    const [opportunity, setOpportunity] = useState({
        opportunity_current: "active",
        lead_id: null,
        opportunity_title: "",
        sales_rep: `${username}`,
        contact_name: "",
        contact_institution: 'PT. JSRS',
        value: null,
        opportunity_status: opportunityStatus[0].value,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get(`http://localhost:2999/${username}/data/contacts`);
                setContact(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchContacts();
         // Ambil data kontak dari localStorage
         const savedPerson = JSON.parse(localStorage.getItem('selectedPerson'));

         if (savedPerson) {
             setPersonName(savedPerson.contact_name);
             setOpportunity((prev) => ({
                 ...prev,
                 contact_name: savedPerson.contact_name,
                 contact_institution: savedPerson.contact_institution,
             }));
             localStorage.removeItem('selectedPerson');
         }
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOpportunity((prev) => ({ ...prev, [e.target.name]: e.target.value }));

        if (name === 'contact_name') {
            const selectedContact = contact.find(contact => contact.contact_name === value);
            if (selectedContact) {
                setOpportunity((prev) => ({ ...prev, contact_institution: selectedContact.contact_institution }));
            }
        }
    }

    const handleOnclickSave = async e => {
        e.preventDefault();
        console.log(opportunity)
        try {
            await axios.post(`http://localhost:2999/${username}/data/opportunities`, opportunity);
            navigate(`/${username}`);
        } catch (err) {
            console.log(err);
        }
    }
    let keyId = 0;

    return (
        <Container maxWidth='md' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', paddingX: '5rem' }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '27ch' }
                }}
                noValidate
                autoComplete="off">
                <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }} variant="h5">Daftarkan Opportunity Baru</Typography>
                <div>

                    {/* input 1 */}
                    <TextField onChange={handleChange}
                        name="lead_id" id="outlined-lead-id"
                        label="ID Lead" disabled
                        sx={{ display: 'none' }}
                        type="number" hidden
                        value={2}  />

                    {/* input 2 */}
                    <TextField onChange={handleChange}
                        name="opportunity_title"
                        id="outlined-opportunity-title"
                        label="Judul Opportunity" type="text"/>

                    {/* input 3 */}
                    <TextField onChange={handleChange}
                        name="sales_rep"
                        id="outlined-sales-rep"
                        label="Nama Sales" disabled
                        sx={{ display: 'none' }}
                        type="number" hidden
                        value={username}  />

                    {/* input 4 */}
                    <TextField name="contact_name" id="outlined-select-contact-name" select value={opportunity.contact_name}
                        onChange={handleChange} label="Nama Pelanggan" defaultValue="">
                        {contact.map((option) => (
                            <MenuItem key={`${option.value}-${keyId++}`} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField name="contact_institution" id="outlined-select-contact-institution" label="Nama Institusi" value={opportunity.contact_institution}
                        onChange={handleChange}
                        helperText="Nama Institusi akan otomatis terisi"
                        disabled />

                    <TextField onChange={handleChange}
                        name="value" id="outlined-value"
                        label="Nilai Peluang" type="number" />

                    <TextField name="opportunity_status" id="outlined-select-opportunity-status" select value={opportunity.opportunity_status}
                        onChange={handleChange} label="Status Lead" defaultValue="open"
                        helperText="*Status Opportunity Saat Ini">
                        {opportunityStatus.map((option) => (
                            <MenuItem key={`${option.value}-${keyId++}`} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* input button */}
                    <Box sx={{ display: 'flex', paddingX: '2rem' }}>
                        <Button onClick={handleOnclickSave} sx={{ width: '50%', mr: '1rem' }} variant="outlined">Simpan</Button>
                        <Button sx={{ width: '50%', ml: '1rem' }} variant="outlined" component={Link} to={`/${username}`}>Batal</Button>
                    </Box>
                </div>
            </Box>
        </Container>
    )

}

export default AddOpportunity