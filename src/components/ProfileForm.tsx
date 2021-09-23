import React, { useState } from "react";
import type { User } from "../features/users/usersSlice";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { api } from "../app/api";

function ProfileForm({
  user,
  setUser,
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}) {
  const [isValidated, setIsValidated] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  const saveProfile = async () => {
    if (!user) return;

    const response = await api(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      setHasUpdated(true);
      setTimeout(() => setHasUpdated(false), 3000);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      saveProfile();
    }

    setIsValidated(true);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    user &&
      setUser({
        ...user,
        username: event.target.value,
      });
  };
  return (
    <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
      <Row className="mb-3 gy-3">
        <Form.Group as={Col} md="4" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            defaultValue={user.name}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            defaultValue={user.email}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="username">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              value={user.username}
              onChange={handleUsernameChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3 gy-3">
        <Form.Group as={Col} md="3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            required
            disabled
            defaultValue={user.address.city}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street"
            required
            defaultValue={user.address.street}
            disabled
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid street.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="suite">
          <Form.Label>Suite</Form.Label>
          <Form.Control
            type="text"
            placeholder="Suite"
            required
            disabled
            defaultValue={user.address.suite}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid suite.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zip"
            required
            disabled
            defaultValue={user.address.zipcode}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 gy-3">
        <Form.Group as={Col} md="3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            required
            type="tel"
            placeholder="Phone"
            defaultValue={user.phone}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="website">
          <Form.Label>Website</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Website"
            defaultValue={user.website}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="lat">
          <Form.Label>Lat</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Lat"
            defaultValue={user.address.geo.lat}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="Lng">
          <Form.Label>Lng</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Lng"
            defaultValue={user.address.geo.lng}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 gy-3">
        <Form.Group as={Col} md="4" controlId="companyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Company Name"
            defaultValue={user.company.name}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="companyCatchPhrase">
          <Form.Label>Company Catch Phrase</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Company Catch Phrase"
            defaultValue={user.company.catchPhrase}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="companyBs">
          <Form.Label>Bs</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Bs"
            defaultValue={user.company.bs}
            disabled
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Save</Button> {hasUpdated && <span>Updated</span>}
    </Form>
  );
}

export default ProfileForm;
