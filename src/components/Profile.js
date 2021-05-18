import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../Profile.css'
import Card from 'react-bootstrap/Card';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className='profile-container'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={user.picture} alt={user.name} />
          <Card.Body>
            <Card.Title><h2>{user.name}</h2></Card.Title>
            <Card.Text>
              <p>{user.email}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  );
};

export default Profile;