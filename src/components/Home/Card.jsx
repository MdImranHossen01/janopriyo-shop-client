import { Link } from 'react-router';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';

const Card = ({ plant, className = '' }) => {
  const { name, quantity, price, image, category, _id, discount } = plant || {};
  
  // Calculate discounted price if available
  const finalPrice = discount ? (price * (1 - discount / 100)).toFixed(2) : price;
  const isOutOfStock = quantity <= 0;

  return (
    <div className={`relative group ${className}`}>
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          {discount}% OFF
        </div>
      )}

      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl z-10">
          <span className="text-white font-bold text-lg bg-red-500 px-3 py-1 rounded-full">
            Sold Out
          </span>
        </div>
      )}

      <Link
        to={`/plant/${_id}`}
        className={`block cursor-pointer shadow-lg hover:shadow-xl p-4 rounded-xl bg-white transition-all duration-300 ${isOutOfStock ? 'opacity-80' : ''}`}
      >
        <div className="flex flex-col gap-3 w-full">
          {/* Image Container */}
          <div className="aspect-square w-full relative overflow-hidden rounded-lg">
            <img
              className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
              src={image}
              alt={name}
              loading="lazy"
            />

            {/* Quick Actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <button 
                className="bg-white p-2 rounded-full shadow-md hover:bg-green-50 hover:text-green-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Add to wishlist logic
                }}
              >
                <FiHeart size={18} />
              </button>
              <button 
                className="bg-white p-2 rounded-full shadow-md hover:bg-green-50 hover:text-green-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Quick view logic
                }}
              >
                <FiEye size={18} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-2 space-y-1">
            <span className="text-sm text-gray-500 block">{category}</span>
            <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-green-600 transition-colors">
              {name}
            </h3>
            
            {/* Price Section */}
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold text-lg text-gray-900">
                ${finalPrice}
              </span>
              {discount && (
                <span className="text-sm text-gray-500 line-through">
                  ${price}
                </span>
              )}
            </div>

            {/* Stock Indicator */}
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">
                {quantity > 0 ? (
                  <span className="text-green-600">{quantity} in stock</span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </div>
              
              {/* Add to Cart Button */}
              <button
                className={`p-2 rounded-full ${isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-100 text-green-600 hover:bg-green-200'} transition-colors`}
                disabled={isOutOfStock}
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic
                }}
              >
                <FiShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;