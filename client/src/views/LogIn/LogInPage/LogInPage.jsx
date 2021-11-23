import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//style import;
import style from "./LogInPage.module.css";
//component import
import SignInForm from "../SignInForm/SignInForm.jsx";
import SignUpForm from "../SignUpForm/SignUpForm.jsx";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const SignInPage = () => {
  const authState = useSelector((state) => state.auth);
  const [mode, setMode] = useState("signIn");
  const cardHeight = mode === "signIn" ? "400px" : "500px";
  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: "300px",
          height: "100vh",
          maxHeight: cardHeight,
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-around",
        }}
      >
        {authState.loading ? (
          <>Logging you in...</>
        ) : mode === "signIn" ? (
          <>
            <CardHeader
              title={"Sign In"}
              titleTypographyProps={{ variant: "h4", textAlign: "center" }}
            />
            <CardContent>
              <SignInForm />
            </CardContent>
            <Box sx={{ padding: "1em", alignSelf: "flex-end" }}>
              Not a member ? Sign up{" "}
              <a
                role="button"
                onClick={() => {
                  setMode("signUp");
                }}
              >
                here
              </a>
            </Box>
          </>
        ) : (
          <>
            <CardHeader
              title={"Sign In"}
              titleTypographyProps={{ variant: "h4", textAlign: "center" }}
            />
            <CardContent>
              <SignUpForm />
            </CardContent>
            <Box sx={{ padding: "1em", alignSelf: "flex-end" }}>
              Already a member ? Sign in{" "}
              <a
                role="button"
                onClick={() => {
                  setMode("signIn");
                }}
              >
                here
              </a>
            </Box>
          </>
        )}
      </Card>
    </Container>
  );
};

export default SignInPage;
