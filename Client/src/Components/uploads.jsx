import { IKUpload, IKContext } from 'imagekitio-react';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';


const authenticator =  async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/auth`);

        if (!response.ok) {
            const errorText = await response.text();
            console.log(`Error Message: ${errorText}`)
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        const { signature, expire, token } = data;
        
        return { signature, expire, token };
    } catch (error) {
        console.log(`Authentication request failed: ${error.message}`)
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};



function Uploads({children, type, setProgress, setData}) {

    const ref = useRef(null)

    const onError = err => {
        console.log("Error", err);
        toast.error("Image Upload Failed");
    };

    const onSuccess = res => {
        console.log(res)
        setData(res)
        toast.success("Image Uploaded Successfully")
    };

    const onUploadProgress = progress => {
        setProgress(Math.floor(progress.loaded / progress.total) * 100)
    };

    const onUploadStart = evt => {
        toast.info("Uploading Image...");
    };
      

    return (
        <IKContext publicKey={import.meta.env.VITE_IK_PUBLIC_KEY} urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} authenticator={authenticator} >
            <IKUpload
                useUniqueFileName
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                className='hidden'
                ref={ref}
                accept={`${type}/*`}
            />

            <div className='cursor-pointer' onClick={()=>ref.current.click()}>{children}</div>
        </IKContext>

        
    )
}

export default Uploads