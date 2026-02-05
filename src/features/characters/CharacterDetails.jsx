import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
// import { getNoteDetails, updateNote, deleteNote } from './noteSlice';

const CharacterDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const note = useSelector((state) => state.note);
    const navigate = useNavigate();
    
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        details: ''
    });

    const handleGetDetails = async () => {
        // await dispatch(getNoteDetails(id));
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            // await dispatch(updateNote({id, formData})).unwrap();
        } catch (error) {
            console.log(error.message)
        }
        setIsUpdate(false);
    }

    const handleDelete = async () => {
        if(confirm('Are you sure you want to delete this note?')) {
            try {
                // await dispatch(deleteNote(id));
                navigate(-1);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => { handleGetDetails(); }, [dispatch])

    useEffect(() => { 
        setFormData({
            title: note?.selectedNote?.title,
            details: note?.selectedNote?.details
        });
    }, [note])

    return (
        <div className='mx-auto w-2/5 min-h-screen bg-blue-300 p-3'>
            <div className='py-3 grid grid-cols-4 gap-2'>
                {
                    !isUpdate ?
                    <button 
                        className='border-2 border-blue-700 rounded px-4 py-1 text-blue-700 font-bold'
                        onClick={ () => setIsUpdate(true) }
                    >Update</button> :
                    <>
                        <button className='border-2 border-white bg-white rounded px-4 py-1'
                        onClick={() => setIsUpdate(false)}>Cancel</button>
                        <button 
                            className='border-2 border-blue-700 rounded px-4 py-1 text-blue-700 font-bold'
                            onClick={ handleSubmit }
                        >Save</button>
                    </>
                    
                }

                <button 
                    className='border-2 border-red-700 rounded px-4 py-1 text-red-700 font-bold'
                    onClick={ handleDelete }
                >Delete</button>
            </div>
            {
                !isUpdate ? 
                <div className='bg-white/90 rounded p-4'>
                    <h1 className='p-2 text-2xl font-bold'>{ note?.selectedNote?.title }</h1>
                    <p className='p-2 text-lg whitespace-pre-line'>{ note?.selectedNote?.details }</p>
                </div> : 
                <div>
                    <form>
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
                            <textarea name="details" rows="10" className="w-full rounded p-2 resize-none border border-gray-400" value={formData.details} placeholder="Enter Details" onChange={handleChange}></textarea>
                        </div>
                    </form>
                </div>
            }
            
            
        </div>
    )
}

export default CharacterDetails
