import React from 'react'
import BlockLogo from '../LogoAndThings/blockLogo'
export default function WebsiteBlocker() {
    return (
        <div className='w-4/5 flex justify-center flex-col'>
            <div className='w-full flex justify-between items-center' >
                <div className='w-2/3 flex gap-3'>
                    <BlockLogo />
                    <h1 className='text-2xl font-semibold'>Blocked Websites</h1>
                </div>
                <div className='w-1/3'>
                </div>
            </div>
        </div>
    )
}
