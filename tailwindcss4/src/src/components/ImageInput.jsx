import React, { useState, useRef } from 'react';
import { ImagePlus } from 'lucide-react'; // Importing image upload icon
import Tesseract from 'tesseract.js';

const ImageInput = ({ onExtractedText }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => console.log(m),
      });
      onExtractedText(result.data.text);
    } catch (error) {
      console.error('OCR Error:', error);
    }

    setLoading(false);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleIconClick} className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white">
        <ImagePlus size={28} />
      </button>
      {loading && <p className="text-sm text-gray-500 mt-2">Processing image...</p>}
    </div>
  );
};

export default ImageInput;
