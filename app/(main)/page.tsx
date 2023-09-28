import FeaturesSection from '@/components/main/FeaturesSection';
import DeliverySection from '@/components/main/DeliverySection';
import BannerSection from '@/components/main/BannerSection';
import CatalogSection from '@/components/main/CatalogSection';

export default function Home() {
  return (
    <>
      <BannerSection />
      <CatalogSection />
      <FeaturesSection />
      <DeliverySection />
    </>
  );
}
