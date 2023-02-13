import React from 'react'

const FoodDetailModal = ({title}) => {
  return (
    <div className='w-full fixed top-0 right-0 left-0 z-50 h-modal md:h-full'>
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
                This is content
            </div>
        </div>
    </div>
  )
}

export default FoodDetailModal