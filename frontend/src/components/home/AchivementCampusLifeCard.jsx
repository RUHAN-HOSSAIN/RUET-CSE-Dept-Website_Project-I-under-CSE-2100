import formatDate from "../../utils/formatDate"


const AchivementCampusLifeCard = ({ imgURL, date, title, description }) => {
  return (
    <div className="group flex flex-col shadow-lg font-poppins h-full">
      <div className="w-full aspect-6/4 overflow-hidden">
        <img
          src={imgURL}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          alt=""
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <p className="text-blue text-sm sm:text-base">{formatDate(date)}</p>
        <h3 className="font-semibold text-md text-black/90 transition-colors duration-200 group-hover:text-orange-500 line-clamp-3 cursor-pointer">{title}</h3>
        <p className="text-gray-400 text-[13px] sm:text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  )
}

export default AchivementCampusLifeCard


// const AchivementCampusLifeCard = ({ imgURL, date, title, description }) => {
//   return (
//     <div className="group flex flex-col shadow-md hover:shadow-xl font-poppins
//                     transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden">

//       {/* Image — fixed 4:3 aspect ratio */}
//       <div className="w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
//         <img
//           src={imgURL}
//           className="w-full h-full object-cover transition-transform duration-500
//                      group-hover:scale-105"
//           alt={title}
//         />
//       </div>

//       {/* Content */}
//       <div className="p-5 flex flex-col gap-2 flex-1">
//         <p className="text-blue text-xs font-medium tracking-wide uppercase">{date}</p>
//         <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-gray-800
//                        group-hover:text-blue transition-colors duration-200">
//           {title}
//         </h3>
//         <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mt-auto">
//           {description}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default AchivementCampusLifeCard


// // const AchivementCampusLifeCard = ({ imgURL, date, title, description }) => {
// //   return (
// //     <div className="flex flex-col shadow-lg font-poppins">
// //         <div className="w-full aspect-6/4   overflow-hidden">
// //             <img src={imgURL} className="w-full h-full object-cover" alt="" />
// //         </div>

// //         <div className="p-5 flex flex-col gap-3">
// //             <p className="text-blue">{date}</p>
// //             <h3 className="font-semibold text-md">{title}</h3>
// //             <p className="text-gray-400 text-sm line-clamp-3">{description}</p>
// //         </div>
// //     </div>
// //   )
// // }

// // export default AchivementCampusLifeCard