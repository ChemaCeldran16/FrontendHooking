import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import PaginaBusqueda from './paginas/PaginaBusqueda'
import PaginaCarga from './paginas/PaginaCarga'
import PaginaLocal from './paginas/PaginaLocal'
import PaginaLogin from './paginas/PaginaLogin'
import PaginaPrincipal from './paginas/PaginaPrincipal'
import PaginaRegistro from './paginas/PaginaRegistro'
import { Provider } from 'react-redux'
import {store} from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div >
          <Routes>
            <Route path='/' element={<PaginaPrincipal />} />
            <Route path='/LoginPage' element={<PaginaLogin />} />
            <Route path='/RegisterPage' element={<PaginaRegistro />} />
            <Route path='/search' element={<PaginaBusqueda />} />
            <Route path='/local' element={<PaginaLocal />} />
            <Route path='/carga' element={<PaginaCarga />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
