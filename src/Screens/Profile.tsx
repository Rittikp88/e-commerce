import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

type RootState = {
    auth: {
      user: {
        // username: string;
        // accessToken: string;
        _id: string;
        password: string;
        // roles: string[];
      };
    };
    // Add other slices and their state properties as needed
  };

const Profile = () => {
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    console.log(currentUser)
  
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    const {password } = currentUser
  
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.password}</strong> Profile
          </h3>
        </header>
        {/* <p> */}
          {/* <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Idsdfdf:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Emailsdf:</strong> {currentUser.email}
        </p>
        <strong>Authoritiesmbn:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
      </div>
    );
  };
  
  export default Profile;