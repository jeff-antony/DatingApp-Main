import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ReceivedRequest = ({ fromIDData, currentUser, setLoading,updateRequests }) => {
  // console.log(fromIDData.sender._id);
  console.log("currentUser", currentUser);
  const [senderData, setSenderData] = useState();
  const [requests, setRequests] = useState([]);
  const [loading, setLoadingState] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    if (fromIDData && fromIDData.sender && fromIDData.sender._id) {
      axios
        .get(`http://localhost:5100/api/auth/user/${fromIDData.sender._id}`)
        .then((res) => {
          setSenderData(res.data);
          setLoadingState(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingState(false);
        });
    }
  }, [fromIDData]);
  console.log(senderData);

//   const handleAccept = async (requestId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5100/api/friend-request/accept/${currentUser}`
//       );
//     } catch (error) {
//       console.error("Failed to accept friend request", error);
//     }
//   };
const handleAccept = async (requestId) => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:5100/api/friend-request/accept/${requestId}`);
      updateRequests(requestId);
    } catch (error) {
      console.error('Failed to accept friend request', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:5100/api/friend-request/reject/${requestId}`
      );
      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error("Failed to reject friend request", error);
    }
  };
  if (loading) {
    return (
      <Card className="my-3 shadow">
        <Card.Body>
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card className="my-3 shadow">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <img
              src={senderData?.profilePic}
              alt="profile"
              className="rounded-circle"
              width="50"
              height="50"
            />
          </div>
          <div className="flex-grow-1 ms-3 d-flex flex-column flex-md-row align-items-md-center">
            <h5 className="me-md-3">
              {senderData?.firstName} {senderData?.lastName}
            </h5>
            <p className="mb-1 me-md-3">Age: {senderData?.age}</p>
            <p className="mb-1">Location: {senderData?.city}</p>
          </div>
          <div className="ms-auto">
            <Button
              variant="success"
              onClick={() => handleAccept(fromIDData._id)}
              className="me-2"
            >
              Accept
            </Button>
            <Button
              variant="danger"
              onClick={() => handleReject(fromIDData._id)}
            >
              Reject
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReceivedRequest;
