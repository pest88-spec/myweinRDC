import React, { useRef } from 'react';

/** Maximum allowed dimension (width or height) in pixels for uploaded images. */
export const MAX_IMAGE_DIMENSION = 4096;

/**
 * Validates image dimensions against the maximum allowed size.
 * Returns true if both width and height are within the allowed limit,
 * false otherwise.
 *
 * @param {number} width  - Image width in pixels
 * @param {number} height - Image height in pixels
 * @returns {boolean} Whether the dimensions are acceptable
 */
export const validateImageDimensions = (width, height) => {
  return width <= MAX_IMAGE_DIMENSION && height <= MAX_IMAGE_DIMENSION;
};

/**
 * PhotoUploader component provides local file upload (JPEG/PNG only),
 * Base64 conversion via FileReader, dimension validation (width and height ≤ 4096px),
 * and a random photo fetch button.
 *
 * @param {Object} props
 * @param {string|null} props.photoBase64 - Current photo as Base64 data URL or null
 * @param {function} props.onPhotoChange - Callback when a new photo is selected (receives Base64 string)
 * @param {function} props.onFetchRandom - Callback to fetch a random photo from remote service
 */
const PhotoUploader = ({ photoBase64, onPhotoChange, onFetchRandom }) => {
  const fileInputRef = useRef(null);

  /**
   * Handles local file selection. Validates file type (must be image),
   * reads the file as Base64 via FileReader, then validates image dimensions
   * (both width and height must be ≤ 4096 pixels) before calling onPhotoChange.
   */
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const img = new Image();
    const reader = new FileReader();
    reader.onload = (event) => {
      img.onload = () => {
        if (!validateImageDimensions(img.width, img.height)) {
          alert('Image dimensions must not exceed 4096x4096 pixels.');
          return;
        }
        onPhotoChange(event.target.result);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="photo-uploader">
      {photoBase64 ? (
        <img src={photoBase64} alt="Uploaded photo" className="photo-preview" />
      ) : (
        <div className="photo-placeholder">No Photo</div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        aria-label="Upload photo from local file"
      >
        📤 Upload Photo
      </button>
      <button
        onClick={onFetchRandom}
        aria-label="Fetch random photo"
      >
        🎲 Random Photo
      </button>
    </div>
  );
};

export default PhotoUploader;
