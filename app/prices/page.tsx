export default function PricesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Prices</h1>
      
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-center text-lg text-foreground mb-8">
          I understand it takes a lot of work to organise a large group of people. You can confirm the booking with a deposit, then settle the final amount nearer the time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Classic */}
        <div className="bg-white border-2 border-primary rounded-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Classic</h3>
            <p className="text-sm opacity-90">60 minutes (per person)</p>
          </div>
          <div className="p-6 text-center">
            <div className="text-5xl font-bold text-primary mb-6">£20</div>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Materials included</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">60 minute session</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Everything you'll need for a fun time.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Special */}
        <div className="bg-white border-2 border-primary rounded-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Special</h3>
            <p className="text-sm opacity-90">75 minutes (per person)</p>
          </div>
          <div className="p-6 text-center">
            <div className="text-5xl font-bold text-primary mb-6">£22</div>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Materials included</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">75 minute session</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Everything you'll need for a fun time.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ultimate */}
        <div className="bg-white border-2 border-primary rounded-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Ultimate</h3>
            <p className="text-sm opacity-90">90 minutes (per person)</p>
          </div>
          <div className="p-6 text-center">
            <div className="text-5xl font-bold text-primary mb-6">£25</div>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Materials included</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">90 minute session</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Bride attends for free + Bottle of Prosecco</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Bride poses with the model for extra giggles!</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Better for large groups or if you have more time</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
