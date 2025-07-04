import CategorySection from '../../components/Home/CategorySection'
import HomeBanner from '../../components/Home/HomeBanner'
import NewsletterSection from '../../components/Home/NewsletterSection'
import Plants from '../../components/Home/Plants'
import TestimonialSection from '../../components/Home/TestimonialSection'
import TrustBadgeSection from '../../components/Home/TrustBadgeSection'

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <Plants />
      <CategorySection></CategorySection>
      <TrustBadgeSection></TrustBadgeSection>
      <TestimonialSection></TestimonialSection>
      <NewsletterSection></NewsletterSection>
    </div>
  )
}

export default Home
