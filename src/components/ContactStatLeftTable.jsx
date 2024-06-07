import React, { useState, useEffect } from "react";
import axios from 'axios';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const columns = [
    { id: 'person', label: 'Name', minWidth: 170 },
    { id: 'institution', label: 'Institusi', minWidth: 170 },
    { id: 'position',label: 'Posisi', minWidth: 170 },
    { id: 'trade_value',
      label: 'Nilai Trading',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'lead_stage', label: 'Tahap', minWidth: 170 },
    { id: 'lead_status', label: 'Status', minWidth: 170 },
  ];
    
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
    },
    size: 'small'}} >
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth, paddingTop: '8px', paddingBottom: '8px' }}
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
                    <TableCell
                     key={column.id}
                     align={column.align}
                     sx={{ paddingY: '7px' }}>
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