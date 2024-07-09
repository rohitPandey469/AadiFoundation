import React from "react";

const Login = ({ setUserData }) => {
  const handleLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information.... ");
          window.FB.api("/me", function (response) {
            setUserData(response);
            console.log("Good to see you, " + response.name + ".");
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" } //Whatever permissions needed
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color:"grey",
          padding:"1rem"
        }}
      >
        <h2>Hello, Welcome Back...</h2>
      </div>
      <button
        title="Login with facebook"
        style={{
          padding: "0.8rem 1.2rem",
          border: "None",
          backgroundColor: "ButtonShadow",
          fontWeight: "600",
          borderRadius: ".2rem",
          cursor: "pointer",
          alignSelf: "center",
        }}
        onClick={handleLogin}
      >
        Login with Facebook
      </button>
    </div>
  );
};

export default Login;
