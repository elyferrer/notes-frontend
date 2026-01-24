import React from 'react'
import { Link, useParams } from 'react-router-dom'

const CategoryHome = () => {
    const { categoryId } = useParams();

    return (
        <div>
            <Link to={`/${categoryId}/notes`}>Notes</Link>
            <Link to={`/${categoryId}/characters`}>Characters</Link>
            <Link to={`/${categoryId}/vocabularies`}>Vocabularies</Link>
        </div>
    )
}

export default CategoryHome
