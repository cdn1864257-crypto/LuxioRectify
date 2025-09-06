export function ReviewsSection() {
  const reviews = [
    {
      rating: 5,
      text: "Amazing quality and fast delivery. The iPhone 15 Pro exceeded my expectations. Luxio's customer service is top-notch!",
      author: 'Maria Johnson',
      initials: 'MJ'
    },
    {
      rating: 5,
      text: "Love my new Apple Watch! Great discounts and the checkout process was smooth. Will definitely order again from Luxio.",
      author: 'David Smith',
      initials: 'DS'
    },
    {
      rating: 5,
      text: "The electric scooter arrived perfectly packaged. Great build quality and the free assembly service was excellent!",
      author: 'Elena Brown',
      initials: 'EB'
    }
  ];

  return (
    <section className="py-16" data-testid="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground">Real reviews from verified purchases</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-sm" data-testid={`review-${index}`}>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">{review.rating}.0</span>
              </div>
              <p className="text-muted-foreground mb-4" data-testid={`review-text-${index}`}>
                "{review.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {review.initials}
                </div>
                <div className="ml-3">
                  <div className="font-medium" data-testid={`review-author-${index}`}>{review.author}</div>
                  <div className="text-sm text-muted-foreground">Verified Purchase</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
