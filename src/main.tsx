import React from 'react'
import ReactDOM from 'react-dom/client'
import { MoorhenApp } from './components/MoorhenApp'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css'
import './fonts.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MoorhenApp />
    <Analytics />
    <SpeedInsights sampleRate={0.75}/>
  </React.StrictMode>,
)
