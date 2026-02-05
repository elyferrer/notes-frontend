import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createNote } from './noteSlice';
import { useParams } from 'react-router-dom';

const NoteForm = ({ showForm, setShowForm }) => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    
    const [formData, setFormData] = useState({
        title: '',
        details: '',
        category_id: categoryId
    });

    const [selected, setSelected] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // if (selected) {
            //     await dispatch(updateTask({ id: selected, formData })).unwrap();
            // } else {
                await dispatch(createNote(formData)).unwrap();
            // }

            // setFormData({
            //     title: '',
            //     details: '',
            //     start_date: '',
            //     start_time: '',
            //     end_date: '',
            //     end_time: '',
            //     status: 1
            // });

            // setSelected('');
            setShowForm(false)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <div className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex justify-center p-2 items-center ${showForm ? 'visible pointer-events-auto' : 'hidden pointer-events-none'}`}>
                <form onSubmit={handleSubmit} className='w-96 bg-white p-3 rounded'>
                    <div className='m-2'>
                        <h1 className='text-xl text-center'>{ selected ? 'Update' : 'Create New'} Note</h1>
                    </div>
                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Title
                        </span>
                        <input type="text" className="w-full rounded p-2 border border-gray-400" name="title" value={formData.title} placeholder="Enter Title" onChange={handleChange} />
                    </div>

                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Details
                        </span>
                        <textarea name="details" className="w-full rounded p-2 resize-none border border-gray-400" value={formData.details} placeholder="Enter Details" onChange={handleChange}></textarea>
                    </div>

                    <div className='m-2'>
                        <button type="submit" className='w-full bg-blue-800 text-white mt-4 p-2 rounded'>Submit</button>
                        <button type="button" className='w-full mt-2 p-2' onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteForm
