import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';

const leadStage = [
    {
        value:'Baru',
        label:'Baru'
    },
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

const UpdateLead = () => {

    const [lead, setLead] = useState({
        invoice_date:"",
        lead_title:"",
        sales_name:"",
        person:"",
        institution:"",
        descriptions:"",
        trade_value:null,
        lead_stage:"",
        lead_status:"",
        notes:"",
        deal_date:"",
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        setLead((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    console.log(lead);
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
                <TextField onChange={handleChange} name="person"
                id="outlined-person"
                label="Nama Customer"
                />
                <TextField onChange={handleChange} name="institution"
                id="outlined-institution"
                label="Nama Institusi"
                type="text"
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

export default UpdateLead