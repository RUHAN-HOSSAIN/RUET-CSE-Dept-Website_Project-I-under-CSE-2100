
import LowerbgImg from "../../assets/bottom-6.png";

const HomeLowerBody = () => {
  return (

    <div className="w-full relative overflow-hidden pt-10 sm:pt-15 md:pt-20">
      <div
        className="absolute inset-0 -z-5"
        style={{
          backgroundImage: `radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #BBDCFF 100%)`,
          backgroundSize: "100% 100%",
        }}
      />
      <img src={LowerbgImg} className="w-full z-5" alt="Lower Body Background" />
    </div>

  )
}

export default HomeLowerBody