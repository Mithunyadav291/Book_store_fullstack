import { MoveRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='h-auto gap-4 md:h-[75vh] flex flex-col-reverse md:flex-row'>
        <div className='w-full md:w-1/2 flex flex-col items-center md:items-start justify-center'>
         <h1 className='text-3xl sm:text-6xl font-semibold text-yellow-100'>
            Discover Your Next Great Read</h1>
            <p className='mt-4 text-xl text-zinc-300'>
                Uncover captivating stories, enriching knowledge, and endless
                inspiration in our curated collection of books
            </p>
           <div className='mt-8'>
           <Link to="/allbooks"  className=' flex text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-3 rounded-full hover:bg-zinc-800'>
              Discover Books
              <MoveRight className=' relative left-5 top-2'/>
            </Link>
    
           </div>
        </div>
        <div className='w-full md:w-1/2 h-auto   flex  items-center justify-center'>
            <img src="hero1.jpg" alt="" className='rounded-xl'/>
        </div>
    </div>
  )
}

export default Hero