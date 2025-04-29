import React from 'react'
import Skeleton from 'react-loading-skeleton'

function CardSkeleton() {
    return (
       
                <div className='p-2 border-[1px] border-gray-500  w-72 h-96 rounded-md'>

                    <p className='flex justify-between'>
                        <Skeleton count={1} width={100} />
                        <Skeleton count={1} width={100} />
                    </p>

                    <Skeleton height={192} />

                    <div className='flex flex-col gap-3 mt-3'>

                        <p className='flex gap-3'><Skeleton width={50} /> <Skeleton width={50} /> <Skeleton width={50} /></p>
                        <p><Skeleton width={50} /></p>
                    </div>

                </div>
       

    )
}

export default CardSkeleton