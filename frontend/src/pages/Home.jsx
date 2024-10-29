import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Jobs from './Jobs';
import Sidebar from '../components/Sidebar';
import NewsLetter from '../components/NewsLetter';

const Home = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [ jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setIsLoading(true);
        fetch("jobs.json").then(res => res.json()).then(data => {
            setJobs(data);
            setIsLoading(false);
        })
    },[]);

    console.log(jobs);

    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    //filter jobs by title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    //console.log(filteredItems);

    // radio filtering
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    // button based filtering 
    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    }

    //calculate the index range
    const calculatePage = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return {startIndex, endIndex};
    }

    //function for the next page 
    const nextPage = () => {
        if(currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
            setCurrentPage(currentPage + 1);
        }
    }

    //function for the previous page
    const previousPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage -1);
        }
    }

    //main function
    const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;
        //filtering search input items
        if(query){
            filteredJobs = filteredItems;
        }

        // category filtering
        if(selected) {
            filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate}) => (
                jobLocation.toLowerCase() === selected.toLowerCase() ||
                parseInt(maxPrice) <= parseInt(selected) ||
                postingDate >= selected ||
                salaryType.toLowerCase() === selected.toLowerCase() || experienceLevel.toLowerCase() === selected.toLowerCase() ||
                employmentType.toLowerCase() === selected.toLowerCase()
            ));
            //console.log(filteredJobs);
            
        }
        //slice the data based on currentPage
        const { startIndex, endIndex} = calculatePage();
        filteredJobs = filteredJobs.slice(startIndex, endIndex);
        return filteredJobs.map((data, i) => <Cards key={i} data={data}/>)
    }

    const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
        <Banner query={query} handleInputChange={handleInputChange}/>

        {/* main content */}
        <div className='bg-indigo-50 md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>

            {/* left */}
            <div className='bg-white p-4 rounded'>
                <Sidebar handleChange={handleChange} handleClick={handleClick}/>
            </div>

            {/* center */}
            <div className='col-span-2 bg-white p-4 rounded-sm'>
                {
                    isLoading ? (<p className='font-medium'>Loading...</p>) 
                    : result.length > 0 ?  (<Jobs result={result} />) 
                    : <> <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
                    <p>No data found</p> </> 
                }

                {/* Pagination */}
            {
                result.length > 0 ? (
                    <div className='flex justify-center mt-4 space-x-8'>
                        <button onClick={previousPage} disabled={currentPage === 1} className='hover:underline'>Previos</button>
                        <span className='mx-2'>Page{currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className='hover:underline'>Next</button>
                    </div>
                ) : ""
            }
            </div>


            {/* right */}
            <div className='bg-white p-4 rounded'>
                <NewsLetter />
            </div>

        </div>
    </div>
  )
}

export default Home