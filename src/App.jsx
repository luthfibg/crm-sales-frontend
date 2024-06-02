import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './styles/darkTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './pages/Dashboard';
import AddContact from './pages/AddContact';
import AddLead from './pages/AddLead';
import UpdateContact from './pages/UpdateContact';
import UpdateLead from './pages/UpdateLead';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/add_contact" element={<AddContact/>}/>
          <Route path="/add_lead" element={<AddLead/>}/>
          <Route path="/update_contact/:id" element={<UpdateContact/>}/>
          <Route path="/update_lead/:id" element={<UpdateLead/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
