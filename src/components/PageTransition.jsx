import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap';


const PageTransition = () => {
    const divRef = useRef([]);
    const containerRef = useRef();

    /**
     * On mount
     */
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(divRef.current, {
                width: "100%",
                ease: "power1.inOut",
                duration: 0.5,
                stagger: 0.2,
            })
        }, containerRef.current);
        
        return () => {
            gsap.to(divRef.current, {
                width: "0%",
                ease: "power1.inOut",
                duration: 0.5,
                stagger: 0.2,
            });
        };
    }, [])


    return (
        <div className='fixed top-0 left-0 w-dvw h-dvh z-[100] overflow-hidden flex flex-col'>
            <div ref={(el) => divRef.current[2] = el} className='bg-primary h-full w-0' />
            <div ref={(el) => divRef.current[1] = el} className='bg-primary h-full w-0' />
            <div ref={(el) => divRef.current[0] = el} className='bg-primary h-full w-0' />
        </div>
    )
}

export default PageTransition