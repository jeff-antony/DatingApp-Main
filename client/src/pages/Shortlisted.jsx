import React from 'react';
import { Container, Row, Col, Image  } from 'react-bootstrap';
import styled from 'styled-components';
import { AiOutlineHeart, AiOutlineClose, AiFillHeart } from 'react-icons/ai';
import { MdHome, MdEco, MdPalette, MdPeople, MdChat } from 'react-icons/md';
import { useState } from 'react';


const initialData = [
    { id: 1, name: 'Afrin Sabila', message: 'Life is beautiful', emoji: '👌', img: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Adil Adnan', message: 'Be your own hero', emoji: '💪', img: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Bristy Haque', message: 'Keep working', emoji: '✍', img: 'https://via.placeholder.com/50' },
    { id: 4, name: 'John Borino', message: 'Make yourself proud', emoji: '😊', img: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Borsha Akther', message: 'Flowers are beautiful', emoji: '🌸', img: 'https://via.placeholder.com/50' },
    { id: 6, name: 'sheik Sadi', message: 'Life is beautiful', emoji: '👌', img: 'https://via.placeholder.com/50' }
  ];

  const StyledContainer = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .person-row {
    display: flex;
    align-items: center;
    padding: 18px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .person-initial {
    font-size: 24px;
    font-weight: bold;
    color: #6c757d;
  }

  .person-details {
    flex-grow: 1;
  }

  .name {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .message {
    color: #6c757d;
  }

  .emoji {
    margin-left: 5px;
  }

  .person-actions {
    display: flex;
    gap: 5px;
  }

  .action-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #6c757d;
  }

  .action-btn:hover {
    color: #000;
  }

  @media (max-width: 768px) {
    .person-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .person-initial {
      margin-bottom: 10px;
    }

    .person-actions {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  bottom: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  font-size: 24px;
  color: #b28b8b;

  &:hover {
    color: #000;
  }
`;

// const NavItem = styled.div`
//   color: #B1B1B1; // Inactive color
//   &.active {
//     color: #6741D9; // Active color
//   }
// `;

const Shortlisted = () => {

    const [data, setData] = useState(initialData);
    const [liked, setLiked] = useState(initialData.map(() => false));

    const handleLike = (index) => {
        const newLiked = [...liked];
        newLiked[index] = !newLiked[index];
        setLiked(newLiked);
      };
    
      const handleRemove = (id) => {
        const newData = data.filter(person => person.id !== id);
        setData(newData);
        setLiked(newLiked => newLiked.filter((_, i) => data[i].id !== id));
      };

  return (
    <>
    <StyledContainer>
      <Container>
        <Row>
          <Col>
            <h2>Shortlist</h2>
          </Col>
        </Row>
        {data.map((person, index) => (
          <Row key={index} className="person-row">
            <Col xs={2} className="person-initial">
              <Image src={person.img} roundedCircle />
            </Col>
            <Col xs={8} className="person-details">
              <div className="name">{person.name}</div>
              <div className="message">
                {person.message} <span className="emoji">{person.emoji}</span>
              </div>
            </Col>
            <Col xs={2} className="person-actions">
            <button className="action-btn" onClick={() => handleLike(index)}>
                {liked[index] ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />}
              </button>
              <button className="action-btn" onClick={() => handleRemove(person.id)}>
                <AiOutlineClose />
              </button>
            </Col>
          </Row>
        ))}
      </Container>
      <BottomNav>
      <NavItem className="active"><MdHome size={24} /></NavItem>
      <NavItem><MdEco size={24} /></NavItem>
      <NavItem><MdPalette size={24} /></NavItem>
      <NavItem><MdPeople size={24} /></NavItem>
      <NavItem><MdChat size={24} /></NavItem>
    </BottomNav>
    </StyledContainer>

    </>
  )
}

export default Shortlisted