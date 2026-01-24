import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotesByCategory } from './noteSlice';
import { useParams } from 'react-router-dom';
import Note from './Note';

const Notes = () => {
    const notes = useSelector((state) => state.note);
    const { categoryId } = useParams();
    const dispatch = useDispatch();

    const getNotesList = async () => {
        await dispatch(getNotesByCategory(categoryId));
    }

    useEffect(() => {
        getNotesList();
    }, [dispatch]);

    useEffect(() => { console.log('notes', notes); }, [notes]);

    return (
        <div className='mx-auto w-2/5 min-h-screen bg-red-300 p-3'>
            <h1 className='text-3xl text-center p-3'>Notes</h1>
            {
                notes.data.length > 0 ?
                    notes.data.map((note) => (
                        <Note key={note._id}
                            id={note._id}
                            title={note.title} 
                            details={note.details} 
                        />
                    )) 
                    : ''
            }
        </div>
    )
}

export default Notes
