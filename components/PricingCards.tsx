import ContactModule from "@/components/ContactModule";

export default function PricingCards({ showContact = false }: { showContact?: boolean }) {
  return (
    <>
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <p className="text-lg text-gray-600">
          I understand it takes a lot of work to organise a large group of people. You can confirm the booking with a deposit, then settle the final amount nearer the time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* 60 Minutes */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="bg-gray-50 p-8 text-center border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">60 Minutes</h3>
            <p className="text-gray-500 font-medium">Standard Session</p>
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold text-gray-900">£25</span>
                <span className="text-gray-500 font-medium">/ person</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-blue-50/50 rounded-xl p-4 text-center border border-blue-100">
                <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-1">Minimum Booking</p>
                <p className="text-lg font-bold text-gray-900">10 people <span className="text-gray-400 font-normal">|</span> £250 total</p>
              </div>
              
              <div className="bg-purple-50/50 rounded-xl p-4 text-center border border-purple-100">
                <p className="text-sm font-semibold text-purple-800 uppercase tracking-wide mb-1">Deposit</p>
                <p className="text-lg font-bold text-gray-900">£50</p>
                <p className="text-xs text-purple-600 mt-1">To secure date & time</p>
              </div>
            </div>

            <ul className="space-y-4 text-gray-600 flex-grow px-2">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg mt-[-2px]">✓</span>
                <span>All drawing materials included</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg mt-[-2px]">✓</span>
                <span>60 minute life drawing session</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg mt-[-2px]">✓</span>
                <span>Fun drawing games & poses</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg mt-[-2px]">✓</span>
                <span>Great photo opportunities</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 90 Minutes */}
        <div className="bg-white border-2 border-primary/20 rounded-2xl overflow-hidden flex flex-col h-full shadow-xl relative transform md:-translate-y-2">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-purple-600"></div>
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
            <span>★</span> POPULAR
          </div>
          
          <div className="bg-primary/5 p-8 text-center border-b border-primary/10">
            <h3 className="text-2xl font-bold text-primary mb-2">90 Minutes</h3>
            <p className="text-primary/70 font-medium">Extended Session</p>
          </div>
          
          <div className="p-8 flex flex-col flex-grow">
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold text-primary">£30</span>
                <span className="text-gray-500 font-medium">/ person</span>
              </div>
            </div>

            {/* Featured: Bride Free + Prosecco */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 mb-6 text-center shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-1 opacity-10">
                <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
              </div>
              <p className="text-lg font-bold text-green-800 mb-1">Bride Goes FREE</p>
              <p className="text-sm font-semibold text-green-700 flex items-center justify-center gap-1">
                <span>+</span> Bottle of Prosecco Included 🍾
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
               <div className="bg-blue-50/50 rounded-xl p-4 text-center border border-blue-100">
                <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-1">Minimum Booking</p>
                <p className="text-lg font-bold text-gray-900">10 people <span className="text-gray-400 font-normal">|</span> £300 total</p>
              </div>
              
              <div className="bg-purple-50/50 rounded-xl p-4 text-center border border-purple-100">
                <p className="text-sm font-semibold text-purple-800 uppercase tracking-wide mb-1">Deposit</p>
                <p className="text-lg font-bold text-gray-900">£60</p>
                <p className="text-xs text-purple-600 mt-1">To secure date & time</p>
              </div>
            </div>

            <ul className="space-y-4 text-gray-600 flex-grow px-2">
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

