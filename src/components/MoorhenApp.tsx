
import { MoorhenReduxProvider, ErrorBoundary } from 'moorhen'
import { MoorhenRouter } from'./routers/MoorhenRouter'
import React from 'react'

export const MoorhenApp: React.FC = () => {
    return <React.StrictMode>
                <ErrorBoundary >
                <div className="App">
                    <MoorhenReduxProvider>
                        <MoorhenRouter />
                    </MoorhenReduxProvider>
                </div>
                </ErrorBoundary>
            </React.StrictMode>
};