import { Gallery } from "react-grid-gallery";
import { useCallback, useState } from "react";
import { Box, IconButton, Typography, Modal } from "@mui/material";
import { PlayCircleOutlined } from '@mui/icons-material';

export const GalleryLayout: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const [imageIndex, setImageIndex] = useState<number>(0)

    let imageData = [
      {
        src: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-1.png",
        sessionUrl: "/gallery/1",
        originalWidth: 4096, 
        originalHeight: 2116,
        onClickWidth: 409,
        onClickHeight: 211,
        tryItButtonTextColour: 'white',
        title: "Lore ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim, nisl non feugiat viverra, justo ex pharetra mauris, vel iaculis nisi mi non nulla. Proin vestibulum nisl at vulputate vestibulum. Proin commodo urna vitae elit aliquam porta. Pellentesque metus erat, posuere non volutpat vitae, tincidunt eget est. Mauris egestas sed ipsum vitae aliquet. Integer in augue porta, gravida nulla eu, laoreet orci. Vivamus placerat, nisl et commodo blandit, lectus dui imperdiet nibh, in volutpat sem leo a augue. Nunc auctor sem id arcu tempus, eu ornare dui aliquam. Curabitur imperdiet tellus id quam posuere, eu volutpat magna pulvinar. Vivamus aliquam, nibh sit amet venenatis blandit, mi tortor commodo libero, in volutpat neque nibh in diam."
      },
      {
        src: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-2.png",
        sessionUrl: "/gallery/2",
        originalWidth: 4096, 
        originalHeight: 2116,
        onClickWidth: 409,
        onClickHeight: 211,
        tryItButtonTextColour: 'white',
        title: "Lore ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim, nisl non feugiat viverra, justo ex pharetra mauris, vel iaculis nisi mi non nulla. Proin vestibulum nisl at vulputate vestibulum. Proin commodo urna vitae elit aliquam porta. Pellentesque metus erat, posuere non volutpat vitae, tincidunt eget est. Mauris egestas sed ipsum vitae aliquet. Integer in augue porta, gravida nulla eu, laoreet orci. Vivamus placerat, nisl et commodo blandit, lectus dui imperdiet nibh, in volutpat sem leo a augue. Nunc auctor sem id arcu tempus, eu ornare dui aliquam. Curabitur imperdiet tellus id quam posuere, eu volutpat magna pulvinar. Vivamus aliquam, nibh sit amet venenatis blandit, mi tortor commodo libero, in volutpat neque nibh in diam."
      },
      {
        src: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-3.png",
        sessionUrl: "/gallery/3",
        originalWidth: 2890, 
        originalHeight: 1860,
        onClickWidth: 289,
        onClickHeight: 186,
        tryItButtonTextColour: 'white',
        title: "NEAT domain from Staphylococcus aureus in complex with heme",
        description: <>
         PDB code: <a href="https://www.rcsb.org/structure/2Z6F">2Z6F</a>.
        </>
      },
      {
        src: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-4.png",
        sessionUrl: "/gallery/4",
        originalWidth: 4096, 
        originalHeight: 2264,
        onClickWidth: 409,
        onClickHeight: 226,
        tryItButtonTextColour: 'white',
        title: "Human serotonin 5-HT3A receptor in complex with vortioxetine",
        description: <>
         PDB code: <a href="https://www.rcsb.org/structure/8BLA">8BLA</a>.
        </>
      },
      {
        src: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-5.png",
        sessionUrl: "/gallery/5",
        originalWidth: 8096, 
        originalHeight: 4264,
        onClickWidth: 409,
        onClickHeight: 226,
        tryItButtonTextColour: 'grey',
        title: "Zebrafish IRF-10 DBD complex with DNA",
        description: <>
         PDB code: <a href="https://www.rcsb.org/structure/8HCL">8HCL</a>.
        </>
      },
    ];

    // FIXME: We need more images here...
    // this reproduce multiple images

    // imageData = [ ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData ]
   
    imageData = [ ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData ]
    const images = imageData.map(image => {
      return { src: image.src, width: image.originalWidth, height: image.originalHeight }
    })

    const handleSessionLoad = useCallback(() => {
        window.location.href = imageData[imageIndex].sessionUrl as string
    }, [imageIndex])

    const handleFigureClick = (currentIndex: number) => {
      setImageIndex(currentIndex)
      setShowModal(true)
    }

    return <div style={{width: '100w', display: 'flex', justifyContent: "center"}}>
        <div style={{width: '99vw', overflowX: 'hidden', overflowY: 'auto'}}>
          <Gallery images={images} enableImageSelection={false} onClick={handleFigureClick}/>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{color: 'black', backdropFilter: "blur(5px)"}}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50wh',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            borderRadius: '1rem',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
            p: 4
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {imageData[imageIndex].title}
        </Typography>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <img src={imageData[imageIndex].src} style={{width: imageData[imageIndex].onClickWidth, height: imageData[imageIndex].onClickHeight}}/>
            <IconButton onClick={handleSessionLoad} style={{
              // absolute
              position: 'absolute',
              top: 50,
              right:50,
              width: imageData[imageIndex].onClickWidth,
              height: imageData[imageIndex].onClickHeight,
              color: imageData[imageIndex].tryItButtonTextColour,
            }}>
              <PlayCircleOutlined style={{width: '100px', height: '100px'}}/>
            </IconButton>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {imageData[imageIndex].description}
          </Typography>
        </Box>
        </Modal>
      </div>
}
