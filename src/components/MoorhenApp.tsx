
import { ErrorBoundary, MoorhenReduxStore } from 'moorhen'
import { Provider } from 'react-redux';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { PdbLayout } from './layouts/PdbLayout';
import { TutorialLayout } from './layouts/TutorialLayout';
import { LigandLayout } from './layouts/LigandLayout';
import { GalleryLayout } from './layouts/GalleryLayout';
import { GallerySessionLayout } from './layouts/GallerySessionLayout';
import React from 'react'

export const MoorhenApp: React.FC = () => {

    const router = createBrowserRouter(
        [
            {
                path: "",
                element: <RootLayout />,
            },
            {
                path: "/",
                element: <RootLayout />,
            },
            {
                path: "/pdb/:pdbId",
                element: <PdbLayout />,
            },
            {
                path: "/:pdbId",
                element: <PdbLayout />,
            },
            {
                path: "/tutorial/:tutorialNumber",
                element: <TutorialLayout />,
            },
            {
                path: "/ligand/:ligandName",
                element: <LigandLayout />,
            },
            {
                path: "/lig/:ligandName",
                element: <LigandLayout />,
            },
            {
                path: "/monomer/:ligandName",
                element: <LigandLayout />,
            },
            {
                path: "gallery",
                element: (
                    <>
                        <GalleryLayout />
                        <Outlet/>
                    </>
                ),
                children: [
                    {
                        path: ":galleryId",
                        element: <GallerySessionLayout />
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