import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  cambioTipo,
  cambioPoblacion,
  cambioKilometros,
} from '../redux/searchSlice'

export default function ModalBusqueda() {
  const { onOpen, onOpenChange } = useDisclosure()
  const [isOpen, setIsOpen] = useState(true) // Inicialmente, establece el estado del modal en abierto
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    // Cuando se monta el componente, abre el modal automáticamente
    onOpenChange(true)
  }, [])

  const handleAceptar = async e => {
    dispatch(cambioTipo(""))
    dispatch(cambioPoblacion(""))
    dispatch(cambioKilometros(""))

    navigate('/search')
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Sentimos las molestias
              </ModalHeader>
              <ModalBody>
                <p>
                  Lamentablemente, no hemos encontrado ningún local que cumpla
                  con los criterios de búsqueda que ha proporcionado. A
                  continuación, le mostraremos todos los locales registrados
                  para ver si alguno se ajusta a sus preferencias.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='primary'
                  onClick={handleAceptar}
                  onPress={() => {
                    setIsOpen(false)
                    onClose()
                  }}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
