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
                <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                  <span>10 people</span>
                  <span className="text-blue-300">|</span>
                  <span>£250</span>
                </div>
              </div>

              <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold text-purple-700">Deposit: £50</span> to secure date
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 my-2"></div>

            <ul className="space-y-4 py-6 text-gray-600 flex-grow">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>All drawing materials included</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>60 minute life drawing session</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>Fun drawing games & poses</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>Great photo opportunities</span>
              </li>
            </ul>
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
                <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                  <span>10 people</span>
                  <span className="text-blue-300">|</span>
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

            <ul className="space-y-4 py-6 text-gray-600 flex-grow">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span className="font-medium text-gray-900">Everything in 60 min session</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>Extended 90 minute drawing time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>More poses & detailed tuition</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg mt-[-2px]">✓</span>
                <span>More relaxed pace</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showContact && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Ready to Book?</h2>
          <ContactModule variant="full" showFormLink={true} />
        </div>
      )}
    </>
  );
}
