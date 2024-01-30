import { MoorhenReduxProvider, ErrorBoundary } from 'moorhen'
import React from 'react'
import { MoorhenRouter } from './MoorhenRouter'

function App() {

  return <React.StrictMode>
    <ErrorBoundary >
      <div className="App">
        <MoorhenReduxProvider>
          <MoorhenRouter />
        </MoorhenReduxProvider>
      </div>
    </ErrorBoundary>
  </React.StrictMode>
}

export default App
