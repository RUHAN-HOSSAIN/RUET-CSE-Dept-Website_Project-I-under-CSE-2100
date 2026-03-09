import { Link } from "react-router-dom"

/**
 * NewsEventsCard
 * Props:
 *   imgURL      {string}
 *   title       {string}
 *   date        {string}
 *   description {string}  — long text, clamped to 3 lines with ellipsis
 */
const NewsEventsCard = ({ imgURL, title, date, description }) => {
  return (
    <div className="flex flex-col group cursor-pointer">

      {/* Image — zooms on card hover */}
      <div className="relative w-full overflow-hidden bg-light-blue/30" style={{ paddingBottom: '62.5%' }}>
        <img
          src={imgURL || '/RUET-logo.png'}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="font-poppins flex-1 flex flex-col" style={{ paddingTop: 'clamp(0.6rem, 1.2vw, 1rem)' }}>

        {/* Date */}
        <p
          className="text-dark-blue-0 font-medium"
          style={{ fontSize: 'clamp(0.8rem, 1vw, 0.95rem)' }}
        >{date}</p>

        {/* Title */}
        <p
          className="font-dmSans font-semibold text-black/85 group-hover:text-dark-blue-0 transition-colors duration-200"
          style={{
            fontSize:   'clamp(1rem, 1.15vw, 1.1rem)',
            lineHeight: 1.5,
            margin:     'clamp(0.4rem, 0.8vw, 0.75rem) 0 clamp(0.25rem, 0.5vw, 0.4rem)',
          }}
        >{title}</p>

        {/* Description — max 3 lines, ellipsis */}
        {description && (
          <p
            className="text-black/55 flex-1"
            style={{
              fontSize:          'clamp(0.8rem, 0.95vw, 0.9rem)',
              lineHeight:        1.6,
              display:           '-webkit-box',
              WebkitLineClamp:   3,
              WebkitBoxOrient:   'vertical',
              overflow:          'hidden',
            }}
          >{description}</p>
        )}

      </div>
    </div>
  )
}

export default NewsEventsCard


// import { Link } from "react-router-dom"

// const NewsEventsCard = ({ imgURL, title, date }) => {
//   return (
//     <div className="flex flex-col group cursor-pointer">

//       {/* Image — zooms on card hover */}
//       <div className="relative w-full overflow-hidden bg-light-blue/30" style={{ paddingBottom: '62.5%' }}>
//         <img
//           src={imgURL || '/RUET-logo.png'}
//           alt={title}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//       </div>

//       {/* Content */}
//       <div className="font-poppins flex-1 flex flex-col" style={{ paddingTop: 'clamp(0.6rem, 1.2vw, 1rem)' }}>

//         {/* Date */}
//         <p
//           className="text-dark-blue-0 font-medium"
//           style={{ fontSize: 'clamp(0.8rem, 1vw, 0.95rem)' }}
//         >{date}</p>

//         {/* Title — color changes on card hover */}
//         <p
//           className="font-semibold text-black/85 group-hover:text-dark-blue-0 transition-colors duration-200 flex-1"
//           style={{
//             fontSize:   'clamp(1rem, 1.15vw, 1.1rem)',
//             lineHeight: 1.5,
//             margin:     'clamp(0.4rem, 0.8vw, 0.75rem) 0',
//           }}
//         >{title}</p>

//       </div>
//     </div>
//   )
// }

// export default NewsEventsCard