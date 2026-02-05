import { Link } from "react-router-dom";

const Category = ({ data }) => {
    return (
        <div className='grid mt-2'>
            <Link to={`/${data._id}`} className='p-3 bg-white/75 rounded'>
                { data.name }
            </Link>
        </div>
    )
}

export default Category
