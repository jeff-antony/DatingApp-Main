import React, { useState } from 'react';
import { Button, Form, Row, Col, Image } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const StyledForm = styled(Form)`
  margin: 20px;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PhotoUploads = ({ userId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(`/api/users/${userId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful', response.data);
    } catch (error) {
      console.error('Error uploading photos', error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Upload Photos (up to 6)</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
          disabled={selectedFiles.length >= 6}
        />
      </Form.Group>
      <ImagePreview>
        {previews.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`preview ${index}`}
            thumbnail
            style={{ width: '150px', height: '150px' }}
          />
        ))}
      </ImagePreview>
      <Button variant="primary" type="submit" disabled={selectedFiles.length === 0}>
        Upload Photos
      </Button>
    </StyledForm>
  );
};

export default PhotoUploads;
