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
import ProtectedRoute from './components/AuthCheck';

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/monitor" element={<ProtectedRoute><CRMMonitor/></ProtectedRoute>}/>
          <Route path="/products" element={<ProtectedRoute><ManageProducts/></ProtectedRoute>}/>
          <Route path="/add_products" element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
          <Route path="/:username" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/:username/add_contact" element={<ProtectedRoute><AddContact/></ProtectedRoute>}/>
          <Route path="/:username/add_lead" element={<ProtectedRoute><AddLead/></ProtectedRoute>}/>
          <Route path="/:username/update_contact/:contactId" element={<ProtectedRoute><UpdateContact/></ProtectedRoute>}/>
          <Route path="/:username/update_lead/:leadId" element={<ProtectedRoute><UpdateLead/></ProtectedRoute>}/>
          <Route path="/" element={<Opening/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
