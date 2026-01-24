import { Link } from "react-router-dom";

const Category = ({ id, name, description }) => {
    return (
        <div>
            <Link to={`/${id}`}>
                { name } { description }
            </Link>
            
            
        </div>
    )
}

export default Category
