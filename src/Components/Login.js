import React, { Fragment, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../App.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { NavLink } from "react-router-dom";
import bg from "../Assets/signup.jpg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setLoginStatus] = useState(false);

  const paperStyle = {
    paddingLeft: 30,
    paddingRight: 35,
    paddingBottom: 10,
    paddingTop: 15,
    height: "420px",
    width: "350px",
    margin: "100px auto",
  };

  const validationSchema = yup.object().shape({
    // name:yup.string().required().min(3,'need minimum 3 characters') ,
    //  email: yup.string().required().email('Invalid email format'),
    password: yup.string().required().min(4, "need minimum 4 characters"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function validateData(e) {
    const newLogin = {
      email,
      password,
    };

    //  https://bbuapkcfe4.execute-api.us-east-1.amazonaws.com/dev/user/login
    try {
      const result = await axios.post(
        `http://localhost:8070/user/login`,
        newLogin
      );
      if (result) {
        localStorage.setItem("token", result.data.user);
        console.log("loginData", result.data.user);
      //  window.location = `/home`;
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  //sso

  const clientId =
    "880771656842-b40n9grv4jsn4gl13s7l4di3m13cm9ha.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope:'',
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = async (response) => {
    
      if (response && !response.errors) {
        const bodyObject = { authId: response.tokenId };

        try{
          const result = await axios.post(
            `http://localhost:8070/user/auth/google/callback`,
            bodyObject
          );
          if (result) {
            localStorage.setItem("token", result.data.user);
            console.log("loginData", result.data.user);
            window.location = `/home`;
          }

        } catch (e) {
      console.log(e);
    }
        
      }
     
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };
  /*
  const responseGoogle = async (response) => {
    console.log("response",response);
    const bodyObject = {  authId: response.tokenId,
    };

    try {
      if (response && !response.errors) {
        //edited
        await axios.post("http://localhost:8070/user/auth/google/callback", bodyObject);
        setLoginStatus(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
   
*/
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        width: "fullWidth",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fragment>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, p: "4 4 4 4" },
            }}
            noValidate
            autoComplete="off"
          >
            <form onSubmit={handleSubmit(validateData)}>
              <Paper elavation={110} style={paperStyle}>
                <div>
                  <center>
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/home"
                      sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "serif",
                        fontSize: 25,
                        fontWeight: 900,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        paddingLeft: 13,
                        paddingTop: 5,
                        paddingBottom: 2,
                      }}
                    >
                      SIGN IN
                    </Typography>
                  </center>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    requiredh
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <br></br>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    required="true"
                    autoComplete="current-password"
                    fullWidth
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div className="invalid">{errors.password?.message}</div>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    style={{
                      display: "flex",
                      paddingTop: 8,
                      marginLeft: "7px",
                      marginRight: "118px",
                      marginTop: 10,
                    }}
                    fullWidth
                  >
                    Submit
                  </Button>
                  <Typography
                    variant="h1"
                    noWrap
                    component="a"
                    href="/home"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "inherit",
                      textDecoration: "none",
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingBottom: 2,
                    }}
                  >
                    Not registered yet? &nbsp;
                    <NavLink
                      className="navbar-item"
                      activeClassName="is-active"
                      to="/add"
                    >
                      Sign Up
                    </NavLink>
                  </Typography>
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                  />
                </div>
              </Paper>
            </form>
          </Box>
        </Fragment>
      </div>
    </div>
  );
}
