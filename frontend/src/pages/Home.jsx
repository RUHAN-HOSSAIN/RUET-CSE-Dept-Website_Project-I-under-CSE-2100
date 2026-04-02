import Hero from "../components/home/Hero"
import AboutAndHead from "../components/home/AboutAndHead"
import HomeNoticeNews from "../components/home/HomeNoticeNews"
import HomeAchivement from "../components/home/HomeAchivement"
import HomeCampusLife from "../components/home/HomeCampusLife"
import HomeLowerBody from "../components/home/HomeLowerBody"

const Home = () => {
  return (
    <>
      <Hero />
      <AboutAndHead />
      <HomeNoticeNews />
      <HomeAchivement />
      <HomeCampusLife />
      <HomeLowerBody />
    </>
  )
}

export default Home