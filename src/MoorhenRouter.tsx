
import { MoorhenContainer, MoorhenMolecule, MoorhenMap, addMolecule, addMap, setActiveMap } from 'moorhen'
import { webGL } from 'moorhen/types/mgWebGL';
import { moorhen } from 'moorhen/types/moorhen';
import { useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const MoorhenRouter: React.FC = () => {
    return <RouterProvider router={moorhenRouter} />
};

const WrappedMoorhenContainer: React.FC = () => {
    const glRef = useRef<webGL.MGWebGL | null>(null)
    const commandCentre = useRef<moorhen.CommandCentre | null>(null)
    const dispatch = useDispatch()
    const cootInitialized = useSelector((state: moorhen.State) => state.generalStates.cootInitialized)
    const urlPrefix: string = ""

    const { pdbId, tutorialNumber } = useParams()

    const collectedProps = {
        glRef, commandCentre, urlPrefix
    }

    const tutorialMtzColumnNames: { [key: string]: any } = {
        1: { F: "FWT", PHI: "PHWT", Fobs: 'FP', SigFobs: 'SIGFP', FreeR: 'FREE' },
        2: { F: "FWT", PHI: "PHWT", Fobs: 'FP', SigFobs: 'SIGFP', FreeR: 'FREE' },
        3: { F: "FWT", PHI: "PHWT", Fobs: 'F', SigFobs: 'SIGF', FreeR: 'FREER' }
    }

    const loadTutorial = async (tutorialNumber: string) => {
        const newMolecule = new MoorhenMolecule(commandCentre, glRef, "")
        const newMap = new MoorhenMap(commandCentre, glRef)
        const newDiffMap = new MoorhenMap(commandCentre, glRef)
        await newMolecule.loadToCootFromURL(`${urlPrefix}/baby-gru/tutorials/moorhen-tutorial-structure-number-${tutorialNumber}.pdb`, `mol-${tutorialNumber}`)
        await newMolecule.fetchIfDirtyAndDraw('CBs')
        dispatch(addMolecule(newMolecule))
        await newMolecule.centreOn('/*/*/*/*', false)
        await newMap.loadToCootFromMtzURL(
            `${urlPrefix}/baby-gru/tutorials/moorhen-tutorial-map-number-${tutorialNumber}.mtz`,
            `map-${tutorialNumber}`,
            { isDifference: false, useWeight: false, calcStructFact: true, ...tutorialMtzColumnNames[tutorialNumber] }
        )
        await newDiffMap.loadToCootFromMtzURL(
            `${urlPrefix}/baby-gru/tutorials/moorhen-tutorial-map-number-${tutorialNumber}.mtz`,
            `diff-map-${tutorialNumber}`,
            { F: "DELFWT", PHI: "PHDELWT", isDifference: true, useWeight: false }
        )
        dispatch(addMap(newMap))
        dispatch(addMap(newDiffMap))
        dispatch(setActiveMap(newMap))
    }

    const loadPdb = async (pdbId: string) => {
        const newMolecule: moorhen.Molecule = new MoorhenMolecule(commandCentre, glRef, "")
        const pdbCode: string = pdbId.toLowerCase()
        const coordUrl: string = `https://www.ebi.ac.uk/pdbe/entry-files/download/${pdbCode}.cif`
        await newMolecule.loadToCootFromURL(coordUrl, pdbCode)
        await newMolecule.addRepresentation("CRs", "/*/*")
        await newMolecule.fetchIfDirtyAndDraw("ligands")
        newMolecule.centreOn("/*/*")
        glRef.current?.setZoom(4.0)
        dispatch(addMolecule(newMolecule))
        const newMap = new MoorhenMap(commandCentre, glRef)
        const newDiffMap = new MoorhenMap(commandCentre, glRef)
        try {
            await newMap.loadToCootFromMapURL(
                `https://www.ebi.ac.uk/pdbe/entry-files/${pdbCode}.ccp4`,
                `${pdbCode}-2FoFc`,
                false
            )
            dispatch(addMap(newMap))
        }
        catch (err) {
        }
        try {
            await newDiffMap.loadToCootFromMapURL(
                `https://www.ebi.ac.uk/pdbe/entry-files/${pdbCode}_diff.ccp4`,
                `${pdbCode}-FoFc`,
                true
            )
            dispatch(addMap(newDiffMap))
        }
        catch (err) {
        }
    }

    useEffect(() => {
        if (cootInitialized) {
            if (pdbId) {
                loadPdb(pdbId)
            }
            else if (tutorialNumber) {
                loadTutorial(tutorialNumber)
            }
        }
    }, [pdbId, tutorialNumber, cootInitialized])

    return <MoorhenContainer {...collectedProps} />
}

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
            element: <WrappedMoorhenContainer />,
        },
        {
            path: "/:pdbId",
            element: <WrappedMoorhenContainer />,
        },
        {
            path: "/tutorial/:tutorialNumber",
            element: <WrappedMoorhenContainer />,
        },
    ]
)

