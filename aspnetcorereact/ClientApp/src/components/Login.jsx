import axios from "axios";
import { useContext } from "react";
import { Form as RRForm, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import LoginContext from "../LoginContext";

const Login = () => {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  return (
    <div>
      <Form
        id="login"
        tag={RRForm}
        method="post"
        onSubmit={async (event) => {
          event.preventDefault();
          const credentials = {
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
          };
          var user = await login(credentials);
          localStorage.setItem("token", user.token);
          loginContext.setUser(user);
          navigate("/");
        }}
      >
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="email..."
            type="email"
            className="app-color transparent-on-focus"
            style={{
              color: "white",
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password..."
            type="password"
            className="app-color transparent-on-focus"
            style={{
              color: "white",
            }}
          />
        </FormGroup>
        <Button>Login</Button>
      </Form>
    </div>
  );
};

async function login(body) {
  const resp = await axios.post("api/identity", body);
  const token = resp.data;
  return token;
}

export default Login;
