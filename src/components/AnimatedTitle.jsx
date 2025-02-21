import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedTitle = ({ text, containerClass, ...rest }) => {
    const containerRef = useRef(null); 

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".word", {
                y: 10,
                opacity: 0,
                stagger: 0.2, 
                duration: 0.7,
                ease: "linear"
            });
        }, containerRef); 

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`${containerClass} gap-2 flex flex-wrap`}>
            {text.split(" ").map((word, i) => (
                <h1 key={i} className="word inline-block">{word}</h1>
            ))}
        </div>
    );
};

export default AnimatedTitle;
