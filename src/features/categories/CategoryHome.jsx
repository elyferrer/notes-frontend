import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getCategory } from './categorySlice';

const CategoryHome = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);

    const getDetails = async () => {
        await dispatch(getCategory(categoryId));
    }

    useEffect(() => { getDetails(); }, [dispatch])

    return (
        <div className='mx-auto w-2/5 min-h-screen bg-green-300'>
            <div>
                <h1 className='text-2xl text-center p-3'>{ category.selected?.name }</h1>
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
