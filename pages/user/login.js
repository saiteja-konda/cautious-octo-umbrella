import React from "react";
import Login from "../../components/Authentication/Login";
function User({user, setUser}) {
  return (
    <div>
      <Login user={user} setUser={setUser} />
    </div>
  );
}

export default User;
