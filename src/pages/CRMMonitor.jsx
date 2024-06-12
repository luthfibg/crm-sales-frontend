import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import darkTheme from "../styles/darkTheme";
import LiveDataTotalContacts from "../components/LiveDataTotalContacts";

function CRMMonitor() {

    return (
        <>
        <Box sx={{ width:'100%', height:'3rem', display: 'flex', justifyContent: 'start', alignItems: 'center', bgcolor: darkTheme.palette.background.paper2 }}>
            <Typography sx={{ marginLeft:'1rem', fontSize:'1.1rem', color: darkTheme.palette.text.disabled }}>CRMas Monitor</Typography>
        </Box>
        <Grid container height={'calc(100vh - 3rem)'} spacing={0} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }} p={1}>
            <Grid item xs={4} sm={8} md={12} lg={16} xl={20} height={'50%'}>
                <Grid container spacing={0.5} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }} height={'100%'}>

                    {/* column 1 */}
                    <Grid item xs={4} sm={8} md={3} lg={3} xl={4} sx={{ p: '0px' }}>
                        <Grid container columns={{ xs: 4, sm: 8, md: 3, lg: 3, xl: 4 }} height={'100%'}>
                            <Grid item xs={4} sm={8} md={3} lg={3} xl={4}>
                                <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography>Live Data 1</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} sm={8} md={3} lg={3} xl={4} mt={0.5}>
                                <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography>Live Data 2</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* column 2 */}
                    <Grid item xs={4} sm={8} md={3} lg={5} xl={6}>
                        <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <LiveDataTotalContacts/>
                        </Paper>
                    </Grid>

                    {/* column 3 */}
                    <Grid item xs={4} sm={8} md={3} lg={5} xl={6}>
                        <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Typography>Live Data 4</Typography>
                        </Paper>
                    </Grid>

                    {/* column 4 */}
                    <Grid item xs={4} sm={8} md={3} lg={3} xl={4}>
                        <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }} height={'100%'}>
                            <Grid item xs={4} sm={8} md={12} lg={16} xl={20}>
                                <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography>Live Data 5</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12} lg={16} xl={20} mt={0.5}>
                                <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography>Live Data 6</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sm={8} md={12} lg={16} xl={20} height={'50%'}>
                <Grid container spacing={0.5} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }} height={'100%'}>

                    {/* column 1 */}

                    <Grid item xs={4} sm={8} md={3} lg={5} xl={6}>
                        <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Typography>Live Data 1B</Typography>
                        </Paper>
                    </Grid>

                    {/* column 2 */}
                    <Grid item xs={4} sm={8} md={3} lg={3} xl={4}>
                        <Grid container columns={{ xs: 4, sm: 8, md: 3, lg: 3, xl: 4 }} height={'100%'}>
                            <Grid item xs={4} sm={8} md={3} lg={3} xl={4}>
                                <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography>Live Data 2B</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} sm={8} md={3} lg={3} xl={4} mt={0.5}>
                                <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography>Live Data 3B</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* column 3 */}
                    <Grid item xs={4} sm={8} md={3} lg={3} xl={4}>
                        <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }} height={'100%'}>
                            <Grid item xs={4} sm={8} md={12} lg={16} xl={20}>
                                <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography>Live Data 4B</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12} lg={16} xl={20} mt={0.5}>
                                <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography>Live Data 5B</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* column 4 */}
                    <Grid item xs={4} sm={8} md={3} lg={5} xl={6}>
                        <Paper sx={{ display: 'flex', bgcolor: darkTheme.palette.background.paper2, borderRadius: '0.3rem', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Typography>Live Data 6B</Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
        </>
    );
}

export default CRMMonitor;