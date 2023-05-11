
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Store } from './pages/Store';
import { Navbar } from './components/Navbar';
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  


  return (
    <div className="container mx-auto">
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </ShoppingCartProvider>
    </div>
  )
}

export default App