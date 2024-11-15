// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

// const columns = [
//     { id: 'person', label: 'Name', minWidth: 170 },
//     { id: 'institution', label: 'Institusi', minWidth: 170 },
//     { id: 'position',label: 'Posisi', minWidth: 170 },
//     { id: 'trade_value',
//       label: 'Nilai Trading',
//       minWidth: 170,
//       align: 'right',
//       format: (value) => value.toLocaleString('en-US'),
//     },
//     { id: 'lead_stage', label: 'Tahap', minWidth: 170 },
//     { id: 'lead_status', label: 'Status', minWidth: 170 },
//   ];
    
// export default function ContactStatLeftTable() {

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [contacts, setContacts] = useState([]);
//   const [leads, setLeads] = useState([]);
//   const [combinedData, setCombinedData] = useState([]);
//   const username = localStorage.getItem('username'); // get username from localstorage (user login session)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const contactResponse = await axios.get(`http://localhost:2999/${username}/data/contacts`);
//         const leadResponse = await axios.get(`http://localhost:2999/${username}/data/leads`);
//         setContacts(contactResponse.data);
//         setLeads(leadResponse.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const combinedData = contacts.map(contact => {
//       const matchingLead = leads.find(lead => lead.person === contact.person) || {};
//       return {
//         person: contact.person,
//         institution: contact.institution,
//         position: contact.position,
//         trade_value: matchingLead.trade_value,
//         lead_stage: matchingLead.lead_stage,
//         lead_status: matchingLead.lead_status,
//       };
//     });
//     setCombinedData(combinedData);
//   }, [contacts, leads]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <>
//     <TableContainer sx={{ height: 270 }}>
//     <Table 
//     className="scrollable-container"
//     stickyHeader
//     aria-label="sticky table"
//     sx={{ container_with_scrolls:{
//       overflowX:'scroll',
//       '&::-webkit-scrollbar':{
//           width:0,
//       },
//     },
//     size: 'small'}} >
//       <TableHead>
//         <TableRow>
//           {columns.map((column) => (
//             <TableCell
//               key={column.id}
//               align={column.align}
//               style={{ 
//                 minWidth: column.minWidth,
//                 paddingTop: '8px',
//                 paddingBottom: '8px',
//               }}
//               sx={{ 
//                 '@media (min-width: 1200px)': { fontSize: 12 }
//               }}
//             >
//               {column.label}
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {combinedData
//           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//           .map((row, index) => {
//             return (
//               // eslint-disable-next-line
//               <TableRow hover role="checkbox" tabIndex={-1} key={index}>
//                 {columns.map((column) => {
//                   const value = row[column.id];
//                   return (
//                     <TableCell
//                      key={column.id}
//                      align={column.align}
//                      sx={{ 
//                       paddingY: '7px',
//                       '@media (min-width: 1200px)': { fontSize: 12 } 
//                       }}>
//                       {column.format && typeof value === 'number'
//                         ? column.format(value)
//                         : value}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             );
//           })}
//       </TableBody>
//     </Table>
//   </TableContainer>
//   {/* <TablePagination
//     rowsPerPageOptions={[10, 25, 100]}
//     component="div"
//     count={combinedData.length}
//     rowsPerPage={rowsPerPage}
//     page={page}
//     onPageChange={handleChangePage}
//     onRowsPerPageChange={handleChangeRowsPerPage}
//   /> */}
//   </>
//   );
// }