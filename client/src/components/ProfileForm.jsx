import React from 'react'
import { Form,Button } from 'react-bootstrap';
import { ProfileContainer,ProfileImageWrapper,
    ProfileImage,
    ChangePhotoButton,
    FormLabel,
    FormTextarea,
    SaveButton,PhotoUploadContainer,
    PhotoUploadWrapper,
    UploadedImage,
    RemovePhotoButton } from '../assets/wrappers/ProfilePage';
    import { useState } from 'react';
    import { toast } from'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import avatar1 from '../assets/images/avatar1.jpg'

const ProfileForm = () => {

    const [photos, setPhotos] = useState([]);

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files);
    if (photos.length + files.length <= 6) {
      const newPhotos = files.map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    } else {
      alert('You can only upload up to 6 photos.');
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <>
     <ProfileContainer>
      
      <ProfileImageWrapper>
        <ProfileImage src={avatar1} alt="Profile" />
        <ChangePhotoButton>Change profile photo</ChangePhotoButton>
      </ProfileImageWrapper>
      <Form>
        <Form.Group controlId="formUsername">
          <FormLabel className="mb-2">Username</FormLabel>
          <Form.Control type="text" placeholder="@username123" />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <FormLabel className="mb-2">Email</FormLabel>
          <Form.Control type="email" placeholder="email@domain.com" />
        </Form.Group>
        <Form.Group controlId="formURLs">
          <FormLabel className="mb-2">Personal Information</FormLabel>
          <Form.Control type="text" placeholder="Education" />
          <Form.Control type="text" placeholder="Professional" className="mt-2" />
          <Form.Control type="text" placeholder="website.town" className="mt-2" />
          
        </Form.Group>
        <Form.Group controlId="formBio">
          <FormLabel className="mb-2">Bio</FormLabel>
          <FormTextarea placeholder="I am a designer based in Philadelphia, making great software at Figma." />
        </Form.Group>
        <Form.Group controlId="formPhotos">
          <FormLabel className="mb-2">Photos</FormLabel>
          <Form.Control type="file" accept="image/*" multiple onChange={handlePhotoChange} />
          <PhotoUploadContainer>
            {photos.map((photo, index) => (
              <PhotoUploadWrapper key={index}>
                <UploadedImage src={photo} alt={`Uploaded ${index + 1}`} />
                <RemovePhotoButton onClick={() => handleRemovePhoto(index)}>X</RemovePhotoButton>
              </PhotoUploadWrapper>
            ))}
          </PhotoUploadContainer>
        </Form.Group>
        <SaveButton type="submit">Save changes</SaveButton>
      </Form>
    </ProfileContainer>
    </>
  )
}

export default ProfileForm