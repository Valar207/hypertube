// import React, { useState } from 'react';
// import { TextField, Container, Tabs, Tab, Grid, Button, Box, Typography } from '@material-ui/core'
// import { StyledTabs, StyledTextField, StyledButton } from './StyledHomePage.js'
// import Styled from 'styled-components'


// function TabPanel(props) {
//     const { children, value, index } = props;

//     return (
//         <div    >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// export const HomePage = (props) => {
//     const [User, setUser] = useState({
//         FirstName: '',
//         LastName: '',
//         UserName: '',
//         Email: '',
//         Password: '',
//         ConfirmPassword: '',
//         showPassword: false,
//     });

//     const handleChange = (e) => {
//         setUser({
//             ...User,
//             [e.target.name]: e.target.value
//         });
//     };
//     // const classes = useStyles();
//     const [tabsValue, setTabsValue] = useState(0);

//     const handleChangeTabs = (event, newValue) => {
//         setTabsValue(newValue);
//     };

//     return (


//         <Container >
//             <StyledTabs value={tabsValue} onChange={handleChangeTabs}>
//                 <Tab label="Sign In" />
//                 <Tab label="Sign Up" />
//             </StyledTabs>

//             <TabPanel value={tabsValue} index={0}>
//                 Item One
//             </TabPanel>
//             <TabPanel value={tabsValue} index={1}>
//                 Item Two
//             </TabPanel>


//             <Grid container spacing={3} >
//                 <Grid item md={6}>
//                     <StyledTextField name="FirstName" onChange={handleChange} value={User.FirstName} label="fisrt name" variant="outlined" />
//                 </Grid>
//                 <Grid item md={6}>
//                     <StyledTextField name="LastName" onChange={handleChange} value={User.LastName} label="Last name" variant="outlined" />
//                 </Grid>
//                 <Grid item md={12}>
//                     <StyledTextField fullWidth name="UserName" onChange={handleChange} value={User.UserName} label="User name" variant="outlined" />
//                 </Grid>
//                 <Grid item md={12}>
//                     <StyledTextField fullWidth name="Email" onChange={handleChange} value={User.Email} label="Adress email" variant="outlined" />
//                 </Grid>
//                 <Grid item md={12}>
//                     <StyledTextField fullWidth name="Password" onChange={handleChange} value={User.Password} label="Password" variant="outlined" />
//                 </Grid>
//                 <Grid item md={12}>
//                     <StyledTextField fullWidth name="ConfirmPassword" onChange={handleChange} value={User.ConfirmPassword} label="Confirm Password" variant="outlined" />
//                 </Grid>
//             </Grid>



//             <StyledButton onClick={() => {
//                 console.log(User);
//             }} variant="contained" color="primary">
//                 Primary
//             </StyledButton>

//         </Container>
//     );
// }

// export default HomePage;