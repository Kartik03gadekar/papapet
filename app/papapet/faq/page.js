import FaqPage from '@/Components/FAQ/FaqPage'
import NavPapaPet from '@/Components/Nav/NavPapaPet'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='w-full h-20 ' > <NavPapaPet/> </div>
      
      <FaqPage/>
    </div>
  )
}

export default page
