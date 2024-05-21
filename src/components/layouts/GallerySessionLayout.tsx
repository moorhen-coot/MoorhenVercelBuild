import { MoorhenContainer, loadSessionFromArrayBuffer } from 'moorhen'
import { webGL } from 'moorhen/types/mgWebGL';
import { moorhen } from 'moorhen/types/moorhen';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const GallerySessionLayout: React.FC = () => {
    const dispatch = useDispatch()

    const store = useStore()

    const cootInitialized = useSelector((state: moorhen.State) => state.generalStates.cootInitialized)
    const molecules = useSelector((state: moorhen.State) => state.molecules.moleculeList)
    const maps = useSelector((state: moorhen.State) => state.maps)

    const timeCapsuleRef = useRef<null | moorhen.TimeCapsule>(null)
    const glRef = useRef<webGL.MGWebGL | null>(null)
    const commandCentre = useRef<moorhen.CommandCentre | null>(null)
    const moleculesRef = useRef<moorhen.Molecule[] | null>(null)
    const mapsRef = useRef<moorhen.Map[] | null>(null)
    const activeMapRef = useRef<moorhen.Map | null>(null)
    
    const { galleryId } = useParams()

    const urlPrefix = ""
    const monomerLibraryPath = "https://raw.githubusercontent.com/MRC-LMB-ComputationalStructuralBiology/monomers/master/"
    const sessionUrls: {[key: string]: string} = {
        "1": "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/sessions/gallery-1.pb",
        "2": "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/sessions/gallery-2.pb",
        "3": "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/sessions/gallery-3.pb",
        "4": "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/sessions/gallery-4.pb",
    }

    const loadGallerySession = async (sessionId: string) => {
        if ( !(sessionId in sessionUrls) ) {
            console.warn(`Invalid session ID ${sessionId}, doing nothing...`)
            return
        }

        const url = sessionUrls[sessionId]
        const response = await fetch(url)
        if (response.ok) {
            const sessionArrayBuffer = await response.arrayBuffer()
            await loadSessionFromArrayBuffer(sessionArrayBuffer, monomerLibraryPath, molecules, maps, commandCentre, timeCapsuleRef, glRef, store,  dispatch)
        } else {
            console.warn(`Unable to fetch session data from ${url}`)
        }
    }

    useEffect(() => {
        if (cootInitialized && galleryId) {
            loadGallerySession(galleryId)
        }
    }, [galleryId, cootInitialized])

    const collectedProps = {
        glRef, commandCentre, urlPrefix, timeCapsuleRef, moleculesRef, mapsRef, activeMapRef, monomerLibraryPath
    }

    return <MoorhenContainer {...collectedProps} />
}
