import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './styles/darkTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './pages/Dashboard';
import AddContact from './pages/AddContact';
import AddLead from './pages/AddLead';
import UpdateContact from './pages/UpdateContact';
import UpdateLead from './pages/UpdateLead';
import CRMMonitor from './pages/CRMMonitor';
import Register from './pages/Register';
import Opening from './pages/Opening';
import Login from './pages/Login';
import ManageProducts from './pages/ManageProducts';
import AddProduct from './pages/AddProduct';
import './styles/scrollable.css';

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Opening/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/monitor" element={<CRMMonitor/>}/>
          <Route path="/products" element={<ManageProducts/>}/>
          <Route path="/add_products" element={<AddProduct/>}/>
          <Route path="/:username" element={<Dashboard/>}/>
          <Route path="/:username/add_contact" element={<AddContact/>}/>
          <Route path="/:username/add_lead" element={<AddLead/>}/>
          <Route path="/:username/update_contact/:id" element={<UpdateContact/>}/>
          <Route path="/:username/update_lead/:id" element={<UpdateLead/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
