"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

const ImageSlider= ()=>{

    const [imagenum, setImageNum] = useState(0)

    const images=['/Beauty.png', '/Fragrances.png', '/Furniture.png']
    const imNum= images.length-1;

    useEffect(
        ()=>{
            const Interval=    setInterval(()=>{
        setImageNum((prev) => (prev + 1) % images.length)
        console.log(imagenum)
    }, 5000)

    return () => clearInterval(Interval)

        }, []
    )

    return(
        <div className="w-full flex items-center justify-center overflow-y-hidden h-[60vh]">
        <Image
            src={images[imagenum]}
            width={1200}
            height={500}
            alt="Banner Image"
            className="rounded-2xl"
        />
        </div>
    )
}

export default ImageSlider