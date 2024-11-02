import { BrowserRouter,Route,Routes } from "react-router-dom";
import  HomePage  from "./pages/HomePage";
import { NavBar } from "./components/NavBar";
import './index.css';

function App() {
  return(
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App;
