import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {
  ProfileContainer,
  ProfileImageWrapper,
  ProfileImage,
  ChangePhotoButton,
  FormLabel,
  FormTextarea,
  SaveButton,
  PhotoUploadContainer,
  PhotoUploadWrapper,
  UploadedImage,
  RemovePhotoButton,
} from '../assets/wrappers/ProfilePage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar1 from '../assets/images/avatar1.jpg';
import { useParams } from 'react-router-dom';

const ProfileForm = () => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    city: '',
    bio: '',
    state: '',
    district: '',
    professional: '',
    qualification: '',
    hobbies: '',
    photos: [],
    profilePic:''
    
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5100/api/dashboard/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        axios.get(`http://localhost:5100/api/users/${userId}/photos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        setProfile({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          city: response.data.city,
          bio: response.data.bio,
          state: response.data.state,
          district: response.data.district,
          professional: response.data.professional,
          qualification: response.data.qualification,
          hobbies: response.data.hobbies,
          photos: response.data.photos || [],
          profilePic: response.data.profilePic
        });
        setPhotos(response.data.photos || []);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, [userId]);

  // const handlePhotoChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   if (photos.length + files.length <= 6) {
  //     const newPhotos = files.map((file) => URL.createObjectURL(file));
  //     setPhotos([...photos, ...newPhotos]);
  //   } else {
  //     alert('You can only upload up to 6 photos.');
  //   }
  // };
  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files);
    if (photos.length + files.length <= 6) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPhotos([...photos, ...newPreviews]);
      setSelectedFiles([...selectedFiles, ...files]);
    } else {
      alert('You can only upload up to 6 photos.');
    }
  };

  // const handleRemovePhoto = (index) => {
  //   setPhotos(photos.filter((_, i) => i !== index));
  // };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5100/api/dashboard/update-profile',
        {
          ...profile,
          // photos,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Upload new photos
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('photos', file);
      });

      
      await axios.post(`http://localhost:5100/api/upload/photos/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
     
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <ProfileContainer>
        <ProfileImageWrapper>
          <ProfileImage src={profile.profilePic} alt="Profile" />
          <ChangePhotoButton>Change profile photo</ChangePhotoButton>
        </ProfileImageWrapper>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstname">
                <FormLabel className="mb-2">First Name</FormLabel>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLastname">
                <FormLabel className="mb-2">Last Name</FormLabel>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDistrict">
                <FormLabel className="mb-2">District</FormLabel>
                <Form.Control
                  type="text"
                  name="district"
                  value={profile.district}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <FormLabel className="mb-2">City</FormLabel>
                <Form.Control
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                />
              </Form.Group>
              
            </Col>
            <Col md={6}>
            <Form.Group controlId="formState">
                <FormLabel className="mb-2">State</FormLabel>
                <Form.Control
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formHobbies">
                <FormLabel className="mb-2">Hobbies</FormLabel>
                <Form.Control
                  type="text"
                  name="hobbies"
                  value={profile.hobbies}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formQualification">
                <FormLabel className="mb-2">Qualification</FormLabel>
                <Form.Control
                  type="text"
                  name="qualification"
                  value={profile.qualification}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formProfessional">
                <FormLabel className="mb-2">Professional</FormLabel>
                <Form.Control
                  type="text"
                  name="professional"
                  value={profile.professional}
                  onChange={handleChange}
                />
              </Form.Group>
              </Col>
              <Form.Group controlId="formBio">
                <FormLabel className="mb-2">Bio</FormLabel>
                <FormTextarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="I am a designer based in Philadelphia, making great software at Figma."
                />
              </Form.Group>
              <Form.Group controlId="formPhotos">
                <FormLabel className="mb-2">Photos</FormLabel>
                <Form.Control 
                type="file"
                 accept="image/*" 
                 multiple onChange={handlePhotoChange} />

                <PhotoUploadContainer>
                  {photos.map((photo, index) => (
                    <PhotoUploadWrapper key={index}>
                      <UploadedImage src={photo} alt={`Uploaded ${index + 1}`} />
                      <RemovePhotoButton onClick={() => handleRemovePhoto(index)}>X</RemovePhotoButton>
                    </PhotoUploadWrapper>
                  ))}
                </PhotoUploadContainer>
              </Form.Group>
            
          </Row>
          <SaveButton type="submit">Save changes</SaveButton>
        </Form>
      </ProfileContainer>
    </>
  );
};

export default ProfileForm;
