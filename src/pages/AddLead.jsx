import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';

const leadStage = [
    { value:'Baru', label:'Baru'},
    {
        value:'Bekerja',
        label:'Bekerja'
    },
    {
        value:'Pemeliharaan',
        label:'Pemeliharaan'
    },
    {
        value:'Dikonversi',
        label:'Dikonversi'
    },
];

const leadStatus = [
    {
        value:'Unqualified',
        label:'Unqualified'
    },
    {
        value:'Qualified',
        label:'Qualified'
    },
    {
        value:'Deleted',
        label:'Deleted'
    },
];

const AddLead = () => {

    const [contact, setContact] = useState([]);
    const [lead, setLead] = useState({
        invoice_date:"",
        lead_title:"",
        sales_name:"",
        person:"",
        institution:'PT. JSRS',
        descriptions:"",
        trade_value:null,
        lead_stage: leadStage[0].value,
        lead_status: leadStatus[0].value,
        notes:"",
        deal_date:"",
    });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get('http://localhost:2999/data/contacts');
                setContact(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchContacts();
    }, []);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLead((prev) => ({...prev, [e.target.name]: e.target.value}));

        if (name === 'person') {
            const selectedContact = contact.find(contact => contact.person === value);
            if (selectedContact) {
                setLead((prev) => ({ ...prev, institution: selectedContact.institution }));
            }
        }
    }

    const handleOnclickSave = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:2999/data/leads', lead);
            navigate('/');    
        } catch (err) {
            console.log(err);
        }
    }

    return(
     <Container maxWidth='md' sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', paddingX:'5rem' }}>
            <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '27ch' }
        }}
        noValidate
        autoComplete="off">
            <Typography sx={{ display:'flex', justifyContent:'center', mb:'2rem' }} variant="h5">Daftarkan Lead Baru</Typography>
            <div>
                <TextField onChange={handleChange} name="invoice_date"
                id="outlined-invoice-date"
                type="date"
                label="Invoice"
                InputLabelProps={{ shrink: true }}
                />
                <TextField onChange={handleChange} name="lead_title"
                id="outlined-lead-title"
                label="Judul Lead"
                type="text"
                />
                <TextField onChange={handleChange} name="sales_name"
                id="outlined-sales-name"
                label="Nama Sales"
                type="text"
                />
                <TextField
                select
                onChange={handleChange}
                name="person"
                id="outlined-person"
                label="Nama Customer"
                value={lead.person}
            >
                {contact.map((contact) => (
                    <MenuItem key={contact.id} value={contact.person}>
                        {contact.person}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                id="outlined-select-institution"
                label="Nama Institusi"
                name="institution"
                value={lead.institution}
                onChange={handleChange}
                helperText="Nama Institusi akan otomatis terisi"
                disabled
                />
                <TextField onChange={handleChange} name="descriptions"
                id="outlined-multiline-static"
                label="Keterangan"
                multiline
                rows={3}
                type="text"
                />
                <TextField onChange={handleChange} name="trade_value" id="outlined-trade-value" label="Nilai Penjualan" type="number" />
                <TextField
                    id="outlined-select-lead-stage"
                    select
                    value={lead.lead_stage}
                    onChange={handleChange}
                    label="Tahap Lead"
                    defaultValue="Baru"
                    helperText="Pilih Tahap Lead"
                    name="lead_stage"
                    >
                    {leadStage.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-lead-status"
                    select
                    value={lead.lead_status}
                    onChange={handleChange}
                    label="Status Lead"
                    defaultValue="Unqualified"
                    helperText="Pilih Status Lead"
                    name="lead_status"
                    >
                    {leadStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField onChange={handleChange} name="notes"
                id="outlined-notes"
                label="Catatan"
                multiline
                rows={3} />
                <TextField onChange={handleChange} name="deal_date" InputLabelProps={{ shrink: true }} id="outlined-deal-date" label="Tanggal Deal" type="date" />
                <Box sx={{ display:'flex', paddingX:'2rem' }}>
                <Button onClick={handleOnclickSave} sx={{ width:'50%', mr:'1rem' }} variant="outlined">Simpan</Button>
                <Button sx={{ width:'50%', ml:'1rem' }} variant="outlined" component={Link} to="/">Batal</Button>
                </Box>
            </div>
        </Box>
    </Container>
    )
}

export default AddLead