
import { IKImage } from "imagekitio-react"
import React from "react"
const ImageKit = (url, src, className, w, h, description) => {

    return(
        <IKImage 
            urlEndpoint={url} 
            path={src} 
            className={className}
            alt={description} 
            width={w}
            height={h}
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
        />
    )
}
export default ImageKit