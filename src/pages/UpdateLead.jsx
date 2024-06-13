import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';

const leadStatus = [
    {value:'baru', label:'Baru'},
    {value:'mencoba menghubungi', label:'Mencoba Menghubungi'},
    {value:'dihubungi', label:'Dihubungi'},
    {value:'sukses', label:'Sukses'},
    {value:'diskualifikasi', label:'Diskualifikasi'},
];

const unqualificationReason = [
    {value:'', label:''},
    {value:'tidak responsif', label:'Tidak Responsif'},
    {value:'budget prospek kurang', label:'Budget Prospek Kurang'},
    {value:'produk tidak tepat', label:'Produk Tidak Tepat'},
    {value:'persaingan kompetitor', label:'Persaingan Kompetitor'},
    {value:'timing buruk', label:'Timing Buruk'},
]

const interactionLevel = [
    {value:1, label:'1'},
    {value:2, label:'2'},
    {value:3, label:'3'},
    {value:4, label:'4'},
    {value:5, label:'5'},
]

const source = [
    {value:'email', label:'Email'},
    {value:'referal', label:'Referal'},
    {value:'ad', label:'Iklan'},
    {value:'search engine', label:'Mesin Pencari'},
    {value:'social media', label:'Media Sosial'},
    {value:'network', label:'Jaringan'},
]

const converted = [
    {value:1, label:'Ya'},
    {value:0, label:'Tidak'},
]

const UpdateLead = () => {

    const username = localStorage.getItem('username');
    const [lead, setLead] = useState({
        lead_title:"",
        sales_name:"",
        person:"",
        institution:"",
        descriptions:"",
        trade_value:null,
        lead_status: leadStatus[0].value,
        response_time:null,
        interaction_level: interactionLevel[0].value,
        source: source[0].value,
        converted: converted[0].value,
        unqualified_reason: unqualificationReason[0].value,
        notes:"",
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        setLead((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    console.log(lead);
    const handleOnclickSave = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:2999/${username}/data/leads`, lead);
            navigate(`/${username}`);    
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
                <TextField onChange={handleChange} name="lead_title" id="outlined-lead-title" label="Judul Lead"/>
                
                <TextField onChange={handleChange} name="sales_name" id="outlined-sales-name" label="Nama Sales"/>
                
                <TextField onChange={handleChange} name="person" id="outlined-person" label="Nama Customer"/>
                
                <TextField onChange={handleChange} name="institution" id="outlined-institution" label="Nama Institusi"/>
                
                <TextField onChange={handleChange} name="descriptions" id="outlined-multiline-static" label="Keterangan"
                multiline
                rows={3}
                type="text"/>

                <TextField onChange={handleChange} name="trade_value" id="outlined-trade-value" label="Nilai Penjualan" type="number" />
                
                <TextField name="lead_status" id="outlined-lead-status" select
                    label="Status Lead"
                    defaultValue="baru">
                    {leadStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField onChange={handleChange} name="response_time" helperText="*Berdasarkan Jam" type="number" id="outlined-response-time" label="Waktu Respon"/>
                
                <TextField name="interaction_level" id="outlined-interaction-level" select
                    label="Level Interaksi"
                    defaultValue="1">
                    {interactionLevel.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField name="source" id="outlined-source" select
                    label="Sumber"
                    defaultValue="email">
                    {source.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField name="converted" id="outlined-converted" select
                    label="Dikonversi?"
                    defaultValue='0'>
                    {converted.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField name="unqualified_reason" id="outlined-unqualified-reason" select label="Alasan Diskualifikasi"
                    defaultValue=""
                    helperText="Mengapa Diskualifikasi?">
                    {unqualificationReason.map((option) => (
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