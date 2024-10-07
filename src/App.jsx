import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './styles/darkTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './pages/Dashboard';
import AddContact from './pages/AddContact';
import AddLead from './pages/AddLead';
import AddOpportunity from './pages/AddOpportunity';
import UpdateContact from './pages/UpdateContact';
import UpdateLead from './pages/UpdateLead';
import UpdateOpportunity from './pages/UpdateOpportunity';
import UpdateProject from './pages/UpdateProject';
import CRMMonitor from './pages/CRMMonitor';
import Register from './pages/Register';
import Opening from './pages/Opening';
import Login from './pages/Login';
import ManageProducts from './pages/ManageProducts';
import AddProduct from './pages/AddProduct';
import './styles/scrollable.css';
import ProtectedRoute from './components/AuthCheck';
import EditProduct from './pages/EditProduct';
import ViewContact from './pages/ViewContact';

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
          <Route path="/:username/add_opportunity" element={<ProtectedRoute><AddOpportunity/></ProtectedRoute>}/>
          <Route path="/:username/update_contact/:contactId" element={<ProtectedRoute><UpdateContact/></ProtectedRoute>}/>
          <Route path="/:username/update_lead/:leadId" element={<ProtectedRoute><UpdateLead/></ProtectedRoute>}/>
          <Route path="/:username/update_opportunity/:opportunityId" element={<ProtectedRoute><UpdateOpportunity/></ProtectedRoute>}/>
          <Route path="/:username/update_project/:projectId" element={<ProtectedRoute><UpdateProject/></ProtectedRoute>}/>
          <Route path="/:username/view_contact/:contactId" element={<ProtectedRoute><ViewContact/></ProtectedRoute>}/>
          <Route path="/:username/view_lead/:leadId" element={<ProtectedRoute><ViewLead/></ProtectedRoute>}/>
          <Route path="/:username/view_opportunity/:opportunityId" element={<ProtectedRoute><ViewOpportunity/></ProtectedRoute>}/>
          <Route path="/:username/view_project/:projectId" element={<ProtectedRoute><ViewProject/></ProtectedRoute>}/>
          <Route path="/edit_product/:productId" element={<ProtectedRoute><EditProduct/></ProtectedRoute>}/>
          <Route path="/" element={<Opening/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
