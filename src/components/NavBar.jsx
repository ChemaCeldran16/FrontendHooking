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
  const menuItems = ['Regístrate', 'Iniciar Sesión']

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
          className='sm:hidden'
        />
        <NavbarBrand>
          <Marca></Marca>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='end'>
        {!usuario || usuario.nombre === '' ? (
          <>
            <NavbarItem className='hidden lg:flex'>
              <Link href='/RegisterPage'>Regístrate</Link>
            </NavbarItem>
            <NavbarItem className='hidden lg:flex'>
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
            <NavbarItem className='hidden lg:flex'>
              <Button color='danger' onClick={handleCerrarSesion}>
                Cerrar Sesión
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              className='w-full'
              href='#'
              size='lg'
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
