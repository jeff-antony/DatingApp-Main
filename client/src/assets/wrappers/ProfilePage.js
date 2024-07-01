import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background-color: #fff;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const ChangePhotoButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: #007bff;
  padding: 0;
  &:hover {
    color: #0056b3;
  }
`;

export const FormLabel = styled.label`
  margin-top: 10px;
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  padding: 10px;
  margin-top: 5px;
`;

export const SaveButton = styled(Button)`
  background-color: #000;
  border: none;
  &:hover {
    background-color: #333;
  }
  margin-top: 20px;
`;

export const PhotoUploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export const PhotoUploadWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

export const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

export const RemovePhotoButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  border: none;
  padding: 0 5px;
  &:hover {
    background-color: darkred;
  }
`;
