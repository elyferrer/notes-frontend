import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from './userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username: username, password: password };
        await dispatch(login(formData));
    }

    useEffect(() => { if (user.data?.username !== undefined) navigate('/'); }, [user]);

    return (
        <div className='w-1/4 mx-auto'>
            <div>
                <h1 className='text-2xl text-center p-4'>Sign in</h1>
            </div>
            <form onSubmit={handleSubmit} className='grid'>
                <input type="text" name="username" id="username" placeholder="Enter Username" className="rounded p-2 border border-gray-400"
                        onChange={(e) => setUsername(e.target.value)} value={username} required />

                <input type="password" name="password" id="password" placeholder="Enter Password" className="rounded p-2 border border-gray-400 mt-2" 
                        onChange={(e) => setPassword(e.target.value)} value={password} required />

                <button type="submit" className='bg-blue-500 text-white mt-4 p-2 rounded'>Login</button>
            </form>
        </div>
    )
}

export default Login
