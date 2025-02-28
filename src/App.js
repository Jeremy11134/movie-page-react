import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountMenu from './components/menu'; // Import the AccountMenu component
import Home from './pages/home';
import Films from './pages/films';
import Vestigingen from './pages/vestigingen';
import Recensies from './pages/recensies';

function App() {
  return (
    <Router>
      <AccountMenu /> {/* Your navigation component */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/vestigingen" element={<Vestigingen />} />
        <Route path="/recensies" element={<Recensies />} />
      </Routes>
    </Router>
  );
}

export default App;
