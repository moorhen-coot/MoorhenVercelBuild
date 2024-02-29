import { useNavigate } from "react-router-dom";
import { Gallery } from "react-grid-gallery";
import Modal from '@mui/material/Modal';
import { useCallback, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { PlayCircleOutlined } from '@mui/icons-material';

export const GalleryRouter: React.FC = () => {
    
    const navigate = useNavigate()

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
    ];

    // FIXME: We need more images here...
    imageData = [ ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData, ...imageData ]

    const images = imageData.map(image => {
      return { src: image.src, width: image.originalWidth, height: image.originalHeight }
    })

    const handleSessionLoad = useCallback(() => {
        navigate(imageData[imageIndex].sessionUrl)
    }, [imageIndex])

    const handleFigureClick = (currentIndex: number) => {
      setImageIndex(currentIndex)
      setShowModal(true)
    }

    return <div style={{width: '100w', display: 'flex', justifyContent: "center"}}>
        <div style={{width: '99vw', overflowX: 'hidden', overflowY: 'auto'}}>
          <Gallery images={images} enableImageSelection={false} onClick={handleFigureClick}/>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{backdropFilter: "blur(5px)"}}>
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
              position: 'absolute',
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
