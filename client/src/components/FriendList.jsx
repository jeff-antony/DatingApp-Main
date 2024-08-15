import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from "react-router-dom";

const FriendListItem = styled.div`
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: #e9ecef;
    border-radius: 4px;
  }
`;

const FriendList = ({ onSelectFriend }) => {
  const [friends, setFriends] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5100/api/friend-request/${storedUserId}/friends`);
        setFriends(response.data);
      } catch (error) {
        console.error('Failed to fetch friends', error);
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <>
      <FormControl type="search" placeholder="Search chats" className="mb-3" />
      {Array.isArray(friends) && friends.map(friend => (
        <FriendListItem key={friend._id} onClick={() => onSelectFriend(friend)}>
          <div className="d-flex align-items-center">
            <img
              src={friend.profilePic || `https://via.placeholder.com/50?text=${friend.displayName.charAt(0)}`}
              alt={friend.displayName}
              className="rounded-circle me-2"
              width="50"
              height="50"
            />
            <div>
              <div>{friend.displayName}</div>
            </div>
          </div>
        </FriendListItem>
      ))}
    </>
  );
};

export default FriendList;
