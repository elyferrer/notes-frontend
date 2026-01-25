import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from './categorySlice';
import Category from './Category';
import CategoryForm from './CategoryForm';

const Categories = () => {
    const categories = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);

    const getCategoriesList = async () => {
        await dispatch(getCategories());
    }

    useEffect(() => {
        getCategoriesList();
    }, [dispatch]);

    useEffect(() => {}, [categories]);

    return (
        <div className='p-3'>
            <div>
                <button className='bg-blue-700 text-white px-4 py-2 rounded' onClick={ () => setShowForm(true) }>Add New Group</button>
            </div>
            <div>
                {
                    categories.data.length > 0 ?
                        categories.data.map((category) => (
                            <div key={category._id}>
                                <Category 
                                    id={category._id}
                                    name={category.name} 
                                />
                            </div>
                        )) 
                        : ''
                }
            </div>
            <div>
                <CategoryForm showForm={showForm} setShowForm={setShowForm} />
            </div>
        </div>
    )
}

export default Categories
