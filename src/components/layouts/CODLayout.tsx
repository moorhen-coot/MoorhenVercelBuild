import { MoorhenContainer, MoorhenMolecule, MoorhenReduxStore, addMolecule } from 'moorhen'
import { webGL } from 'moorhen/types/mgWebGL';
import { moorhen } from 'moorhen/types/moorhen';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const CODLayout: React.FC = () => {
    const dispatch = useDispatch()
    const cootInitialized = useSelector((state: moorhen.State) => state.generalStates.cootInitialized)
    const defaultBondSmoothness = useSelector((state: moorhen.State) => state.sceneSettings.defaultBondSmoothness)
    const backgroundColor = useSelector((state: moorhen.State) => state.sceneSettings.backgroundColor)

    const glRef = useRef<webGL.MGWebGL | null>(null)
    const commandCentre = useRef<moorhen.CommandCentre | null>(null)

    const { codid } = useParams()

    const urlPrefix = "/baby-gru"
    //const baseUrl = 'https://www.crystallography.net/cod'
    const baseUrl = '/cod'
    const monomerLibraryPath = 'https://raw.githubusercontent.com/MRC-LMB-ComputationalStructuralBiology/monomers/master'

    const loadCOD = async (codid: string) => {
        const url = `${baseUrl}/${codid}.cif`
        const newMolecule = new MoorhenMolecule(commandCentre, glRef, MoorhenReduxStore, monomerLibraryPath)
        newMolecule.setBackgroundColour(backgroundColor)
        newMolecule.defaultBondOptions.smoothness = defaultBondSmoothness
        try {
            const response = await fetch(url)
            if (response.ok) {
                const coordData = await response.text()
                await newMolecule.loadToCootFromString(coordData, codid, true)
            }
            if (newMolecule.molNo === -1) {
                throw new Error("Cannot read the fetched molecule...")
            } 
            await newMolecule.fetchIfDirtyAndDraw('CBs')
            await newMolecule.addRepresentation('ligands', '/*/*/*/*')
            await newMolecule.centreOn('/*/*/*/*', true, true)
            dispatch(addMolecule(newMolecule))
        } catch (err) {
            console.warn(err)
            console.warn(`Cannot fetch PDB entry from ${url}, doing nothing...`)
        }
    }

    useEffect(() => {
        if (cootInitialized && codid) {
            loadCOD(codid)
        }
    }, [codid, cootInitialized])

    const collectedProps = {
        glRef, commandCentre, urlPrefix
    }

    return <MoorhenContainer {...collectedProps} />
}
