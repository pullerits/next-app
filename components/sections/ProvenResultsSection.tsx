export default function ProvenResultsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust our tracking technology to keep their valuables safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
            <div className="text-4xl font-bold mb-2">100,000</div>
            <div className="text-xl font-semibold mb-2">Tracking Cards Sold</div>
            <div className="text-blue-100">Trusted by customers worldwide</div>
          </div>
          
          <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
            <div className="text-4xl font-bold mb-2">6000+</div>
            <div className="text-xl font-semibold mb-2">Reviews</div>
            <div className="text-blue-100">Average 4.8/5 star rating</div>
          </div>
          
          <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
            <div className="text-4xl font-bold mb-2">5000+</div>
            <div className="text-xl font-semibold mb-2">Wallets Found</div>
            <div className="text-blue-100">Items successfully recovered</div>
          </div>
        </div>
      </div>
    </section>
  );
}