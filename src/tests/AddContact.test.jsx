import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import AddContact from '../pages/AddContact'; // adjust the import path as needed

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('axios');

describe('AddContact', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockedNavigate);
    axios.post.mockResolvedValue({});
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

    expect(screen.getByText('Daftarkan Kontak Baru')).toBeInTheDocument();
  });

  it('calls handleOnclickSave correctly', async () => {
    render(
      <MemoryRouter>
        <AddContact />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nama Customer'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Alamat'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('Nama Institusi'), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText('Jabatan'), { target: { value: 'Manager' } });
    fireEvent.change(screen.getByLabelText('Alamat Institusi'), { target: { value: '456 Oak St' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'qYqgZ@example.com' } });
    fireEvent.change(screen.getByLabelText('Email 2'), { target: { value: 'qYfgDfr@example.com' } });
    fireEvent.change(screen.getByLabelText('Telepon'), { target: { value: '555-1234' } });
    fireEvent.change(screen.getByLabelText('Telepon 2'), { target: { value: '768-1234' } });
    fireEvent.change(screen.getByLabelText('Link Media Sosial'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('status-input'), { target: { value: 'Follow Up' } });
    fireEvent.change(screen.getByLabelText('Deskripsi'), { target: { value: 'Lorem ipsum dolor sit amet' } });

    fireEvent.click(screen.getByText('Simpan'));

    await waitFor(() => {
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
        socmed_link: '',
        status: 'Follow Up',
        descriptions: 'Lorem ipsum dolor sit amet',
      });
    });

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
