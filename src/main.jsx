import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
    <div className='w-screen sm:h-full dark text-foreground bg-black flex  justify-center  '>
      <App />
    </div>
    </NextUIProvider>
)