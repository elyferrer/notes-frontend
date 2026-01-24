import React from 'react'
import { useParams } from 'react-router-dom'

const NoteDetails = ({ details }) => {
    const { id } = useParams()
    return (
        <div>
            Note Details
        </div>
    )
}

export default NoteDetails
