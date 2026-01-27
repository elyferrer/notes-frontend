import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Login from './features/users/Login';
import PrivateRoutes from './features/components/PrivateRoutes';
import Home from './features/users/Home';
import { getUserDetails, logout } from './features/users/userSlice';
import CategoryHome from './features/categories/CategoryHome';
import Notes from './features/notes/Notes';
import NoteDetails from './features/notes/NoteDetails';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const getUser = async () => await dispatch(getUserDetails());

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [dispatch])

  return (
    <>
      {
        user.data?.username !== undefined ? <div className='mx-auto w-2/5 bg-white p-2'>
          <button onClick={handleLogout} className='border-2 border-solid border-red-600 px-4 py-1 rounded text-red-600 font-bold'>Logout</button>
        </div> : ''
      }
      
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
