
import { Link } from "react-router-dom"

/**
 * Breadcrumb
 * Props:
 * paths {Array} — Array of path objects. Example: [{ label: 'News & Events', url: '/news-events' }, { label: 'Tech Fest 2026' }]
 */
const Breadcrumb = ({ paths = [] }) => {
  return (
    <div
      className="min-h-5 w-full relative flex items-center justify-start font-poppins font-medium bg-dark-blue-0 text-white flex-wrap gap-x-1"
      style={{
        paddingTop:    'clamp(0.6rem, 1.2vw, 1rem)',
        paddingBottom: 'clamp(0.6rem, 1.2vw, 1rem)',
        paddingLeft:   'clamp(1.25rem, 6vw, 7.5rem)',
        paddingRight:  'clamp(1.25rem, 6vw, 7.5rem)',
        fontSize:      'clamp(0.8rem, 1.1vw, 1rem)',
      }}
    >
      {/* Home (Always Clickable) */}
      <Link to='/' className="cursor-pointer flex items-center pr-1 hover:text-light-blue relative group transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="fill-white group-hover:fill-light-blue transition-colors"
          style={{ width: 'clamp(18px, 2vw, 24px)', height: 'clamp(18px, 2vw, 24px)' }}
        >
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
        </svg>
        <span className="ml-1.5">Home</span>
      </Link>

      {/* Dynamic Paths */}
      {paths.map((path, index) => {
        const isLastItem = index === paths.length - 1;

        return (
          <div key={index} className="flex items-center gap-x-1">
            <span>&gt;</span>
            
            {/* Jodi last item hoy ba url na thake, tahole underline hobe (Current Page) */}
            {isLastItem || !path.url ? (
              <span className="hover:text-light-blue underline underline-offset-2 px-1 transition-colors">
                {path.label}
              </span>
            ) : (
              /* Majhkhaner page hole clickable hobe */
              <Link to={path.url} className="hover:text-light-blue px-1 transition-colors">
                {path.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  )
}

export default Breadcrumb

