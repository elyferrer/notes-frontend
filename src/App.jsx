import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";

import Login from './features/users/Login';
import PrivateRoutes from './features/components/PrivateRoutes';
import Home from './features/users/Home';
import { getUserDetails } from './features/users/userSlice';
import CategoryHome from './features/categories/CategoryHome';
import Notes from './features/notes/Notes';
import NoteDetails from './features/notes/NoteDetails';

function App() {
  const dispatch = useDispatch();
  const getUser = async () => await dispatch(getUserDetails());

  useEffect(() => {
    getUser();
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" exact />
            <Route element={<CategoryHome />} path="/:categoryId" />
            <Route element={<Notes />} path="/:categoryId/notes" />
            <Route element={<NoteDetails />} path="/note/:id" />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
