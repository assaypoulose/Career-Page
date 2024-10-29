import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLoaderData, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable"


const UpdateJob = () => {

    const {id} = useParams();
    const {_id, companyLogo, jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, skills, employmentType, description, postedBy } = useLoaderData();

    const [selectedOption, setSelectedOption] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    data.skills = selectedOption;
    //console.log("Data to be sent:", data); // Log the data before sending
    fetch(`http://localhost:3000/update-job/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      if(result.acknowledge === true){
        alert("Job updated successfully!")
      }
      reset() 
    })
  };

  const options = [
    {value: "JavaScript", label: "JavaScript"},
    {value: "Java", label: "Java"},
    {value: "CSS", label: "CSS"},
    {value: "C++", label: "C++"},
    {value: "HTML", label: "HTML"},
    {value: "React", label: "React"},
    {value: "Node", label: "Node"},
    {value: "MongoDB", label: "MongoDB"},
    {value: "SQL", label: "SQL"},
  ]


  return (
    <div className='max-w-screen-xl container mx-auto xl:px-24 px-4'>
      {/* react hook form */}
      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* 1st row */}
          <div className='create-job-flex'>
            
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Title</label>
              <input type="text" defaultValue={jobTitle} {...register("jobTitle")} className='create-job-input' />
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Name</label>
              <input type="text" defaultValue={companyName} {...register("companyName")} className='create-job-input' />
            </div>
          </div>

          {/* 2nd row */}

          <div className='create-job-flex mt-5'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Minimum Salary</label>
              <input type="text" defaultValue={minPrice} {...register("minPrice")} className='create-job-input' />
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Maximum Salary</label>
              <input type="text" defaultValue={maxPrice} {...register("maxPrice")} className='create-job-input' />
            </div>
          </div>

          {/* 3rd row */}
          <div className='create-job-flex mt-5'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Salary Type</label>
              <select {...register("salaryType")} className='create-job-input'>
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Location</label>
              <input type="text" defaultValue={jobLocation} {...register("jobLocation")} className='create-job-input' />
            </div>
          </div>

          {/* 4th row */}
          <div className='create-job-flex mt-5'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Posting Date</label>
              <input type="date" defaultValue={postingDate}  {...register("postingDate")} className='create-job-input' />
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Experience Level</label>
              <select {...register("experienceLevel")} className='create-job-input'>
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="Any Experience">Any Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work Remotely">Work Remotely</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div>
            <label className='block mb-2 text-lg mt-5'>Required skill set:</label>
            <Creatable defaultValue={skills}
            onChange={setSelectedOption}
            options={options} isMulti className='create-job-input'/>
          </div>

          {/* 6th row */}
          <div className='create-job-flex mt-5'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Logo</label>
              <input type="url" placeholder="Paste your company logo URL: https://fileshare.com/img1" defaultValue={companyLogo} {...register("companyLogo")} className='create-job-input' />
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Employment Type</label>
              <select {...register("employmentType")} className='create-job-input'>
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className='w-full mt-5'>
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' rows={6} defaultValue={description} placeholder="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sapiente tenetur pariatur vitae, quos tempore quasi numquam consectetur porro, necessitatibus aliquam error cum minima eos." {...register("description")}/>
          </div>

          {/* 8th row */}
          <div className='w-full mt-5'>
          <label className="block mb-2 text-lg">Job Posted By</label>
          <input type="email" placeholder='Enter your email' defaultValue={postedBy} {...register("postedBy")} className='create-job-input'/>
          </div>

          <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer my-5' />
        </form>

      </div>
    </div>
  )
}

export default UpdateJob