import React, { useState } from 'react';

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file)

        const res = await fetch('http://localhost:7000/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setImageUrl(data.imageUrl);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Upload Image</h2>
            <div className="mb-3">
                <input type="file" onChange={handleFileChange} />
            </div>
            <button className="btn btn-primary" onClick={handleUpload}>
                Upload
            </button>
            {imageUrl && (
                <div className="mt-4">
                    <h3>Uploaded Image:</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
