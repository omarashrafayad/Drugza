import React from 'react'
import Image from 'next/image'

const DashCodeLogo = ({ className }: { className?: string }) => {
    return (
        <div className={`relative flex items-center justify-start overflow-visible ${className}`}>
            <Image 
                src="/LOGO.png" 
                alt="logo" 
                width={160} 
                height={50} 
                priority 
                className="w-full h-auto max-h-[40px] md:max-h-[45px] object-contain object-left"
                style={{ 
                    objectPosition: 'left center',
                    width: '100%',
                    height: 'auto',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                }}
            />
        </div>
    )
}

export default DashCodeLogo