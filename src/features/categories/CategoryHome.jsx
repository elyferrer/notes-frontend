import React from 'react'
import { Link, useParams } from 'react-router-dom'

const CategoryHome = () => {
    const { categoryId } = useParams();

    return (
        <div className='mx-auto w-2/5 min-h-screen bg-green-300'>
            <div>
                <h1 className='text-2xl text-center p-3'>Category Name</h1>
            </div>
            <div className='grid p-3'>
                <Link to={`/${categoryId}/notes`} className='p-3 bg-white/75 rounded mt-2'>Notes</Link>
                <Link to={`/${categoryId}/characters`} className='p-3 bg-white/75 rounded mt-2'>Characters</Link>
                <Link to={`/${categoryId}/vocabularies`} className='p-3 bg-white/75 rounded mt-2'>Vocabularies</Link>
            </div>
            
        </div>
    )
}

export default CategoryHome
