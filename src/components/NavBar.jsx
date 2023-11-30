import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem,NavbarMenu,NavbarMenuItem,NavbarMenuToggle, Link, Button} from "@nextui-org/react";
import Marca from "./Marca";
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
export default function App({usuario}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleCerrarSesion = () => {
    // Lógica para cerrar sesión (ejemplo usando una acción de Redux)
    dispatch(logout())
    navigate('/')
  }
  

  return (
    <>
      <div className="flex bg-gray-900 w-full fixed justify-between z-50 items-center h-16 sm:p-2">
        <div className="lg:pl-4 xl:pl-8">
        <Marca></Marca> 
        </div>
        <div className="space-x-5 lg:pr-4 xl:pr-8">
        {!usuario || usuario.nombre === '' ? (
          <>
              <Link href='/RegisterPage' className="text-md md:font-bold lg:text-lg xl:text-xl">
                Regístrate
              </Link>
              <Button
                as={Link}
                color='primary'
                href='/LoginPage'
                variant='flat'
                className="sm:text-sm  sm:w-[6rem] sm:h-[2rem] md:text-md md:w-[8rem] md:h-[2.5rem] md:font-bold lg:text-lg lg:w-[10rem] lg:h-[3rem] 
                xl:text-xl lg:w-[11rem] lg:h-[3rem]"
              >
                Iniciar Sesión
              </Button>
          </>
        ) : (
          <>
          <div className="flex flex-row items-center">
            <div className='text-white p-4 sm:text-sm md:text-lg md:font-bold lg:text-lg xl:text-xl'>
              Hola, {usuario.nombre}
            </div>
              <Button color='danger'
              className="sm:text-sm  sm:w-[6rem] sm:h-[1.7rem] md:text-md md:w-[8rem] md:h-[2.5rem] md:font-bold lg:text-lg lg:w-[10rem]  
              xl:text-xl xl:w-[11rem] "
              onClick={handleCerrarSesion}>                
                Cerrar sesión
              </Button>
          </div>
          </>
        )}
        </div>
      </div>
    </>
  );
}