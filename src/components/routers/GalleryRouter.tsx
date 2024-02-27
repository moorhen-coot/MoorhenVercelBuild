import { useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export const GalleryRouter: React.FC = () => {
    
    const navigate = useNavigate()

    const images = [
        {
          original: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-1.png",
          thumbnail: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-1.png",
          originalClass: 'moorhen-gallery-img'
        },
        {
          original: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-2.png",
          thumbnail: "https://raw.githubusercontent.com/moorhen-coot/gallery-sessions/main/images/gallery-2.png",
          originalClass: 'moorhen-gallery-img'
        },
    ];

    const handleSessionLoad = (currentIndex: number) => {
        navigate(`/gallery/${currentIndex + 1}`)
    }

    return <div style={{display: 'flex', justifyContent: 'center', width: '100wh'}}>
        <ImageGallery
            items={images}
            infinite={true}
            showNav={true}
            showPlayButton={true}
            showBullets={true}
            showIndex={true}
            showThumbnails={true}
            thumbnailPosition="bottom"
            showFullscreenButton={true}
            useBrowserFullscreen={true}
            slideDuration={1000}
            onPlay={handleSessionLoad}
            />
        </div>
}
