import ContactModule from "@/components/ContactModule";

export default function PricingCards({ showContact = false }: { showContact?: boolean }) {
  return (
    <>
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <p className="text-lg text-gray-600">
          I understand it takes a lot of work to organise a large group of people. You can confirm the booking with a deposit, then settle the final amount nearer the time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* 60 Minutes */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full shadow-md hover:shadow-lg transition-all duration-300">
          <div className="p-8 pb-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">60 Minutes</h3>
            <p className="text-gray-500 font-medium">Standard Session</p>
          </div>

          <div className="text-center px-8 mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-extrabold text-gray-900">£25</span>
              <span className="text-gray-500 font-medium">/ person</span>
            </div>
          </div>

          <div className="px-8 flex-grow flex flex-col">
            {/* Soft Stacked Info Blocks */}
            <div className="space-y-3 mb-8">
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-1">Minimum Booking</p>
                <div className="text-gray-900 font-bold text-lg">
                  <span>£250</span>
                </div>
              </div>

              <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold text-purple-700">Deposit: £50</span> to secure date
                </p>
              </div>

            </div>

            {/* Invisible Spacer to match 90 min card - Hidden on Mobile */}
            <div className="invisible hidden md:flex border border-transparent rounded-xl p-3 mb-6 items-center gap-3" aria-hidden="true">
              <div className="p-2 rounded-full text-xl border border-transparent">🍾</div>
              <div>
                <p className="font-bold text-sm">Spacer</p>
                <p className="text-xs font-medium">Spacer</p>
              </div>
            </div>

            <div className="border-t border-slate-100 mb-2"></div>

            <ul className="space-y-4 py-6 text-gray-600 flex-grow">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">All Materials Included</strong>
                  <br /><span className="text-sm">Sketch pads, charcoal & professional supplies</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">Full 60 Minute Session</strong>
                  <br /><span className="text-sm">Dedicated drawing time with professional model</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">Fun & Tasteful</strong>
                  <br /><span className="text-sm">Hilarious drawing games & poses (nothing awkward!)</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">Photo Session</strong>
                  <br /><span className="text-sm">Group photos with the model included</span>
                </span>
              </li>
            </ul>

            <div className="mt-8 mb-4 bg-green-50 p-4 rounded-xl border border-green-100 text-center">
              <p className="text-green-800 font-bold mb-1">10% Discount when you pay in full</p>
              <p className="text-green-700 font-medium">£22.50 / person</p>
              <p className="text-green-600 text-sm mt-1">Total (Min): £225</p>
            </div>
          </div>
        </div>

        {/* 90 Minutes */}
        <div className="bg-white border-2 border-primary/30 rounded-2xl overflow-hidden flex flex-col h-full shadow-xl relative">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-primary"></div>
          <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
            POPULAR
          </div>

          <div className="p-8 pb-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">90 Minutes</h3>
            <p className="text-primary font-medium">Extended Session</p>
          </div>

          <div className="text-center px-8 mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-extrabold text-gray-900">£30</span>
              <span className="text-gray-500 font-medium">/ person</span>
            </div>
          </div>

          <div className="px-8 flex-grow flex flex-col">
            {/* Soft Stacked Info Blocks */}
            <div className="space-y-3 mb-8">
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-1">Minimum Booking</p>
                <div className="text-gray-900 font-bold text-lg">
                  <span>£300</span>
                </div>
              </div>

              <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold text-purple-700">Deposit: £60</span> to secure date
                </p>
              </div>

            </div>

            {/* Featured Benefit */}
            <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 mb-6 flex items-center gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm shrink-0 text-xl border border-emerald-50">🍾</div>
              <div>
                <p className="font-bold text-emerald-800 text-sm">Bride Goes FREE</p>
                <p className="text-xs text-emerald-600 font-medium">Bottle of Prosecco Included</p>
              </div>
            </div>

            <div className="border-t border-slate-100 mb-2"></div>

            <ul className="space-y-3 py-6 text-gray-600 flex-grow text-sm">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">All Materials Provided</strong>
                  <br /><span className="text-xs">Sketch pads, charcoal & everything you need</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">Extended 90 Minute Session</strong>
                  <br /><span className="text-xs">More time for games, detailed drawing & photos</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">Bottle of Prosecco Included</strong>
                  <br /><span className="text-xs">A treat for the bride-to-be!</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">Payment Flexibility</strong>
                  <br /><span className="text-xs">Small deposit to book, balance due 1 week prior</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>
                  <strong className="text-gray-900">Minimum Charge</strong>
                  <br /><span className="text-xs">Based on 10 people (smaller groups welcome to pay minimum)</span>
                </span>
              </li>
            </ul>

            <div className="mt-8 mb-4 bg-green-50 p-4 rounded-xl border border-green-100 text-center">
              <p className="text-green-800 font-bold mb-1">10% Discount when you pay in full</p>
              <p className="text-green-700 font-medium">£27.00 / person</p>
              <p className="text-green-600 text-sm mt-1">Total (Min): £270</p>
            </div>
          </div>
        </div>
      </div>

      {showContact && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Check our availability</h2>
          <ContactModule variant="full" showFormLink={true} />
        </div>
      )}
    </>
  );
}
