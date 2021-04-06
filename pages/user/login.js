import React from "react";
import Login from "../../components/Login";
function User({user, setUser}) {
  return (
    <div>
      <Login user={user} setUser={setUser} />
    </div>
  );
}

export default User;
