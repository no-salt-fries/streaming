import React from "react";

const App = () => {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Progressive Streaming Audio</h1>
        <audio
          controls
          src="http://localhost:3001/audio"
          style={{ width: "80%", maxWidth: "600px" }}
        />
      </div>
    </>
  );
};

export default App;
