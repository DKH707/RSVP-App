import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Authorize from "./Components/Authorize/Authorize";
import Invite from "./Components/Invite/Invite";
import Protected from "./Components/Protected";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const authorize = () => {
    setIsAuthorized(true);
  };
  const unauthorize = () => {
    setIsAuthorized(false);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authorize/>}></Route>
        <Route path="/authorize" element={<Authorize/>}></Route>
        <Route path="/invite" element={<Protected isAuthorized={isAuthorized}><Invite/></Protected>}></Route>
      </Routes>
    </Router>    
  );
}
export default App;