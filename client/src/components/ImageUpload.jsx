import { useState, useRef } from 'react';
import { analyzeImage } from '../services/api';

function ImageUpload({ onItemsIdentified, setLoading }) {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!fileInputRef.current.files[0]) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeImage(fileInputRef.current.files[0]);
      onItemsIdentified(result.items);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input
          ref={fileInputRef}
          type="file"
          className="file-input"
          accept="image/*"
          onChange={handleChange}
          capture="environment"
        />

        {!preview ? (
          <div
            className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
            onClick={() => fileInputRef.current.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-icon">📸</div>
            <div className="upload-text">
              <h3>Upload Fridge Photo</h3>
              <p>Drag and drop or click to select an image</p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>
                Supported formats: JPG, PNG, WEBP
              </p>
            </div>
          </div>
        ) : (
          <div className="image-preview">
            <img src={preview} alt="Fridge preview" />
            <div className="button-group">
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  fileInputRef.current.value = '';
                }}
                className="btn btn-secondary"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={handleAnalyze}
                className="btn btn-primary"
              >
                Analyze Ingredients
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default ImageUpload;
