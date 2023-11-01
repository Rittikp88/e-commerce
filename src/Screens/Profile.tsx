import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  if (!user) {
    return <Navigate to="/login" />;
  }


  const { name, email, role, _id } = user?.user?.user || {};

  console.log(user.user.user)

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{name}</strong> Profile
        </h3>
      </header>
      <p>
        {/* <strong>Token:</strong> {user.accessToken.substring(0, 20)} ...{" "}
        {user.accessToken.substr(user.accessToken.length - 20)} */}
      </p>
      <p>
        <strong>Id:</strong> {_id}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {/* {role &&
          role.map((role: string, index:number) => <li key={index}>{role}</li>)} */}

        {role}
      </ul>
    </div>
  );
};

export default Profile;