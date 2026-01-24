import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from './categorySlice';
import Category from './Category';

const Categories = () => {
    const categories = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const getCategoriesList = async () => {
        await dispatch(getCategories());
    }

    useEffect(() => {
        getCategoriesList();
    }, [dispatch]);

    useEffect(() => { console.log(categories); }, [categories]);

    return (
        <div>
            {
                categories.data.length > 0 ?
                    categories.data.map((category) => (
                        <div key={category._id}>
                            <Category 
                                id={category._id}
                                name={category.name} 
                                description={category.description} 
                            />
                        </div>
                    )) 
                    : ''
            }
        </div>
    )
}

export default Categories
