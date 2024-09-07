import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function WishleadModal({ open, onClose }) {
  const [selectedContact, setSelectedContact] = React.useState('');
  const [contacts, setContacts] = React.useState([]);
  
  const username = localStorage.getItem('username');

  React.useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:2999/${username}/data/contacts`);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [username]);

  const navigate = useNavigate();
  const handleSaveWishlist = async () => {
    try {
        const selectedContactObj = contacts.find(contact => contact.contact_name === selectedContact);
        localStorage.setItem('selectedPerson', JSON.stringify(selectedContactObj));

        const response = await axios.post('http://localhost:2999/data/wishlist_from_modal', {
            contact_name: selectedContactObj.contact_name,
        });

        if (response.status === 200) {
          if (response.data.wishlist_id) {
            
            // Simpan wishlist_id ke localStorage
            localStorage.setItem('wishlist_id', response.data.wishlist_id);
            
          }
            onClose(); // Tutup modal setelah wishlist berhasil disimpan
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            alert('Wishlist already exists for this customer.');
            onClose(); // Tutup modal jika wishlist sudah ada
            navigate(`/${username}`);
        } else {
            console.error('Error saving wishlist:', error);
        }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="spring-modal-title" variant="h6" component="h2">
            Tambahkan Wishlist
          </Typography>
          <TextField
            select
            label="Pilih Kontak"
            value={selectedContact}
            onChange={(e) => setSelectedContact(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          >
            {contacts.map((contact) => (
              <MenuItem key={contact.contact_id} value={contact.contact_name}>
                {contact.contact_name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={onClose} sx={{ mr: 2 }}>
              Batal
            </Button>
            <Button onClick={handleSaveWishlist} variant="contained">
              Simpan
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
