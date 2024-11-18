import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');
  
  const CLOUD_NAME = "da8v3uc6w";
  const UPLOAD_PRESET = "car-app";

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Reset states
    setError('');
    setUploadedUrl('');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      setUploadedUrl(response.data.secure_url);
      
      // If you need to save the URL to your backend
      // await axios.post('your-backend-url/save-image', {
      //   imageUrl: response.data.secure_url
      // });
      
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="space-y-4">
        {/* File Input */}
        <div>
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*"
            disabled={loading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center justify-center text-blue-600">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Uploading...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                clipRule="evenodd" 
              />
            </svg>
            {error}
          </div>
        )}

        {/* Success Preview */}
        {uploadedUrl && (
          <div className="space-y-2">
            <div className="flex items-center text-green-600 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              Upload successful!
            </div>
            <img 
              src={uploadedUrl} 
              alt="Uploaded preview" 
              className="max-w-full rounded-md shadow-md"
            />
            <input 
              type="text" 
              value={uploadedUrl} 
              readOnly 
              className="w-full p-2 text-sm border rounded-md bg-gray-50"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;