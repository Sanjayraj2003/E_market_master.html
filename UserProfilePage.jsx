import React from "react";

import Navbar from "../components/Navbar";
import UserProfile from "../containers/UserProfile";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Profile</h1>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
};

export default UserProfilePage;
