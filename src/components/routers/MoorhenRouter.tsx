
import { MoorhenContainer } from 'moorhen'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TutorialRouter } from './TutorialRouter';
import { PdbRouter } from './PdbRouter';
import { LigandRouter } from './LigandRouter';
import { GalleryRouter } from './GalleryRouter';
import { GallerySessionRouter } from './GallerySessionRouter'

export const MoorhenRouter: React.FC = () => {
    return <RouterProvider router={moorhenRouter} />
};

const moorhenRouter = createBrowserRouter(
    [
        {
            path: "",
            element: <MoorhenContainer />,
        },
        {
            path: "/",
            element: <MoorhenContainer />,
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
            element: <GalleryRouter />
        },
        {
            path: "gallery/:galleryId",
            element: <GallerySessionRouter />
        }
    ]
)

