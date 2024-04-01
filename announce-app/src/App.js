import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from "react";
import Authorize from "./Components/Authorize/Authorize";
import Invite from "./Components/Invite/Invite";
import Protected from "./Components/Protected";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const setThemeLocalStorage = (theme) => {
  
    localStorage.setItem('theme', theme)
    
  }

  const getTheme = () => {
    return localStorage.getItem('theme')
  }

  const authorize = () => {
    setIsAuthorized(true);
  };
  const unauthorize = () => {
    setIsAuthorized(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Protected isAuthorized={isAuthorized}><Invite  dark={getTheme()} updateTheme={(updatedTheme) => setThemeLocalStorage(updatedTheme)}/></Protected>}></Route>
        <Route path="/authorize" element={<Authorize dark={getTheme()} onSuccess={authorize} onFail={unauthorize} updateTheme={(updatedTheme) => setThemeLocalStorage(updatedTheme)}/>}></Route>
      </Routes>
    </Router>    
  );
}
export default App;