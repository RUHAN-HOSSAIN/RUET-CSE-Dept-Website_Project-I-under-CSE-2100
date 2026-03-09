import { Link } from 'react-router-dom'

import deskphoneIcon from '../../assets/icons/deskphone-icon.svg'
import callIcon      from '../../assets/icons/call-icon.svg'

import { contactInfo, aboutRUET, importantLinks } from '../../constants/footerData'

const Footer = () => {
  return (
    <footer className="bottom-0 w-screen">

      <div className="w-screen bg-linear-to-t from-light-blue to-white relative">

        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
            `,
          }}
        />

        <hr className="text-blue pt-10" />

        {/* ── Main Footer Grid ── */}
        <div
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 text-gray-blue"
          style={{
            paddingLeft:   'clamp(1.25rem, 5vw, 5rem)',
            paddingRight:  'clamp(1.25rem, 5vw, 5rem)',
            paddingTop:    'clamp(2.5rem, 5vw, 5rem)',
            paddingBottom: 'clamp(2.5rem, 5vw, 5rem)',
          }}
        >

          {/* Contact */}
          <div
            className="font-poppins z-10"
            style={{ padding: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
          >
            <h3
              className="font-medium text-black"
              style={{
                fontSize:     'clamp(1.2rem, 1.6vw, 1.4rem)',
                marginBottom: 'clamp(0.75rem, 1.2vw, 1.25rem)',
              }}
            >{contactInfo.title}</h3>
            <div style={{ fontSize: 'clamp(0.95rem, 1.05vw, 1rem)', lineHeight: 1.85 }}>
              <p>{contactInfo.office}</p>
              <p>{contactInfo.university}</p>
              <p style={{ paddingBottom: 'clamp(0.5rem, 0.8vw, 0.75rem)' }}>{contactInfo.address}</p>
              <p className="flex">
                <img src={deskphoneIcon} className="w-5 shrink-0" />&nbsp;{contactInfo.deskPhoneNum}
              </p>
              <p className="flex">
                <img src={callIcon} className="w-5 shrink-0" />&nbsp;{contactInfo.callNum}
              </p>
              <a href={contactInfo.email.link} className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 shrink-0 fill-gray-blue">
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Z" />
                </svg>&nbsp;
                <span className="hover:text-blue/80 hover:underline underline-offset-2 transition-colors duration-200">{contactInfo.email.text}</span>
              </a>
              <a href={contactInfo.website.link} target="_blank" className="inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 shrink-0 fill-gray-blue">
                  <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z" />
                </svg>&nbsp;
                <span className="hover:text-blue/80 hover:underline underline-offset-2 transition-colors duration-200">{contactInfo.website.text}</span>
              </a>
            </div>
          </div>

          {/* About RUET */}
          <div
            className="font-poppins z-10"
            style={{ padding: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
          >
            <h3
              className="font-medium text-black"
              style={{
                fontSize:     'clamp(1.2rem, 1.6vw, 1.4rem)',
                marginBottom: 'clamp(0.75rem, 1.2vw, 1.25rem)',
              }}
            >{aboutRUET.title}</h3>
            <p
              className="text-gray-blue"
              style={{
                fontSize:      'clamp(0.95rem, 1.05vw, 1rem)',
                lineHeight:    1.85,
                paddingBottom: 'clamp(0.75rem, 1.2vw, 1.25rem)',
              }}
            >{aboutRUET.description}</p>
            <Link to={aboutRUET.button.link}>
              <button
                className="bg-white relative overflow-hidden border border-light-blue rounded-full font-medium group"
                style={{
                  fontSize:      'clamp(0.95rem, 1.05vw, 1rem)',
                  paddingTop:    'clamp(0.35rem, 0.5vw, 0.5rem)',
                  paddingBottom: 'clamp(0.35rem, 0.5vw, 0.5rem)',
                  paddingLeft:   'clamp(1.5rem, 2.5vw, 2.5rem)',
                  paddingRight:  'clamp(1.5rem, 2.5vw, 2.5rem)',
                }}
              >
                <span className="relative z-10 text-black/80 group-hover:text-white transition duration-300">
                  {aboutRUET.button.text}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-0 bg-blue transition-all duration-400 ease-out group-hover:h-full" />
              </button>
            </Link>
          </div>

          {/* Important Links */}
          <div
            className="md:col-span-2 lg:col-span-1 max-w-170 font-poppins z-10"
            style={{ padding: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
          >
            <h3
              className="font-medium text-black"
              style={{
                fontSize:     'clamp(1.2rem, 1.6vw, 1.4rem)',
                marginBottom: 'clamp(0.75rem, 1.2vw, 1.25rem)',
              }}
            >{importantLinks.title}</h3>
            <div
              className="flex justify-between min-w-70"
              style={{ fontSize: 'clamp(0.95rem, 1.05vw, 1rem)', lineHeight: 1.85 }}
            >
              {importantLinks.columns.map((column, i) => (
                <ul key={i} className="[&>li]:cursor-pointer [&>li]:transition-colors [&>li]:duration-200">
                  {column.map((item) => (
                    <li key={item.text} className="hover:text-blue hover:underline underline-offset-2">
                      {item.link.startsWith('http') ? (
                        <a href={item.link} target="_blank" rel="noreferrer">{item.text}</a>
                      ) : (
                        <Link to={item.link}>{item.text}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

        </div>

        <hr className="text-dark-blue-0" />

        {/* ── Bottom Footer ── */}
        <div
          className="flex justify-between items-center max-sm:flex-col font-poppins font-medium text-gray-blue"
          style={{
            paddingLeft:   'clamp(1.25rem, 5vw, 5rem)',
            paddingRight:  'clamp(1.25rem, 5vw, 5rem)',
            paddingTop:    'clamp(1.5rem, 3vw, 2.5rem)',
            paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontSize:      'clamp(0.78rem, 1vw, 1rem)',
            gap:           'clamp(0.5rem, 1vw, 0)',
          }}
        >
          <p>Copyright <span style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}>&copy;</span> {new Date().getFullYear()} RUET • All Right Reserved</p>
          <p>Department of Computer Science & Engineering</p>
          {/* <p>Developed With ♡ By RUHAN</p> */}
        </div>

      </div>
    </footer>
  )
}

export default Footer





// import { Link } from 'react-router-dom'

// import deskphoneIcon from '../../assets/icons/deskphone-icon.svg'
// import callIcon from '../../assets/icons/call-icon.svg'

// import { contactInfo, aboutRUET, importantLinks } from '../../constants/footerData'

// const Footer = () => {
//   return (
//     <footer className=' bottom-0 w-screen'>
      
//       <div className="w-screen bg-linear-to-t from-light-blue to-white relative">
//         {/* Background Pattern */}
//         <div
//           className="absolute inset-0 z-0 pointer-events-none"
//           style={{
//             backgroundImage: `
//               repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
//               repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
//               repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
//               repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
//             `,
//           }}
//         />

//         <hr className='text-blue pt-10' />
//         {/* Main Footer */}
//         <div className="px-5 sm:px-10 md:px-15 xl:px-20 py-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 text-gray-blue">

//           {/* Contact */}
//           <div className="py-5 px-5 leading-7 font-poppins z-10">
//             <h3 className="font-medium text-[22px] mb-5 text-black">{contactInfo.title}</h3>
//             <p>{contactInfo.office}</p>
//             <p>{contactInfo.university}</p>
//             <p className="pb-3">{contactInfo.address}</p>
//             <p className="flex">
//               <img src={deskphoneIcon} className="w-5" />&nbsp;{contactInfo.deskPhoneNum}
//             </p>
//             <p className="flex">
//               <img src={callIcon} className="w-5" />&nbsp;{contactInfo.callNum}
//             </p>
//             {/* external → <a> */}
//             <a href={contactInfo.email.link} className="hover:text-black/80 flex">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 fill-gray-blue">
//                 <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Z" />
//               </svg>&nbsp;
//               <span className='hover:text-blue/80 hover:underline transition-colors duration-200'>{contactInfo.email.text}</span>
//             </a>
//             {/* external → <a> */}
//             <a href={contactInfo.website.link} target="_blank" className="flex">
//               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="w-5 fill-gray-blue">
//                 <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z" />
//               </svg>&nbsp;
//               <span className='hover:text-blue/80 hover:underline transition-colors duration-200'>{contactInfo.website.text}</span>
//             </a>
//           </div>

//           {/* About RUET */}
//           <div className="px-5 py-5 leading-7 font-poppins z-10">
//             <h3 className="font-medium text-[22px] mb-5 text-black">{aboutRUET.title}</h3>
//             <p className="pb-5">{aboutRUET.description}</p>
//             {/* CHANGE: <a href> → <Link to> (internal route) */}
//             <Link to={aboutRUET.button.link}>
//               <button className="bg-white relative overflow-hidden px-10 py-2 border border-light-blue rounded-full font-medium text-md group">
//                 <span className="relative z-10 text-black/90 group-hover:text-white transition duration-300">
//                   {aboutRUET.button.text}
//                 </span>
//                 <span className="absolute inset-x-0 bottom-0 h-0 bg-blue transition-all duration-500 ease-out group-hover:h-full"></span>
//               </button>
//             </Link>
//           </div>

//           {/* Important Links */}
//           <div className="px-5 py-5 md:col-span-2 lg:col-span-1 max-w-170 leading-7 font-poppins z-10">
//             <h3 className="font-medium text-[22px] mb-5 text-black">{importantLinks.title}</h3>
//             <div className="flex justify-between min-w-70">
//               {importantLinks.columns.map((column, i) => (
//                 <ul key={i} className="[&>li]:cursor-pointer [&>li]:transition-colors [&>li]:duration-200">
//                   {column.map((item) => (
//                     <li key={item.text} className="hover:text-blue hover:underline">
//                       {item.link.startsWith('http') ? (
//                         <a href={item.link} target="_blank" rel="noreferrer">{item.text}</a>
//                       ) : (
//                         <Link to={item.link}>{item.text}</Link>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               ))}
//             </div>
//           </div>

//         </div>

//         <hr className="text-dark-blue-0" />

//         {/* Bottom Footer */}
//         <div
//           className="flex justify-between items-center max-[920px]:flex-col font-poppins font-medium text-gray-blue"
//           style={{
//             paddingLeft:   'clamp(1.25rem, 5vw, 5rem)',
//             paddingRight:  'clamp(1.25rem, 5vw, 5rem)',
//             paddingTop:    'clamp(1.5rem, 3vw, 2.5rem)',
//             paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
//             fontSize:      'clamp(0.78rem, 1vw, 0.95rem)',
//             gap:           'clamp(0.5rem, 1vw, 0)',
//           }}
//         >
//           <p>Copyright <span style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}>&copy;</span> {new Date().getFullYear()} RUET • All Right Reserved</p>
//           <p>Department of Computer Science & Engineering</p>
//         </div>

//       </div>
//     </footer>
//   )
// }

// export default Footer