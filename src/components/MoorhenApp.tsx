
import { ErrorBoundary, MoorhenReduxStore } from 'moorhen'
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootRouter } from './routers/RootRouter';
import { PdbRouter } from './routers/PdbRouter';
import { TutorialRouter } from './routers/TutorialRouter';
import { LigandRouter } from './routers/LigandRouter';
import { GalleryRouter } from './routers/GalleryRouter';
import { GallerySessionRouter } from './routers/GallerySessionRouter';
import React from 'react'

export const MoorhenApp: React.FC = () => {

    const router = createBrowserRouter(
        [
            {
                path: "",
                element: <RootRouter />,
            },
            {
                path: "/",
                element: <RootRouter />,
            },
            {
                path: "/pdb/:pdbId",
                element: <PdbRouter />,
            },
            {
                path: "/:pdbId",
                element: <PdbRouter />,
            },
            {
                path: "/tutorial/:tutorialNumber",
                element: <TutorialRouter />,
            },
            {
                path: "/ligand/:ligandName",
                element: <LigandRouter />,
            },
            {
                path: "/lig/:ligandName",
                element: <LigandRouter />,
            },
            {
                path: "/monomer/:ligandName",
                element: <LigandRouter />,
            },
            {
                path: "gallery",
                element: <GalleryRouter />,
                children: [
                    {
                        path: ":galleryId",
                        element: <GallerySessionRouter />
                    }
                ]
            },
        ]
    )

    return <React.StrictMode>
                <ErrorBoundary >
                    <div className="App">
                        <Provider store={MoorhenReduxStore}>
                            <RouterProvider router={router} />
                        </Provider>
                    </div>
                </ErrorBoundary>
            </React.StrictMode>
};