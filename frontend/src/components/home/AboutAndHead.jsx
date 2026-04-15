
import { Link } from "react-router-dom"
import HeadPhoto from '../../assets/SUZ.webp'
import { aboutData } from "../../constants/homeData"

// ── Sub-components ──────────────────────────────────────────

const MissionCard = () => (
  <div className='flex-1 bg-white p-4 min-[450px]:p-5 rounded-2xl border border-blue-100'>
    <h3 className='font-inter font-semibold flex justify-between pb-3'>
      Mission
      <Link to="/about/mission-vision" className="text-gray-400 font-normal text-xs sm:text-sm cursor-pointer hover:text-orange-400">Details &gt;</Link>
    </h3>
    <ul className='list-disc flex flex-col gap-1 pl-5 text-sm md:text-base'>
      <li><span className="line-clamp-1 min-[580px]:line-clamp-2">{aboutData.mission1}</span></li>
      <li><span className="line-clamp-1 min-[580px]:line-clamp-2">{aboutData.mission2}</span></li>
      <li><span className="line-clamp-1 min-[580px]:line-clamp-2">{aboutData.mission3}</span></li>
    </ul>
  </div>
)

const VisionCard = () => (
  <div className='flex-1 bg-white p-4 min-[450px]:p-5 rounded-2xl border border-blue-100'>
    <h3 className='font-inter font-semibold flex justify-between pb-3'>
      Vision
      <Link to="/about/mission-vision" className="text-gray-400 font-normal text-xs sm:text-sm cursor-pointer hover:text-orange-400">Details &gt;</Link>
    </h3>
    <p className="text-sm md:text-base line-clamp-3 min-[580px]:line-clamp-6">{aboutData.vision}</p>
  </div>
)

const HeadCard = () => (
  <div className="flex-2 bg-white p-4 min-[450px]:p-5 rounded-2xl border border-blue-100">
    <h3 className='font-inter font-semibold pb-3 flex justify-between text-sm sm:text-base'>
      Head of Department
      <Link to="/about/message-from-head" className="text-gray-400 font-normal text-xs sm:text-sm cursor-pointer hover:text-orange-400">Details &gt;</Link>
    </h3>
    <div className="flex flex-col min-[300px]:flex-row gap-3 rounded-3xl">
      <div className='flex-1 w-full h-full rounded-2xl overflow-hidden border border-blue-100'>
        <img src={HeadPhoto} className='w-full h-full object-cover' />
      </div>
      <div className='flex-3 bg-white p-3 min-[400px]:p-5 rounded-2xl border border-blue-100'>
        <h2 className='font-bold text-xs min-[400px]:text-sm lg:text-base xl:text-lg font-spaceG pb-3'>Dr. Md. Shahid Uz Zaman</h2>
        <hr className='text-blue-100' />
        <p className='font-poppins text-xs sm:text-sm mt-3 line-clamp-3'>{aboutData.headMsg}</p>
      </div>
    </div>
  </div>
)


// ── Main Component ───────────────────────────────────────────

const AboutAndHead = () => {
  return (
    <>
      <div className="w-screen py-15 px-5 min-[580px]:px-10 sm:p-15 md:p-20 xl:py-30 font-poppins bg-light-blue/5">

        <h1 className='z-5 flex items-center justify-center text-center text-blue font-bold font-inter text-[22px] sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl pb-5 sm:pb-7 md:pb-8 lg:pb-10 xl:pb-12'>
          About Computer Science & Engineering at RUET
        </h1>
        <p className='text-center mb-10 md:mb-15 xl:mb-20 text-sm md:text-base line-clamp-3 min-[580px]:line-clamp-4 lg:line-clamp-6'>
          {aboutData.description}
        </p>

        {/*
          Layout:
          - <sm:    stacked — Head, Mission, Vision
          - sm→lg:  Head উপরে, নিচে Mission + Vision পাশাপাশি
          - lg+:    Mission | Head | Vision (3 columns)
        */}

        {/* lg+ : 3-column */}
        <div className='hidden lg:flex flex-row gap-5 xl:gap-10'>
          <MissionCard />
          <HeadCard />
          <VisionCard />
        </div>

        {/* <lg : Head উপরে, Mission+Vision নিচে */}
        <div className='flex lg:hidden flex-col gap-5'>
          <HeadCard />
          <div className="flex flex-col min-[580px]:flex-row gap-5">
            <MissionCard />
            <VisionCard />
          </div>
        </div>

      </div>

      <hr className="text-blue" />
    </>
  )
}

export default AboutAndHead
