import React from 'react'
import { useParams } from 'react-router-dom'

const ViewProject = () => {
    const { projectId } = useParams();
  return (
    <div>ViewProject {String(projectId)}</div>
  )
}

export default ViewProject