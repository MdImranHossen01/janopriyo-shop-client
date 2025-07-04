import { FaStar } from 'react-icons/fa';

const testimonials = [
  { quote: "My plants arrived in perfect condition! The packaging was amazing. I'll definitely be ordering again.", name: 'Ayesha Khan', city: 'Dhaka', avatar: 'https://i.ibb.co/6n21hXH/user.png' },
  { quote: "The customer service team was so helpful in helping me choose the right plant for my apartment. Highly recommended!", name: 'Rohan Ahmed', city: 'Chittagong', avatar: 'https://i.ibb.co/6n21hXH/user.png' },
  { quote: "An incredible selection of rare plants you can't find anywhere else. Janopriyo.shop is my new favorite!", name: 'Fatima Chowdhury', city: 'Sylhet', avatar: 'https://i.ibb.co/6n21hXH/user.png' },
];

const TestimonialSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600">We are trusted by thousands of plant lovers across Bangladesh.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center text-yellow-400 gap-1">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="mt-4 text-lg font-medium text-gray-900">"{testimonial.quote}"</p>
              <footer className="mt-6">
                <div className="flex items-center">
                  <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-base text-gray-600">{testimonial.city}</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;