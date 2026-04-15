import formatDateToLocal from "../../utils/formatDateToLocal"


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
        <p className="text-blue text-sm sm:text-base">{formatDateToLocal(date)}</p>
        <h3 className="font-semibold text-md text-black/90 transition-colors duration-200 group-hover:text-orange-500 line-clamp-3 cursor-pointer">{title}</h3>
        <p className="text-gray-400 text-[13px] sm:text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  )
}

export default AchivementCampusLifeCard