const NewsletterSection = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    alert('Thank you for subscribing!');
  };

  return (
    <div className="bg-green-700">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Join Our Green Family
        </h2>
        <p className="mt-4 text-lg leading-6 text-green-100">
          Get exclusive offers, plant care tips, and be the first to know about new arrivals.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
          <div className="w-full sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none w-full px-5 py-3 border border-transparent rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;