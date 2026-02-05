import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCharactersByCategory, resetSelected } from './characterSlice';
import { useParams } from 'react-router-dom';
import CharacterForm from './CharacterForm';
import Character from './Character';

const Characters = () => {
    const character = useSelector((state) => state.character);
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);

    const getCharactersList = async () => {
        await dispatch(getCharactersByCategory(categoryId));
    }

    const handleAddNewButton = async () => {
        // await dispatch(resetSelected());
        setShowForm(true);
    }

    useEffect(() => {
        getCharactersList();
    }, [dispatch]);

    useEffect(() => { 
        console.log('length', character.data);
    }, [character]);

    return (
        <div className='mx-auto w-2/5 min-h-screen bg-red-300 p-3'>
            <h1 className='text-3xl text-center p-3'>Characters</h1>
            <button className='bg-blue-700 text-white px-4 py-2 rounded' onClick={ handleAddNewButton }>Add New Character</button>
            <div className='grid grid-cols-6 gap-2'>
                {
                    character.data.length > 0 ?
                        character.data.map((character) => (
                            <Character key={character._id}
                                id={character._id}
                                value={character.value} 
                            />
                        )) : ''
                }
            </div>
            
            
            <div>
                <div className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex justify-center p-2 items-center ${showForm ? 'visible pointer-events-auto' : 'hidden pointer-events-none'}`}>
                    <div className='w-96 bg-white p-3 rounded overflow-y-scroll max-h-[90vh]'>
                        <CharacterForm showForm={showForm} setShowForm={setShowForm} />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Characters
