import {BrowserRouter, Routes, Route} from "react-router-dom"
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import LoginUser from "./components/LoginUser";
import SignupUser from "./components/SignupUser";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NoteList/>}/>
      <Route path="add" element={<AddNote/>}/>
      <Route path="edit/:id" element={<EditNote/>}/>
      <Route path="login" element={<LoginUser/>}/>
      <Route path="signup" element={<SignupUser/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
