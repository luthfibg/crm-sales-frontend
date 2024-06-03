import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import ContactsTable from '../components/ContactsTable';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('ContactsTable', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [{ id: 1, person: 'Harry Tanoe' }] }); // Pastikan data kontak ada
  });

  it('renders correctly', async () => {
    render(<MemoryRouter><ContactsTable /></MemoryRouter>);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('fetches contacts on mount', async () => {
    render(<MemoryRouter><ContactsTable /></MemoryRouter>);
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:2999/data/contacts'));
  });

  it('updates contacts after deletion', async () => {
    axios.delete.mockResolvedValue();
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, person: 'Harry Tanoe' }] });
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<MemoryRouter><ContactsTable /></MemoryRouter>);

    // Tunggu sampai data kontak dimuat
    await waitFor(() => screen.getByLabelText('Harry Tanoe'));

    const checkbox = screen.getByLabelText('Harry Tanoe');
    userEvent.click(checkbox);
    fireEvent.click(screen.getByText('Hapus Kontak'));
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:2999/data/contacts/1');
      expect(axios.get).toHaveBeenCalledWith('http://localhost:2999/data/contacts');
    });
  });

  it('navigates to edit page when edit button is clicked', async () => {
    render(<MemoryRouter><ContactsTable /></MemoryRouter>);

    // Tunggu sampai data kontak dimuat
    await waitFor(() => screen.getByLabelText('Harry Tanoe'));

    const checkbox = screen.getByLabelText('Harry Tanoe');
    userEvent.click(checkbox);
    fireEvent.click(screen.getByText('Edit Kontak'));

    // Pastikan navigasi ke halaman edit (Implementasikan ini sesuai dengan kebutuhan Anda)
    // expect(mockedNavigate).toHaveBeenCalledWith('/edit/1'); // Contoh navigasi
  });
});
