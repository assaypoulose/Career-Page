import React from 'react'
import Location from '../pages/Location'
import Salary from '../pages/Salary'
import JobPostingData from '../pages/JobPostingData'
import WorkExperience from '../pages/WorkExperience'
import TypeOfEmployment from '../pages/TypeOfEmployment'

const Sidebar = ({handleChange, handleClick}) => {


  return (
    <div className='space-y-5'>
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
        <Location handleChange={handleChange} />
        <Salary handleChange={handleChange} handleClick={handleClick}/>
        <JobPostingData handleChange={handleChange} />
        <WorkExperience handleChange={handleChange} />
        <TypeOfEmployment handleChange={handleChange} />
    </div>
  )
}

export default Sidebar