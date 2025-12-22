// App.js
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestHooksPage from "./pages/TestHooksPage";
import {Questionspages} from "./pages/Questionspages";
import {Questiondetails} from "./pages/Questiondetails";
function App() {
  
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/test-hooks" element={<TestHooksPage />} />
    //     {/* You can add other routes here */}
    //     <Route
    //       path="/"
    //       element={<h1>Welcome! Go to /test-hooks to test your hooks</h1>}
    //     />
    //   </Routes>
    // </Router>
    <><Questiondetails/></>
  );
}

export default App;
