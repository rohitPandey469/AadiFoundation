import React, { useState } from "react";
import Login from "./Components/Login";
import PageInsights from "./Components/PageInsights";

const App = () => {
  const [userData, setUserData] = useState(null);

  return (
    <body>
      <div
        style={{
          maxWidth: "640px",
          width: "100%",
          padding: "1rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        {!userData ? (
          <Login setUserData={setUserData} />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              color: "grey",
            }}
          >
            <h1>Hi, {userData.name}!</h1>
            <p style={{ fontWeight: "600" }}>Good to see you...</p>
            <p
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "1px solid grey",
                overflow: "hidden",
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                title={userData?.picture?.data.url || "No Profile Image"}
                src={
                  userData?.picture?.data.url ||
                  "https://gravatar.com/avatar/4c8b4e6f6d18696f3a0deaeb21cd37f7?s=400&d=robohash&r=x"
                }
                alt="Profile"
              />
            </p>
            <PageInsights />
          </div>
        )}
      </div>
    </body>
  );
};

export default App;
