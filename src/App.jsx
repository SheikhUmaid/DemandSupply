import { useState } from 'react'
import './App.css'
import Landing from './pages/landing'
import Authentication from './pages/authentication'
import ComingSoon from './pages/comingSoon'
import DemandSelection from './pages/demandSelection'
import AdminPanel from './pages/adminPanel'
import DelSupForm from './pages/delSupForm'

function App() {
  const [currentPage, setCurrentPage] = useState('auth');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === 'auth' && <Authentication navigate={navigate} />}
      {currentPage === 'landing' && <Landing navigate={navigate} />}
      {currentPage === 'comingSoon' && <ComingSoon navigate={navigate} />}
      {currentPage === 'demandSelection' && <DemandSelection navigate={navigate} />}
      {currentPage === 'adminPanel' && <AdminPanel navigate={navigate} />}
      {currentPage === 'delSupForm' && <DelSupForm navigate={navigate} />}
    </>
  )
}

export default App
