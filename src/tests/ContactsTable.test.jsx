import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import ContactsTable from '../components/ContactsTable';

jest.mock('axios');

describe('ContactsTable', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
  });

  it('renders correctly', async () => {
    render(<ContactsTable />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('fetches contacts on mount', async () => {
    render(<ContactsTable />);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:2999/data/contacts');
  });

  it('updates contacts after deletion', async () => {
    axios.delete.mockResolvedValue();
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, person: 'John Doe' }] });
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<ContactsTable />);
    const checkbox = screen.getByLabelText('John Doe');
    userEvent.click(checkbox);
    fireEvent.click(screen.getByText('Hapus Kontak'));
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:2999/data/contacts/1');
      expect(axios.get).toHaveBeenCalledWith('http://localhost:2999/data/contacts');
    });
  });

  it('navigates to edit page when edit button is clicked', async () => {
    render(<ContactsTable />);
    const checkbox = screen.getByLabelText('John Doe');
    userEvent.click(checkbox);
    fireEvent.click(screen.getByText('Edit Kontak'))
    });
});