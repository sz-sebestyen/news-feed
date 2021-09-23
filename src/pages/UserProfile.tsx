import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUserById } from "../features/users/usersSlice";
import Container from "react-bootstrap/Container";
import ProfileForm from "../components/ProfileForm";

function UserProfile() {
  const defaultUser = useUser();

  const [user, setUser] = useState<typeof defaultUser>();

  useEffect(() => setUser(defaultUser), [defaultUser]);

  return (
    <Container>
      <h2 className="my-3">Profile</h2>
      {user && <ProfileForm user={user} setUser={setUser} />}
    </Container>
  );
}

interface UserParams {
  userId: string;
}

function useUser() {
  const { userId } = useParams<UserParams>();

  return useAppSelector((state) => selectUserById(state, userId));
}

export default UserProfile;
