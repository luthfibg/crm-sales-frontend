import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/formCustom.css';

const leadStatus = [
    { value: 'baru', label: 'Baru' },
    { value: 'mencoba menghubungi', label: 'Mencoba Menghubungi' },
    { value: 'dihubungi', label: 'Dihubungi' },
    { value: 'sukses', label: 'Sukses' },
    { value: 'diskualifikasi', label: 'Diskualifikasi' },
];

const interactionLevel = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
];

const source = [
    { value: 'email', label: 'Email' },
    { value: 'referal', label: 'Referal' },
    { value: 'ad', label: 'Iklan' },
    { value: 'search engine', label: 'Mesin Pencari' },
    { value: 'social media', label: 'Media Sosial' },
    { value: 'network', label: 'Jaringan' },
];

const converted = [
    { value: 1, label: 'Ya' },
    { value: 0, label: 'Tidak' },
];

const unqualifiedReason = [
    { value: '', label: '' },
    { value: 'tidak responsif', label: 'Tidak Responsif' },
    { value: 'budget prospek kurang', label: 'Budget Prospek Kurang' },
    { value: 'produk tidak tepat', label: 'Produk Tidak Tepat' },
    { value: 'persaingan kompetitor', label: 'Persaingan Kompetitor' },
    { value: 'timing buruk', label: 'Timing Buruk' },
];

const AddLead = () => {
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)

    const [contact, setContact] = useState([]);
    const [product, setProduct] = useState([]);
    const [lead, setLead] = useState({
        lead_title: "",
        sales_name: `${username}`,
        person: "",
        institution: 'PT. JSRS',
        descriptions: "",
        product_type: "",
        product_image_1: "",
        trade_value: null,
        lead_status: leadStatus[0].value,
        response_time: null,
        interaction_level: interactionLevel[0].value,
        source: source[0].value,
        converted: converted[0].value,
        unqualified_reason: unqualifiedReason[0].value,
        notes: "",
    });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get(`http://localhost:2999/${username}/data/contacts`);
                setContact(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:2999/data/products_sale`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchContacts();
        fetchProducts();
    }, [username]);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLead((prev) => ({ ...prev, [e.target.name]: e.target.value }));

        if (name === 'person') {
            const selectedContact = contact.find(contact => contact.person === value);
            if (selectedContact) {
                setLead((prev) => ({ ...prev, institution: selectedContact.institution }));
            }
        }
    }

    const handleOnclickSave = async e => {
        e.preventDefault();
        console.log(lead)
        try {
            await axios.post(`http://localhost:2999/${username}/data/leads`, lead);
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
                <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }} variant="h5">Daftarkan Lead Baru</Typography>
                <div>
                    {/* input 1 */}
                    <TextField onChange={handleChange} name="lead_title" id="outlined-lead-title" label="Judul Lead" />

                    {/* input 2 */}
                    <TextField onChange={handleChange} name="sales_name" id="outlined-sales-name" label="Nama Sales" hidden disabled value={username} sx={{ display: 'none' }} />

                    {/* input 3 */}
                    <TextField name="person" id="outlined-person" select onChange={handleChange} label="Nama Customer"
                        value={lead.person}>
                        {contact.map((contact) => (
                            <MenuItem key={`${contact.person}-${keyId++}`} value={contact.person}>
                                {contact.person}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* input 4 */}
                    <TextField name="institution" id="outlined-select-institution" label="Nama Institusi" value={lead.institution}
                        onChange={handleChange}
                        helperText="Nama Institusi akan otomatis terisi"
                        disabled />

                    {/* input 5 */}
                    <TextField name="descriptions" id="outlined-multiline-static" onChange={handleChange} label="Keterangan"
                        multiline
                        rows={1}
                        type="text" />

                    {/* input 6 */}
                    <TextField name="product_type" id="outlined-select-product-type" select value={lead.lead_status}
                        onChange={handleChange} label="Status Lead" defaultValue="baru"
                        helperText="*Status Lead Saat Ini">
                        {leadStatus.map((option) => (
                            <MenuItem key={`${option.value}-${keyId++}`} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* input 6 */}
                    <TextField onChange={handleChange} name="trade_value" id="outlined-trade-value" label="Nilai Penjualan" type="number" />

                    {/* input 7 */}
                    <TextField name="lead_status" id="outlined-select-lead-status" select value={lead.lead_status}
                        onChange={handleChange} label="Status Lead" defaultValue="baru"
                        helperText="*Status Lead Saat Ini">
                        {leadStatus.map((option) => (
                            <MenuItem key={`${option.value}-${keyId++}`} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* input 8 */}
                    <TextField onChange={handleChange} name="response_time" id="outlined-response-time" label="Waktu Respon" type="number"
                        helperText="*Berdasarkan Jam" />

                    {/* input 9 */}
                    <TextField name="interaction_level" id="outlined-interaction-level" select value={lead.interaction_level}
                        onChange={handleChange} label="Level Interaksi" defaultValue="1"
                        helperText="*Perkiraan Sesuai Pengalaman">
                        {interactionLevel.map((option) => (
                            <MenuItem key={`${option.value}-${keyId++}`} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* input 9 */}
                    <TextField name="source" id="outlined-source" select value={lead.source}
                        onChange={handleChange} label="Sumber Prospek" defaultValue="email">
                        {source.map((option) => (
                            <MenuItem key={`${option.value}-${keyId++}`} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* input 10 */}
                    <TextField name="converted" id="outlined-converted" select value={lead.converted}
                        onChange={handleChange} label="Dikonversi?" defaultValue="0">
                        {converted.map((option) => (
                            <MenuItem key={`${option.value}-${keyId++}`} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* input 11 */}
                    <TextField name="unqualified_reason" id="outlined-select-unqualified-reason"
                        select
                        value={lead.unqualified_reason}
                        onChange={handleChange}
                        label="Alasan Diskualifikasi"
                        defaultValue=""
                        helperText="Mengapa Lead Ini Diskualifikasi?">
                        {unqualifiedReason.map((option) => (
                            <MenuItem key={`${option.value}-${keyId++}`} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* input 9 */}
                    <TextField onChange={handleChange} name="notes" id="outlined-notes"
                        label="Catatan"
                        multiline
                        rows={1} />

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

export default AddLead
