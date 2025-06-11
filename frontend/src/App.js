import {BrowserRouter, Routes, Route} from "react-router-dom"
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import LoginUser from "./components/LoginUser";
import SignupUser from "./components/SignupUser";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <NoteList/>
          </ProtectedRoute>
        }/>
        <Route path="add" element={
          <ProtectedRoute>
            <AddNote/>
          </ProtectedRoute>
        }/>
        <Route path="edit/:id" element={
          <ProtectedRoute>
            <EditNote/>
          </ProtectedRoute>
        }/>
        <Route path="login" element={<LoginUser/>}/>
        <Route path="signup" element={<SignupUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
