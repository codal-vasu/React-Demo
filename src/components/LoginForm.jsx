import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [event.target.name]: value,
    }));
  };
  console.log(inputs.userEmail, inputs.password);
  const submitHandler = () => {
    console.log("name:", inputs.userEmail, "password:", inputs.password);
    navigate("/dashboard");
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={Logo} /> Log-in to your account
        </Header>

        <Form
          size="large"
          onSubmit={() => {
            submitHandler();
          }}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
              label="Enter UserEmail"
              labelPosition="left"
              iconPosition="left"
              name="userEmail"
              placeholder="demo@codal.com"
              value={inputs.userEmail || ""}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Form.Input
              fluid
              label="Enter Password"
              icon="lock"
              iconPosition="left"
              placeholder="codal123"
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={(e) => {
                handleChange(e);
              }}
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/new-account">Create New Account</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
