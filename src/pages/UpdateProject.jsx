import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../styles/formCustom.css';

const projectStatus = [
    { value: 'in progress', label: 'In Progress' },
    { value: 'success', label: 'Successful' },
]

const UpdateProject = () => {
    const username = localStorage.getItem('username'); // get username from localstorage (user login session)
    const [contact, setContact] = useState([]);
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [project, setProject] = useState({
        opportunity_id: null,
        project_name: "",
        project_customer: "",
        project_institution: 'PT. JSRS',
        project_revenue: null,
        sales_rep: `${username}`,
        start_date: Date.now(),
        end_date: null,
        project_status: projectStatus[0].value,
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`http://localhost:2999/${username}/data/projects/${projectId}`);
                if (res.data.length > 0) {
                    setProject(res.data[0]); // Ambil elemen pertama dari array
                } else {
                    console.error("Project not found");
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchProject();
    }, [username, projectId]); // Dependency array

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));

        if (name === 'project_customer') {
            const selectedContact = contact.find(contact => contact.contact_name === value);
            if (selectedContact) {
                setProject((prev) => ({
                     ...prev,
                     project_customer: selectedContact.contact_name,
                     project_institution: selectedContact.contact_institution
                }));
            }
        }
    }

    const handleOnclickSave = async e => {
        e.preventDefault();
        console.log(project)
        try {
            await axios.put(`http://localhost:2999/${username}/data/project-manual-update/${projectId}`, project);
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
                <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }} variant="h5">Update Project</Typography>
                <div>

                    {/* input 1 */}
                    <TextField onChange={handleChange}
                        name="opportunity_id" id="outlined-opportunity-id"
                        label="ID Opportunity" disabled
                        sx={{ display: 'none' }}
                        type="number" hidden
                        value={project.opportunity_id}  />

                    {/* input 2 */}
                    <TextField onChange={handleChange}
                        name="project_name"
                        id="outlined-project-name"
                        label="Judul Proyek" type="text"
                        value={project.project_name} />

                    {/* input 3 */}
                    <TextField name="project_customer" id="outlined-select-project-customer" label="Nama Pelanggan" value={project.project_customer}
                        onChange={handleChange}
                        helperText="Nama Pelanggan Tidak Dapat Diubah"
                        disabled />

                    {/* input 4 */}
                    <TextField name="project_institution" id="outlined-select-project-institution" label="Nama Institusi" value={project.project_institution}
                        onChange={handleChange}
                        helperText="Nama Institusi tidak dapat diubah"
                        disabled />

                    {/* input 5 */}
                    <TextField onChange={handleChange}
                        name="project_revenue" id="outlined-project-revenue"
                        label="" type="number"
                        value={project.project_revenue} />

                    {/* input 6 */}
                    <TextField onChange={handleChange}
                        name="sales_rep"
                        id="outlined-sales-rep"
                        label="Nama Sales" disabled
                        sx={{ display: 'none' }}
                        type="number" hidden
                        value={project.sales_rep}  />

                    {/* input 7 */}
                    <TextField
                        onChange={handleChange}
                        name="start_date"
                        id="outlined-start-date"
                        label="Start Date"
                        type="date"
                        value={project.start_date}
                        InputLabelProps={{
                            shrink: true, // Memaksa label tetap muncul meskipun tipe "date"
                        }}
                    />


                    {/* input 8 */}
                    <TextField onChange={handleChange}
                        name="end_date" id="outlined-end-date"
                        label="End Date" type="date"
                        value={project.end_date}
                        InputLabelProps={{ 
                            shrink: true, // Memaksa label tetap muncul meskipun tipe "date"
                         }} />

                    {/* input 9 */}
                    <TextField name="project_status" id="outlined-select-project-status" select value={project.project_status}
                        onChange={handleChange} label="Status Project" defaultValue="in progress"
                        helperText="*Status Project Saat Ini">
                        {projectStatus.map((option) => (
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

export default UpdateProject