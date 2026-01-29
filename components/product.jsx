import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

const Product = ({id, image, name, price, discountp}) => {
  return (
    <>
        <Link href={`/products/${id}`} target='_blank' className='group h-68 sm:h-80 w-40 lg:w-60 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'>
            <div className="h-[70%]  relative overflow-hidden border border-transparent rounded-t-[20px] bg-gray-300/80 group-hover:bg-white transition-all duration-300 flex items-end justify-center">
            <div className="absolute flex items-center justify-end w-full invisible group-hover:visible bottom-0">
                <button className='bg-transparent border-1 border-transparent px-4 py-1 rounded-full text-[#5a24c9]/70 transition-colors duration-300 cursor-pointer'>
                    <FaArrowUpRightFromSquare />
                </button>
            </div>
                {image ? 
                <Image
                    src={image}
                    alt="Product Image"
                    width={500}
                    height={90}
                /> : <div className="h-full w-full flex items-center justify-center text-gray-400">No Image Available</div>}
            </div>
            <div className="h-[30%] bg-[#1E2330] border border-transparent flex flex-col items-center rounded-b-[20px]">
                <div className="mt-2 w-full flex flex-col justify-between h-full px-3 py-1">
                    <h1 className='text-white font-light text-md sm:mt-2'>{name ? `${name.split(' ').filter((title, id)=> id < 4).join(' ')}` + `${name.split(' ').length > 4 ? ".." : ""}` : "Product Name"}</h1>
                    <div className="w-full flex justify-start items-center space-x-2">
                        <p className='text-white font-semibold'>$ {price}</p>
                        <p className='text-red-300 line-through text-[12px]'>$ {Math.round(price + ( discountp/100 * price))}.99</p>
                    </div>
                </div>            
            </div>
        </Link>
    </>
  )
}

export default Product
