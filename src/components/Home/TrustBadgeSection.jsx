import { FiAward, FiTruck, FiShield, FiMessageSquare } from 'react-icons/fi';

const features = [
  { name: 'Premium Quality', description: 'Hand-picked and healthy plants, guaranteed.', icon: FiAward },
  { name: 'Fast Shipping', description: 'Delivered to your doorstep, quickly and safely.', icon: FiTruck },
  { name: 'Secure Payments', description: 'Your transactions are safe with us.', icon: FiShield },
  { name: 'Expert Support', description: 'Our plant experts are here to help you.', icon: FiMessageSquare },
];

const TrustBadgeSection = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Shop With Janopriyo?</h2>
          <p className="mt-4 text-lg text-gray-600">We provide the best for you and your green friends.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {features.map((feature) => (
            <div key={feature.name} className="px-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mx-auto">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadgeSection;