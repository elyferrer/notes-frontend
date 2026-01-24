import { Link } from "react-router-dom";

const Note = ({ id, title }) => {
    return (
        <div className='grid gap-2 mt-3'>
            <Link to={`/note/${id}`} className='p-3 bg-white/75 rounded text-xl'>
                { title.toUpperCase() }
            </Link>
        </div>
    )
}

export default Note
