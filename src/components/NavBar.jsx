import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react'
import Marca from './Marca'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

export default function NavBar({ usuario }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCerrarSesion = () => {
    // Lógica para cerrar sesión (ejemplo usando una acción de Redux)
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className='bg-gray-900 fixed top-0 left-0 w-full z-50'
    >
      <NavbarContent className='justify-content'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='md:hidden'
        />
        <NavbarBrand>
          <Marca></Marca>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='end'>
        {!usuario || usuario.nombre === '' ? (
          <>
            <NavbarItem className='hidden md:flex lg:flex'>
              <Link href='/RegisterPage'>Regístrate</Link>
            </NavbarItem>
            <NavbarItem className='hidden md:flex lg:flex'>
              <Button
                as={Link}
                color='primary'
                href='/LoginPage'
                variant='flat'
              >
                Iniciar Sesión
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <div className='text-white p-4'>Hola, {usuario.nombre}</div>
            <NavbarItem className='hidden md:flex lg:flex'>
              <Button color='danger' onClick={handleCerrarSesion}>
                Cerrar Sesión
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>



      <NavbarMenu className='bg-black opacity-90'>

      {!usuario || usuario.nombre === '' ? (
          <>
          <NavbarMenuItem>
            <Link href='/LoginPage' className='p-4 font-bold text-md'>
              Iniciar Sesion
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href='/RegisterPage' className='p-4 font-bold text-md'>
              Registrate
            </Link>
          </NavbarMenuItem>
          </>
        ) : (
          <>
            <div className='text-white p-4 '>Hola, {usuario.nombre}</div>

            <NavbarMenuItem >
              <Button className='bg-transparent text-red-400 text-md font-bold' onClick={handleCerrarSesion}>
                Cerrar Sesión
              </Button>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>



    </Navbar>
  )
}
