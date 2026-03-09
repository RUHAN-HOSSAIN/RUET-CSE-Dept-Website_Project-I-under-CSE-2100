import { Link } from "react-router-dom"

/**
 * Breadcrumb
 * Props:
 *   current {string} — label of the current page shown after "Home >"
 */
const Breadcrumb = ({ current }) => {
  return (
    <div
      className="min-h-5 w-full relative flex items-center justify-start font-poppins font-medium bg-dark-blue-0 text-white"
      style={{
        paddingTop:    'clamp(0.6rem, 1.2vw, 1rem)',
        paddingBottom: 'clamp(0.6rem, 1.2vw, 1rem)',
        paddingLeft:   'clamp(1.25rem, 6vw, 7.5rem)',
        paddingRight:  'clamp(1.25rem, 6vw, 7.5rem)',
        fontSize:      'clamp(0.8rem, 1.1vw, 1rem)',
      }}
    >
      <Link to='/' className="cursor-pointer flex pr-1.5 hover:text-light-blue relative group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="fill-white group-hover:fill-light-blue"
          style={{ width: 'clamp(18px, 2vw, 24px)', height: 'clamp(18px, 2vw, 24px)' }}
        >
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
        </svg>
        &nbsp; Home
      </Link>
      &gt;
      <span className="hover:text-light-blue underline underline-offset-2 px-1.5">{current}</span>
    </div>
  )
}

export default Breadcrumb