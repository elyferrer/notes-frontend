import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
// import { createNote } from './characterSlice';
import { useParams } from 'react-router-dom';

const CharacterForm = ({ showForm, setShowForm }) => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    
    const [formData, setFormData] = useState({
        title: '',
        details: '',
        category_id: categoryId,
        reading: [],
        on_reading: [],
        kun_reading: [],
        meaning: [],
        note: ''
    });

    const [inpReading, setInpReading] = useState('');
    const [inpOnReading, setInpOnReading] = useState('');
    const [inpKunReading, setInpKunReading] = useState('');
    const [inpMeaning, setInpMeaning] = useState('');

    const [selected, setSelected] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await dispatch(createNote(formData)).unwrap();
            setShowForm(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleInsertToArray = (type, value) => {
        switch(type) {
            case 'reading':
                if (formData.reading.includes(value)) {
                    alert('Reading already exists in the list');
                } else {
                    setFormData((prev) => ({ ...prev, reading: [...prev.reading, inpReading]}));
                    setInpReading('');
                }
            break;

            case 'on_reading':
                if (formData.on_reading.includes(value)) {
                    alert('Onyomi already exists in the list');
                } else {
                    setFormData((prev) => ({ ...prev, on_reading: [...prev.on_reading, inpOnReading]}));
                    setInpOnReading('');
                }
            break;

            case 'kun_reading':
                if (formData.kun_reading.includes(value)) {
                    alert('Kunyomi already exists in the list');
                } else {
                    setFormData((prev) => ({ ...prev, kun_reading: [...prev.kun_reading, inpKunReading]}));
                    setInpKunReading('');
                }
            break;

            case 'meaning':
                if (formData.meaning.includes(value)) {
                    alert('Meaning already exists in the list');
                } else {
                    setFormData((prev) => ({ ...prev, meaning: [...prev.meaning, inpMeaning]}));
                    setInpMeaning('');
                }
            break;
        }
    }

    return (
        <div>
            <div className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex justify-center p-2 items-center ${showForm ? 'visible pointer-events-auto' : 'hidden pointer-events-none'}`}>
                <form onSubmit={handleSubmit} className='w-96 bg-white p-3 rounded overflow-y-scroll max-h-[90vh]'>
                    <div className='m-2'>
                        <h1 className='text-xl text-center'>{ selected ? 'Update' : 'Add New'} Character</h1>
                    </div>
                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Value
                        </span>
                        <input type="text" className="w-full rounded p-2 border border-gray-400" name="title" value={formData.title} placeholder="Enter Title" onChange={handleChange} />
                    </div>

                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Readings
                        </span>
                        <div className='grid grid-cols-2 gap-2'>
                            { 
                                formData.reading.length > 0 ?
                                    formData.reading.map((read, i) => (
                                        <div key={i}
                                            className='inline-block bg-gray-100 text-black text-md font-semibold px-2.5 py-0.5 rounded flex justify-between'>
                                            {read} &nbsp;&nbsp;
                                            <button type='button' onClick={() => setFormData((prev) => ({ ...prev, reading: prev.reading.filter(item => item != read) }))}>&times;</button>
                                        </div>
                                    )): ''
                            }
                        </div>
                        <div className='grid grid-cols-3 gap-2 pt-3'>
                            <input type="text" className='col-span-2 rounded p-2 border border-gray-400' onChange={ (e) => setInpReading(e.target.value) } value={inpReading} />
                            <button type='button' onClick={ () => handleInsertToArray('reading', inpReading.toString().trim()) }>Add Reading</button>
                        </div>
                    </div>

                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            On Readings
                        </span>
                        <div className='grid grid-cols-2 gap-2'>
                            { 
                                formData.on_reading.length > 0 ?
                                    formData.on_reading.map((on, i) => (
                                        <div key={i}
                                            className='inline-block bg-gray-100 text-black text-md font-semibold px-2.5 py-0.5 rounded flex justify-between'>
                                            {on} &nbsp;&nbsp;
                                            <button type='button' onClick={() => setFormData((prev) => ({ ...prev, on_reading: prev.on_reading.filter(item => item != on) }))}>&times;</button>
                                        </div>
                                    )): ''
                            }
                        </div>
                        <div className='grid grid-cols-3 gap-2 pt-3'>
                            <input type="text" className='col-span-2 rounded p-2 border border-gray-400' onChange={ (e) => setInpOnReading(e.target.value) } value={inpOnReading} />
                            <button type='button' onClick={ () => handleInsertToArray('on_reading', inpOnReading.toString().trim()) }>Add Onyomi</button>
                        </div>
                    </div>

                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Kun Readings
                        </span>
                        <div className='grid grid-cols-2 gap-2'>
                            { 
                                formData.kun_reading.length > 0 ?
                                    formData.kun_reading.map((kun, i) => (
                                        <div key={i}
                                            className='inline-block bg-gray-100 text-black text-md font-semibold px-2.5 py-0.5 rounded flex justify-between'>
                                            {kun} &nbsp;&nbsp;
                                            <button type='button' onClick={() => setFormData((prev) => ({ ...prev, kun_reading: prev.kun_reading.filter(item => item != kun) }))}>&times;</button>
                                        </div>
                                    )): ''
                            }
                        </div>
                        <div className='grid grid-cols-3 gap-2 pt-3'>
                            <input type="text" className='col-span-2 rounded p-2 border border-gray-400' onChange={ (e) => setInpKunReading(e.target.value) } value={inpKunReading} />
                            <button type='button' onClick={ () => handleInsertToArray('kun_reading', inpKunReading.toString().trim()) }>Add Kunyomi</button>
                        </div>
                    </div>

                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Meanings
                        </span>
                        <div className='grid grid-cols-2 gap-2'>
                            { 
                                formData.meaning.length > 0 ?
                                    formData.meaning.map((mean, i) => (
                                        <div key={i}
                                            className='inline-block bg-gray-100 text-black text-md font-semibold px-2.5 py-0.5 rounded flex justify-between'>
                                            {mean} &nbsp;&nbsp;
                                            <button type='button' onClick={() => setFormData((prev) => ({ ...prev, meaning: prev.meaning.filter(item => item != mean) }))}>&times;</button>
                                        </div>
                                    )): ''
                            }
                        </div>
                        <div className='grid grid-cols-3 gap-2 pt-3'>
                            <input type="text" className='col-span-2 rounded p-2 border border-gray-400' onChange={ (e) => setInpMeaning(e.target.value) } value={inpMeaning} />
                            <button type='button' onClick={ () => handleInsertToArray('meaning', inpMeaning.toString().trim()) }>Add Meaning</button>
                        </div>
                    </div>

                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Note
                        </span>
                        <textarea name="note" className="w-full rounded p-2 resize-none border border-gray-400" value={formData.note} placeholder="Enter Note" onChange={handleChange}></textarea>
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

export default CharacterForm
