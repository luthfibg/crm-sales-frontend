import React from 'react'
import { useParams } from 'react-router-dom'

const ViewLead = () => {

    const {leadId} = useParams();
  return (
    <div>ViewLead {String(leadId)}</div>
  )
}

export default ViewLead