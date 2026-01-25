import { Link } from "react-router-dom";

const Category = ({ id, name, description }) => {
    return (
        <div className='grid mt-2'>
            <Link to={`/${id}`} className='p-3 bg-white/75 rounded'>
                { name } { description }
            </Link>
            
            
        </div>
    )
}

export default Category
