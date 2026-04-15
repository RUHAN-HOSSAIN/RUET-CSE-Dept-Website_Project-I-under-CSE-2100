import { Link } from 'react-router-dom'
import roboImg from '../assets/robo-webp.webp'

const NotFound = () => {
  return (
    <div className='relative overflow-hidden w-screen h-[90vh] flex items-center justify-center gap-20 bg-radial from-dark-blue-0 to-dark-blue-2 p-5 md:p-10'>

      {/* Left: Robot Image */}
      <div className='
        max-w-130 min-w-20
        lg:-mr-16
        max-lg:absolute max-lg:inset-0 max-lg:flex max-lg:items-center max-lg:justify-center
        max-lg:z-0
        lg:z-10
      '>
        <img
          src={roboImg}
          alt="AI Robot"
          className='w-full h-auto object-contain max-lg:opacity-15 max-lg:scale-110'
        />
      </div>

      {/* Right: Glassmorphism Card */}
      <div className='
        relative z-10
        flex flex-col items-center justify-center text-center
        w-full max-w-lg md:w-155
        min-h-fit md:min-h-105
        px-6 sm:px-10 md:px-14
        py-8 sm:py-10 md:py-12
        rounded-2xl
        border border-blue-200/60
        backdrop-blur-3xl
        shadow-xl
        overflow-hidden
      '>

        {/* Decorative circuit dots */}
        <div className='absolute animate-pulse top-4 right-6 w-4 h-4 rounded-full bg-blue-300'></div>
        <div className='absolute animate-pulse top-8 right-13 w-2 h-2 rounded-full bg-pink-300'></div>
        <div className='absolute animate-pulse bottom-6 left-8 w-1.5 h-1.5 rounded-full bg-blue-300'></div>

        {/* 404 Heading */}
        <h1 className='relative text-5xl sm:text-6xl md:text-7xl font-black text-white/90 tracking-tight mb-4 md:mb-6 font-spaceG'>
          404 - LOST
        </h1>

        {/* Subtitle */}
        <p className='relative text-base sm:text-lg md:text-xl text-white/70 font-medium leading-relaxed mb-7 md:mb-10 max-w-xs sm:max-w-sm'>
          This section is under digital construction or no longer exists.
        </p>

        {/* Button */}
        <Link
          to='/'
          className='group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3
                     border-2 border-white/90 rounded-lg
                     text-white/90 font-semibold text-sm sm:text-base
                     hover:text-white
                     transition-all duration-200 hover:border-white
                     shadow-white/70 hover:shadow-sm active:scale-95'
        >
          Go back to Home
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className='fill-[#E8ECF9] group-hover:fill-white transition-colors duration-200'>
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default NotFound