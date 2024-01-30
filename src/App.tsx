import { MoorhenReduxProvider, ErrorBoundary } from 'moorhen'
import React from 'react'
import { MoorhenRouter } from './MoorhenRouter'
import { SpeedInsights } from '@vercel/speed-insights/next';

function App() {

  return <React.StrictMode>
    <ErrorBoundary >
      <div className="App">
        <MoorhenReduxProvider>
          <MoorhenRouter />
          <SpeedInsights />
        </MoorhenReduxProvider>
      </div>
    </ErrorBoundary>
  </React.StrictMode>
}

export default App
