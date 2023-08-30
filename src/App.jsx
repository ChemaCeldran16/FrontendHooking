import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PaginaPrincipal from './paginas/PaginaPrincipal';
import PaginaRegistro from './paginas/PaginaRegistro';

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen dark text-foreground bg-background flex items-start justify-center">
        <PaginaRegistro/>
      </div>
      <Routes>
        <Route path="/" >
          {/* <Route index element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/information" element={<Information />} />
            <Route path="/services/training" element={<Information />} />
            <Route path="/services/inference" element={<Information />} />
            <Route path="/services/mdk" element={<Information />} />          */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

