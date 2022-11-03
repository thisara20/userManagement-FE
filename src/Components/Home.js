import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import bg from "../Assets/blueImg.jpg";
import ResponsiveAppBar from "./Header";
import Box from "@mui/material/Box";

export default function AllUsers() {
  const [UserData, setUserData] = useState([]);
  const paperStyle = { padding: 80, width: "450px", margin: "90px auto" };
  const bgi = { backgroundImage: `url(${bg})`, width: "fullWidth" };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:8070/user/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //  const  logout =() => {
  //  localStorage.removeItem('token');
  //window.location ='/login'
  //}

  return (
    <Fragment>
      <Box
        style={{
          backgroundImage: `url(${bg})`,
          width: "fullWidth",
          height: "fullHeight",
        }}
      >
        <ResponsiveAppBar />
        <TableContainer component={Paper} elavation={10} style={paperStyle}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "25px",
                    fontFamily: "Bungee Inline",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                    padding: 4,
                  }}
                >
                  Name
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "25px",
                    fontFamily: "Bungee Inline",
                    fontWeight: 1000,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                    align: "right",
                    paddingLeft: 7,
                  }}
                >
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {UserData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontSize: "20px",
                      fontFamily: "Bungee Inline",
                      fontWeight: 500,
                      color: "inherit",
                      textDecoration: "none",
                      align: "right",
                      paddingLeft: 5,
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "20px",
                      fontFamily: "Bungee Inline",
                      fontWeight: 500,
                      color: "inherit",
                      textDecoration: "none",
                      align: "right",
                      paddingLeft: 5,
                    }}
                  >
                    {row.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
      </Box>
    </Fragment>
  );
}
