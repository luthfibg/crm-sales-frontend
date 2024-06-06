import React, { useState, useEffect } from "react";
import axios from 'axios';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const columns = [
<<<<<<< HEAD
    { id: 'person', label: 'Name', minWidth: 170 },
    { id: 'institution', label: 'Institusi', minWidth: 170 },
    { id: 'position',label: 'Posisi', minWidth: 170 },
    { id: 'trade_value',
      label: 'Nilai Trading',
=======
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
>>>>>>> 5a3b8324a91cc5bf1a2bddb3c9fbfb20c827e6a2
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
<<<<<<< HEAD
    { id: 'lead_stage', label: 'Tahap', minWidth: 170 },
    { id: 'lead_status', label: 'Status', minWidth: 170 },
  ];
    
=======
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
>>>>>>> 5a3b8324a91cc5bf1a2bddb3c9fbfb20c827e6a2
export default function ContactStatLeftTable() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactResponse = await axios.get('http://localhost:2999/data/contacts');
        const leadResponse = await axios.get('http://localhost:2999/data/leads');
        setContacts(contactResponse.data);
        setLeads(leadResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const combinedData = contacts.map(contact => {
      const matchingLead = leads.find(lead => lead.person === contact.person) || {};
      return {
        person: contact.person,
        institution: contact.institution,
        position: contact.position,
        trade_value: matchingLead.trade_value,
        lead_stage: matchingLead.lead_stage,
        lead_status: matchingLead.lead_status,
      };
    });
    setCombinedData(combinedData);
  }, [contacts, leads]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <TableContainer sx={{ height: 270 }}>
    <Table 
    stickyHeader
    aria-label="sticky table"
    sx={{ container_with_scrolls:{
      overflowX:'scroll',
      '&::-webkit-scrollbar':{
          width:0,
      }
    }, }} >
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {combinedData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </TableContainer>
  {/* <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={combinedData.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  /> */}
  </>
  );
}