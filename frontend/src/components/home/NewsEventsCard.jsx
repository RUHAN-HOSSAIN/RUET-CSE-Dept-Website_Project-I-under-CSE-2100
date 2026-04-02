const HomeNewsEventsCard = ({ imgURL, isoDate, title, description }) => {
  // Parse date for the badge overlay
  const parsedDate = isoDate ? new Date(isoDate) : null;
  const day = parsedDate
    ? String(parsedDate.getDate()).padStart(2, "0")
    : null;
  const yearMonth = parsedDate
    ? `${parsedDate.getFullYear()}.${String(parsedDate.getMonth() + 1).padStart(2, "0")}`
    : null;

  return (
    <div className="flex gap-5 py-2 group cursor-pointer">
      {/* Image with date badge */}
      <div className="relative shrink-0 w-30 md:w-40 lg:w-54 aspect-video">
        <div className="w-full h-full overflow-hidden">
          <img
            src={imgURL}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Date badge — bottom-left | z-10 ensures it renders above the image */}
        {day && yearMonth && (
          <div className="absolute bottom-2 -left-2 z-10 bg-blue text-white p-1 leading-tight">
            <span className="flex justify-center text-sm sm:text-md md:text-lg font-spaceG leading-none">
              {day}
            </span>
            <span className="block text-[9px] sm:text-[10px] tracking-wide opacity-90">
              {yearMonth}
            </span>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-start gap-2 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-orange-500 transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeNewsEventsCard;




// const HomeNewsEventsCard = ({ imgURL, date, isoDate, title, description }) => {
//   // Parse date for the badge overlay
//   const parsedDate = isoDate ? new Date(isoDate) : null;
//   const day = parsedDate
//     ? String(parsedDate.getDate()).padStart(2, "0")
//     : null;
//   const yearMonth = parsedDate
//     ? `${parsedDate.getFullYear()}.${String(parsedDate.getMonth() + 1).padStart(2, "0")}`
//     : null;

//   return (
//     <div className="flex gap-5 py-2 group cursor-pointer">
//       {/* Image with date badge */}
//       <div className="relative shrink-0 w-56 aspect-video overflow-hidden">
//         <img
//           src={imgURL}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />

//         {/* Date badge — bottom-left */}
//         {day && yearMonth && (
//           <div className="absolute bottom-0 left-0 z-10 bg-blue text-white px-3 py-1.5 leading-tight">
//             <span className="block text-2xl font-bold font-spaceG leading-none">
//               {day}
//             </span>
//             <span className="block text-xs tracking-wide opacity-90">
//               {yearMonth}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Text content */}
//       <div className="flex flex-col justify-start gap-2 min-w-0">
//         <h3 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-blue transition-colors duration-200 line-clamp-2">
//           {title}
//         </h3>
//         {description && (
//           <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
//             {description}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeNewsEventsCard;