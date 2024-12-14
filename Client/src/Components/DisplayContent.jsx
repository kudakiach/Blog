import React from 'react'
import DOMPurify from 'dompurify'

const DisplayContent = ({content}) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return (
    <div dangerouslySetInnerHTML={{__html: sanitizedContent}}></div>
    )
}

export default DisplayContent