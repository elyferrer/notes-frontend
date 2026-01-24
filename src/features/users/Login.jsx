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

    useEffect(() => { if (user) navigate('/'); }, [user]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" placeholder="Enter Username" className="w-2/4 rounded p-2 border border-gray-400"
                        onChange={(e) => setUsername(e.target.value)} value={username} required />

                <input type="password" name="password" id="password" placeholder="Enter Password" className="w-2/4 rounded p-2 border border-gray-400 mt-2" 
                        onChange={(e) => setPassword(e.target.value)} value={password} required />

                <button type="submit" className='w-3/4 bg-blue-500 text-white mt-4 p-2 rounded'>Login</button>
            </form>
        </div>
    )
}

export default Login
