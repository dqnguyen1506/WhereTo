import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Dung Nguyen",
      image:
        "https://i.insider.com/5c20d8ee01c0ea245970caa3?width=1136&format=jpeg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
