import React from 'react'
import { useParams } from 'react-router-dom'

const ViewContact = () => {

    const contactId = useParams()
  return (
    <div>ViewContact {String(contactId)}</div>
  )
}

export default ViewContact