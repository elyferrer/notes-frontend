import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCharacter, getCharacterDetails } from './characterSlice';
import CharacterForm from './CharacterForm';

const CharacterDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const character = useSelector((state) => state.character);
    const navigate = useNavigate();
    
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        details: ''
    });

    const handleGetDetails = async () => {
        await dispatch(getCharacterDetails(id));
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
                await dispatch(deleteCharacter(id));
                navigate(-1);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleUpdateButtonClick = () => {
        setIsUpdate(true);
        
    }

    useEffect(() => { handleGetDetails(); }, [dispatch])

    useEffect(() => {}, [character])

    return (
        <div className='mx-auto w-2/5 min-h-screen bg-blue-300 p-3'>
            <div className='py-3 grid grid-cols-4 gap-2'>
                {
                    !isUpdate ?
                    <button 
                        className='border-2 border-blue-700 rounded px-4 py-1 text-blue-700 font-bold'
                        onClick={ handleUpdateButtonClick }
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
                    <h1 className='p-2 text-4xl font-bold'>{ character.selected?.value }</h1>
                    {
                        character.selected?.kun_reading?.length > 0 ?
                        (
                            <div className='p-2'>
                                <h1 className='text-lg'>Kunyomi Readings</h1>
                                <ul>
                                    { character.selected?.kun_reading.map((kun, index) => (
                                        <li key={index} className='list-disc mx-4'>{ kun }</li>
                                    )) }
                                </ul>
                            </div>
                        ) : ''
                    }

                    {
                        character.selected?.on_reading?.length > 0 ?
                        (
                            <div className='p-2'>
                                <h1 className='text-lg'>Onyomi Readings</h1>
                                <ul>
                                    { character.selected?.on_reading.map((on, index) => (
                                        <li key={index} className='list-disc mx-4'>{ on }</li>
                                    )) }
                                </ul>
                            </div>
                        ) : ''
                    }

                    {
                        character.selected?.reading?.length > 0 ?
                        (
                            <div className='p-2'>
                                <h1 className='text-lg'>Readings</h1>
                                <ul>
                                    { character.selected?.reading.map((read, index) => (
                                        <li key={index} className='list-disc mx-4'>{ read }</li>
                                    )) }
                                </ul>
                            </div>
                        ) : ''
                    }

                    {
                        character.selected?.meaning?.length > 0 ?
                        (
                            <div className='p-2'>
                                <h1 className='text-lg'>Meanings</h1>
                                <ul>
                                    { character.selected?.meaning.map((mean, index) => (
                                        <li key={index} className='list-disc mx-4'>{ mean }</li>
                                    )) }
                                </ul>
                            </div>
                        ) : ''
                    }
                    
                    <div className='p-2'>
                        <h1 className='text-lg'>Note</h1>
                        <p className='p-2 text-lg whitespace-pre-line'>{ character.selected?.note }</p>
                    </div>
                    
                </div> : 
                <div className='bg-white/90 rounded p-4'>
                    <CharacterForm />
                </div>
            }
            
            
        </div>
    )
}

export default CharacterDetails
