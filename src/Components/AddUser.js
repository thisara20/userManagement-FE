import React, { Fragment, useState } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import background from "../Assets/signup.jpg";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3, "need minimum 3 characters"),
    email: yup.string().required().email("Invalid email format"),
    password: yup.string().required().min(4, "need minimum 4 characters"),
  });

  const paperStyle = {
    paddingLeft: 30,
    paddingRight: 35,
    paddingBottom: 25,
    paddingTop: 25,
    height: "450px",
    width: "350px",
    margin: " auto",
  };

  const formOptions = {
    mode: "onTouched",
    reValidateMode: "onTouched",
    resolver: yupResolver(validationSchema),
  };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  const sendData = async (e) => {
    const newUser = {
      name,
      email,
      password,
    };
    const isValid = await validationSchema.isValid(sendData);
    if (isValid) {
      const signup = axios.post(`http://localhost:8070/user/signup` , newUser); //https://bbuapkcfe4.execute-api.us-east-1.amazonaws.com/dev/user/signup"
      if (signup) {
        window.location = `/login`;
        console.log("added",newUser);
      } else { 
      console.log("Error occured");
      //alert("Error occured");
    }
    } else { 
    console.log("Invalid data"); 
    //alert("Invalid data");
  }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
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
              "& .MuiTextField-root": { m: 1, width: "fullWidth" },
            }}
            noValidate
            autoComplete="off"
          >
            <form onSubmit={handleSubmit(sendData)}>
              <Paper elavation={10} style={paperStyle}>
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
                      SIGN UP
                    </Typography>
                  </center>

                  <TextField
                    id="name"
                    label="Name"
                    required
                    fullWidth
                    // className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    {...register("name")}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}

                    //<input placeholder="Jane Doe" id="name" {...register("name")} />

                    //<span className={styles.error}>{errors?.name?.message}</span>

                    // className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    // {...register('name')}
                  />

                  <span className="invalid">
                    {formState.errors?.name?.message}
                  </span>

                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    {...register("email")}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <span className="invalid">
                    {formState.errors?.email?.message}
                  </span>

                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    autoComplete="current-password"
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
                    fullWidth
                    style={{
                      display: "flex",
                      paddingTop: "8px",
                      marginTop: "6px",
                      marginLeft: "7px",
                      marginRight: "118px",
                    }}
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
                      paddingLeft: 8,
                      paddingTop: 5,
                      paddingBottom: 2,
                    }}
                  >
                    Already have an account? &nbsp;
                    <NavLink
                      className="navbar-item"
                      activeClassName="is-active"
                      to="/login"
                    >
                      Sign In
                    </NavLink>{" "}
                  </Typography>
                </div>
              </Paper>{" "}
            </form>
          </Box>{" "}
        </Fragment>
      </div>
    </div>
  );
}
