import { Link } from 'react-router';

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-500 to-green-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/leaf-pattern-background-vector_53876-140885.jpg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover Amazing Products
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-lg">
              Shop the latest trends and enjoy exclusive deals on thousands of products. Quality you can trust at prices you'll love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/shop" 
                className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-center transition duration-300 shadow-lg"
              >
                Shop Now
              </Link>
              <Link 
                to="/deals" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-6 py-3 rounded-lg font-semibold text-center transition duration-300"
              >
                View Deals
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg" 
              alt="Shopping Banner"
              className="w-full max-w-md rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white transform -skew-y-2 origin-top-left"></div>
    </div>
  );
};

export default HomeBanner;