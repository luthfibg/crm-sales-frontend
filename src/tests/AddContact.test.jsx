import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // assuming you're using react-router-dom
import axios from 'axios';
import AddContact from '../pages/AddContact'; // replace with your actual path

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('axios');

describe('AddContact', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockedNavigate);
    jest.spyOn(axios, 'post').mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AddContact />
      </MemoryRouter>
    );
  });

  it('calls handleOnclickSave correctly', async () => {
    render(
      <MemoryRouter>
        <AddContact />
      </MemoryRouter>
    );

    const personNameInput = screen.getByLabelText('Nama Customer');
    fireEvent.change(personNameInput, { target: { value: 'John Doe' } });

    const personAddressInput = screen.getByLabelText('Alamat');
    fireEvent.change(personAddressInput, { target: { value: '123 Main St' } });

    const institutionInput = screen.getByLabelText('Nama Institusi');
    fireEvent.change(institutionInput, { target: { value: 'Acme Corp' } });

    const positionInput = screen.getByLabelText('Jabatan');
    fireEvent.change(positionInput, { target: { value: 'Manager' } });

    const institutionAddressInput = screen.getByLabelText('Alamat Institusi');
    fireEvent.change(institutionAddressInput, { target: { value: '456 Oak St' } });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'qYqgZ@example.com' } });

    const emailInput2 = screen.getByLabelText('Email 2');
    fireEvent.change(emailInput2, { target: { value: 'qYfgDfr@example.com' } });

    const phoneInput = screen.getByLabelText('Telepon');
    fireEvent.change(phoneInput, { target: { value: '555-1234' } });

    const phoneInput2 = screen.getByLabelText('Telepon 2');
    fireEvent.change(phoneInput2, { target: { value: '768-1234' } });

    const socmedLinkInput = screen.getByLabelText('Link Media Sosial');
    fireEvent.change(socmedLinkInput, { target: { value: 'https://example.com' } });

    const statusInput = screen.getByTestId('status-input');
    fireEvent.change(statusInput, { target: { value: 'Follow Up' } });

    const descriptionsInput = screen.getByLabelText('Deskripsi');
    fireEvent.change(descriptionsInput, { target: { value: 'Lorem ipsum dolor sit amet' } });

    const saveButton = screen.getByText('Simpan');
    fireEvent.click(saveButton);

    await screen.findByText('Some confirmation message'); // Adjust this to wait for some indication that the form submission was successful

    expect(axios.post).toHaveBeenCalledWith('http://localhost:2999/data/contacts', {
      person: 'John Doe',
      person_address: '123 Main St',
      institution: 'Acme Corp',
      position: 'Manager',
      institution_address: '456 Oak St',
      email_address: 'qYqgZ@example.com',
      email_address2: 'qYfgDfr@example.com',
      phone: '555-1234',
      phone2: '768-1234',
      socmed_link: 'https://example.com',
      status: 'Follow Up',
      descriptions: 'Lorem ipsum dolor sit amet'
    });
  });
});
