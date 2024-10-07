import React from 'react'
import { useParams } from 'react-router-dom'

const ViewOpportunity = () => {
    const { opportunityId } = useParams();
  return (
    <div>ViewOpportunity {String(opportunityId)}</div>
  )
}

export default ViewOpportunity