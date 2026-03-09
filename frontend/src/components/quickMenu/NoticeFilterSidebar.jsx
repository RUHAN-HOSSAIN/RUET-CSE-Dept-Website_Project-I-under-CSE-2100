import searchIcon from '../../assets/icons/search-icon.svg'

const NoticeFilterSidebar = ({
  filterOpen,
  searchInput, selectedCat, fromDate, toDate,
  noticeTypes,
  onSearchInput, onCatSelect, onFromDate, onToDate,
  onSearch, onReset,
}) => {
  if (!filterOpen) return null

  const fLabel = { fontSize: 'clamp(0.85rem, 1.15vw, 1.2rem)',  fontWeight: 600 }
  const fInput = { fontSize: 'clamp(0.78rem, 1.05vw, 1.1rem)'  }
  const fChip  = { fontSize: 'clamp(0.7rem, 0.9vw,  0.95rem)' }
  const fBtn   = { fontSize: 'clamp(0.78rem, 1.05vw, 1.1rem)'  }

  const dateInputStyle = {
    ...fInput,
    padding: 'clamp(0.28rem, 0.55vw, 0.5rem) clamp(0.45rem, 0.9vw, 0.9rem)',
  }

  return (
    <div
      className="hidden md:flex flex-col bg-[#F5FAFF] border border-l-0 border-light-blue max-h-fit md:sticky shrink-0"
      style={{
        top:     'var(--header-height)',
        width:   'clamp(190px, 21vw, 350px)',
        padding: 'clamp(1.25rem, 2.5vw, 2.5rem)',
        gap:     'clamp(0.75rem, 1.4vw, 1.25rem)',
      }}
    >
      {/* Title search */}
      <div>
        <h2 className="font-semibold text-gray-blue" style={{ ...fLabel, marginBottom: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}>
          Title / Heading
        </h2>
        <div className="relative flex items-center bg-white border border-blue rounded-full">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={e => onSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSearch()}
            className="font-medium outline-none text-black/65 w-full rounded-full"
            style={{
              ...fInput,
              padding: 'clamp(0.3rem, 0.55vw, 0.5rem) clamp(1.8rem, 2.8vw, 2.4rem) clamp(0.3rem, 0.55vw, 0.5rem) clamp(0.7rem, 1.1vw, 1.2rem)',
            }}
          />
          <img src={searchIcon} className="absolute right-3 w-4" alt="search" />
        </div>
      </div>

      {/* Category chips */}
      <div>
        <h2 className="font-semibold text-gray-blue" style={{ ...fLabel, marginBottom: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}>
          Category
        </h2>
        <div className="flex flex-wrap" style={{ gap: 'clamp(0.25rem, 0.45vw, 0.45rem)' }}>
          {noticeTypes.map(type => (
            <div
              key={type}
              onClick={() => onCatSelect(type)}
              className={`text-white font-poppins rounded-full cursor-pointer transition-colors duration-200 ${
                selectedCat === type
                  ? 'bg-blue ring-2 ring-blue ring-offset-1'
                  : 'bg-blue/50 hover:bg-blue'
              }`}
              style={{ ...fChip, padding: 'clamp(0.15rem, 0.28vw, 0.25rem) clamp(0.45rem, 0.85vw, 0.75rem)' }}
            >{type}</div>
          ))}
        </div>
      </div>

      {/* From Date */}
      <div>
        <h2 className="font-semibold text-gray-blue" style={{ ...fLabel, marginBottom: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}>
          From Date
        </h2>
        <input
          type="date"
          value={fromDate}
          max={toDate || undefined}
          onChange={e => onFromDate(e.target.value)}
          className="w-full bg-white border border-blue text-black/70 font-poppins outline-none"
          style={dateInputStyle}
        />
      </div>

      {/* To Date */}
      <div>
        <h2 className="font-semibold text-gray-blue" style={{ ...fLabel, marginBottom: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}>
          To Date
        </h2>
        <input
          type="date"
          value={toDate}
          min={fromDate || undefined}
          onChange={e => onToDate(e.target.value)}
          className="w-full bg-white border border-blue text-black/70 font-poppins outline-none"
          style={dateInputStyle}
        />
      </div>

      {/* Buttons */}
      <div className="flex" style={{ gap: 'clamp(0.6rem, 1.1vw, 1.1rem)' }}>
        <button
          onClick={onReset}
          className="text-blue border-2 border-blue transition-colors duration-200 hover:bg-blue/10"
          style={{ ...fBtn, padding: 'clamp(0.2rem, 0.38vw, 0.35rem) clamp(0.5rem, 0.9vw, 0.85rem)' }}
        >Reset</button>
        <button
          onClick={onSearch}
          className="bg-blue text-white transition-colors duration-200 hover:bg-blue/80"
          style={{ ...fBtn, padding: 'clamp(0.2rem, 0.38vw, 0.35rem) clamp(0.5rem, 0.9vw, 0.85rem)' }}
        >Search</button>
      </div>
    </div>
  )
}

export default NoticeFilterSidebar



// import searchIcon from '../../assets/icons/search-icon.svg'
// import CustomDatePicker from './CustomDatePicker'

// const NoticeFilterSidebar = ({
//   filterOpen,
//   searchInput, selectedCat, fromDate, toDate,
//   noticeTypes,
//   onSearchInput, onCatSelect, onFromDate, onToDate,
//   onSearch, onReset,
// }) => {
//   if (!filterOpen) return null

//   const fLabel = { fontSize: 'clamp(0.85rem, 1.15vw, 1.2rem)',  fontWeight: 600 }
//   const fInput = { fontSize: 'clamp(0.78rem, 1.05vw, 1.1rem)'  }
//   const fChip  = { fontSize: 'clamp(0.68rem, 0.9vw,  0.95rem)' }
//   const fBtn   = { fontSize: 'clamp(0.78rem, 1.05vw, 1.1rem)'  }

//   const dateInputStyle = {
//     ...fInput,
//     padding: 'clamp(0.28rem, 0.55vw, 0.5rem) clamp(0.45rem, 0.9vw, 0.9rem)',
//   }

//   return (
//     <div
//       className="hidden md:flex flex-col bg-[#F5FAFF] border border-l-0 border-light-blue max-h-fit md:sticky shrink-0"
//       style={{
//         top:     'var(--header-height)',
//         width:   'clamp(190px, 21vw, 350px)',
//         padding: 'clamp(1.25rem, 2.5vw, 2.5rem)',
//         gap:     'clamp(0.75rem, 1.4vw, 1.25rem)',
//       }}
//     >
//       {/* Title search */}
//       <div>
//         <h2 className="font-semibold text-gray-blue" style={{ ...fLabel, marginBottom: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}>
//           Title / Heading
//         </h2>
//         <div className="relative flex items-center bg-white border border-blue rounded-full">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchInput}
//             onChange={e => onSearchInput(e.target.value)}
//             onKeyDown={e => e.key === 'Enter' && onSearch()}
//             className="font-medium outline-none text-black/65 w-full rounded-full"
//             style={{
//               ...fInput,
//               padding: 'clamp(0.3rem, 0.55vw, 0.5rem) clamp(1.8rem, 2.8vw, 2.4rem) clamp(0.3rem, 0.55vw, 0.5rem) clamp(0.7rem, 1.1vw, 1.2rem)',
//             }}
//           />
//           <img src={searchIcon} className="absolute right-3 w-4" alt="search" />
//         </div>
//       </div>

//       {/* Category chips */}
//       <div>
//         <h2 className="font-semibold text-gray-blue" style={{ ...fLabel, marginBottom: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}>
//           Category
//         </h2>
//         <div className="flex flex-wrap" style={{ gap: 'clamp(0.25rem, 0.45vw, 0.45rem)' }}>
//           {noticeTypes.map(type => (
//             <div
//               key={type}
//               onClick={() => onCatSelect(type)}
//               className={`text-white font-poppins rounded-full cursor-pointer transition-colors duration-200 ${
//                 selectedCat === type
//                   ? 'bg-blue ring-2 ring-blue ring-offset-1'
//                   : 'bg-blue/50 hover:bg-blue'
//               }`}
//               style={{ ...fChip, padding: 'clamp(0.15rem, 0.28vw, 0.25rem) clamp(0.45rem, 0.85vw, 0.75rem)' }}
//             >{type}</div>
//           ))}
//         </div>
//       </div>

//       {/* From Date */}
//       <div>
//         <h2 className="font-semibold text-gray-blue" style={{ ...fLabel, marginBottom: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}>
//           From Date
//         </h2>
//         <CustomDatePicker
//           value={fromDate}
//           onChange={onFromDate}
//           max={toDate || undefined}
//           placeholder="Start date"
//           inputStyle={dateInputStyle}
//         />
//       </div>

//       {/* To Date */}
//       <div>
//         <h2 className="font-semibold text-gray-blue" style={{ ...fLabel, marginBottom: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}>
//           To Date
//         </h2>
//         <CustomDatePicker
//           value={toDate}
//           onChange={onToDate}
//           min={fromDate || undefined}
//           placeholder="End date"
//           inputStyle={dateInputStyle}
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex" style={{ gap: 'clamp(0.6rem, 1.1vw, 1.1rem)' }}>
//         <button
//           onClick={onReset}
//           className="text-blue border-2 border-blue transition-colors duration-200 hover:bg-blue/10"
//           style={{ ...fBtn, padding: 'clamp(0.2rem, 0.38vw, 0.35rem) clamp(0.5rem, 0.9vw, 0.85rem)' }}
//         >Reset</button>
//         <button
//           onClick={onSearch}
//           className="bg-blue text-white transition-colors duration-200 hover:bg-blue/80"
//           style={{ ...fBtn, padding: 'clamp(0.2rem, 0.38vw, 0.35rem) clamp(0.5rem, 0.9vw, 0.85rem)' }}
//         >Search</button>
//       </div>
//     </div>
//   )
// }

// export default NoticeFilterSidebar