import React from 'react'
import { createRoot } from 'react-dom/client'
import Portfolio from '../app'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
)


