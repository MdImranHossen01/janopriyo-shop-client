import CategorySection from '../../components/Home/CategorySection';
import HomeBanner from '../../components/Home/HomeBanner';
import NewsletterSection from '../../components/Home/NewsletterSection';
import Plants from '../../components/Home/Plants';
import TestimonialSection from '../../components/Home/TestimonialSection';
import TrustBadgeSection from '../../components/Home/TrustBadgeSection';

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <Plants />
      <CategorySection />
      <TrustBadgeSection />
      <TestimonialSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
