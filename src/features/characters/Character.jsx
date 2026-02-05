import { Link } from "react-router-dom";

const Character = ({ id, value }) => {
    return (
        <div className='grid gap-2 mt-3 text-center'>
            <Link to={`/character/${id}`} className='p-3 bg-white/75 rounded text-xl'>
                { value }
            </Link>
        </div>
    )
}

export default Character
