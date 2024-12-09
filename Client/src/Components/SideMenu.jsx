import React from 'react'
import Search from './Search'
import CategoryLinks from './CategoryLinks'

const SideMenu = () => {
  return (
    <div className='sticky top-8 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col justify-center'>
        <div className=''>
            <h1>Search</h1>
            <Search />
        </div>
        <div className='mt-4'>
            <h1>Filters</h1>
           <div className='flex flex-col gap-2 mt-2'>
            <div className='flex gap-2'>
                    <input type='checkbox'  /><label htmlFor="">Newest</label>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox'  /><label htmlFor="">Newest</label>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox'  /><label htmlFor="">Newest</label>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox'  /><label htmlFor="">Newest</label>
                </div>
           </div>
        </div>

        <CategoryLinks />
    </div>
  )
}

export default SideMenu