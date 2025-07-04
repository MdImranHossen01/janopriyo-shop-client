import { Link } from 'react-router';
import { FiArrowRight } from 'react-icons/fi';

// You can fetch this data from your backend
const categories = [
  { name: 'Indoor Plants', imageUrl: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg', link: '/category/indoor' },
  { name: 'Outdoor Plants', imageUrl: 'https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg', link: '/category/outdoor' },
  { name: 'Succulents', imageUrl: 'https://images.pexels.com/photos/1856426/pexels-photo-1856426.jpeg', link: '/category/succulents' },
  { name: 'Gardening Tools', imageUrl: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg', link: '/category/tools' },
];

const CategorySection = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
          <p className="mt-4 text-lg text-gray-600">Find the perfect plant or tool for your needs.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {categories.map((category) => (
            <Link key={category.name} to={category.link} className="group block">
              <div className="relative h-64 w-full rounded-lg overflow-hidden group-hover:shadow-xl transition-shadow">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;