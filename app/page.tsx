import Image from "next/image";
import Link from "next/link";
import { houses } from "@/data/houses";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactButtons from "@/components/ContactButtons";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
        <Image
            src="https://henpartyentertainment.co.uk/wp-content/uploads/2014/11/1F93FF7F-70CA-4EF1-9584-D0F5C7BE91A8_1_201_a.jpeg"
            alt="Hen Party Life Drawing Hero"
            fill
            sizes="100vw"
            className="object-cover"
          priority
        />
          <div className="absolute inset-0 bg-primary/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">Welcome</h1>
          <h3 className="text-2xl md:text-3xl">This is the home of Hen Party Life Drawing</h3>
        </div>
      </section>

      {/* Location Bar */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            Bristol - Bath - Cardiff - Gloucester - Cotswolds - Somerset - Oxford - Swindon - London - Nationwide
          </p>
        </div>
      </section>

      {/* Main Heading */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Book the South West's most popular Hen Party Life Drawing Model!<br />
            Direct booking. No Agency fees
          </h2>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Main Image */}
          <div className="mb-12">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
                src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2017/07/C3CD1C3E-99D3-4572-BB39-06D19DA36311_1_201_a-1.jpeg"
                alt="Hen Party Life Drawing Session"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Introduction Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground mb-4">
                If you're organising a Hen Party for a friend, sister, or family member, you've come to the right place!
              </p>
              <p className="text-lg text-foreground mb-4">
                This is a perfect activity for your weekend. Take a look at the photos, video, and reviews below.
              </p>
              <p className="text-lg text-foreground mb-4">
                If you'd like to check my availability, drop me an email and we can begin making plans!
              </p>
              <p className="text-lg text-foreground mb-4">
                I've been doing Hen Parties since 2013 and I take great care to make sure everybody has a fun time.
              </p>
              <p className="text-lg text-foreground mb-4">
                I make sure the bride is made to feel special, and the whole group enjoys themselves. You will end up with lots of great photos of your fun weekend.
              </p>
              <p className="text-lg text-foreground mb-4">
                You can view my genuine 5 star reviews on google by clicking{" "}
                <a 
                  href="https://g.page/henpartyent" 
            target="_blank"
            rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  here
                </a>
              </p>
            </div>
          </div>

          {/* Hi! My name's Ben Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Hi! My name's Ben</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground mb-4 text-center">
                I'm a Mobile Life Drawing Model based in Bath, but I cover the entire South West, and I have a network of carefully selected Models all over the UK!
              </p>
            </div>
          </div>

          {/* Tasteful & Fun Section */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Tasteful & Fun</h2>
          </div>

          {/* What to Expect Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">What to expect</h2>
            <div className="prose prose-lg max-w-none">
              <ul className="space-y-4 text-lg">
                <li>A professional friendly male model will present a range of nude poses for the hens to draw.</li>
                <li>Drawing techniques and exercises will be explained.</li>
                <li>Nobody will be made to feel uncomfortable or embarrassed.</li>
                <li>This is a fun & tasteful form of hen party entertainment.</li>
                <li>The bride will be invited to pose (clothed) with the model if she wishes (shhhhh… don't tell her this)</li>
                <li>The model will wear a dressing gown between poses.</li>
                <li>Photos with the model can be taken at the end of the session.</li>
                <li>The session will be fully explained, you can ask any questions so that you fully understand what to expect.</li>
              </ul>
            </div>
          </div>

          {/* Photo Gallery Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Photo Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/11/BA76C206-80F2-421E-9E80-8C8F097EB5D3_1_201_a.jpeg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing Session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2020/04/Life-Drawing-Best-9-of-98-scaled.jpg?w=1080&ssl=1"
                  alt="Life Drawing Session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2020/04/84101C19-5C36-45B8-94AB-BF1A10F610D3_1_105_c.jpg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/11/FAAF3DB4-EF12-4CBE-93FC-8FD1B370CAC2_1_201_a.jpeg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing Session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/11/87949746-ADB1-4F80-AFD0-CB87E0FA3C43_1_201_a.jpeg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/04/889ECDED-497A-4DD6-ADAD-94CBD586BE38_1_201_a.jpeg?resize=768%2C432&ssl=1"
                  alt="Hen Party Life Drawing Session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2018/05/09DAEC5B-3577-4FE9-B3D6-505A41109D06_1_201_a.jpeg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/04/0C8D2E1F-D9CF-424C-8ED7-75C1B0620F25_1_201_a.jpeg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing Session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2020/04/C6378496-36A9-456D-A09E-3FCB984617A4-scaled.jpg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/04/4F717ECF-E6BA-4EDB-838B-78AAB830FB96_1_201_a.jpeg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing Session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2018/08/CF76E7FD-4AFB-44AF-BD1B-59AA5DB8871C_1_201_a.jpeg?w=1080&ssl=1"
                  alt="Hen Party Life Drawing"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/04/CCF9FF36-C49D-4AE9-9C90-77F46E85CBEE_1_201_a.jpeg?resize=768%2C432&ssl=1"
                  alt="Hen Party Life Drawing Session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Google Reviews Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Google Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2 italic">
                  "Ben was super friendly and easy to work with.."
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2 italic">
                  "I booked Life Drawing for my sister's Hen Party and I can't thank Ben enough…"
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2 italic">
                  "We had a great time and Ben was very professional…"
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2 italic">
                  "Lots of fun for my future daughter in law's hen party…"
                </p>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                src="https://www.youtube.com/embed/X1-Z5qricLo"
                title="Hen Party Life Drawing Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Prices Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Prices</h2>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-foreground mb-4 text-center">
                I understand it takes a lot of work to organise a large group of people. You can confirm the booking with a deposit, then settle the final amount nearer the time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-primary rounded-lg overflow-hidden">
                <div className="bg-primary text-primary-foreground p-4 text-center">
                  <h3 className="text-xl font-bold">Classic</h3>
                  <p className="text-sm opacity-90">60 minutes (per person)</p>
                </div>
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-4">£20</div>
                </div>
              </div>
              <div className="bg-white border-2 border-primary rounded-lg overflow-hidden">
                <div className="bg-primary text-primary-foreground p-4 text-center">
                  <h3 className="text-xl font-bold">Special</h3>
                  <p className="text-sm opacity-90">75 minutes (per person)</p>
                </div>
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-4">£22</div>
                </div>
              </div>
              <div className="bg-white border-2 border-primary rounded-lg overflow-hidden">
                <div className="bg-primary text-primary-foreground p-4 text-center">
                  <h3 className="text-xl font-bold">Ultimate</h3>
                  <p className="text-sm opacity-90">90 minutes (per person)</p>
                </div>
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-4">£25</div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Venues */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-center">Popular Hen Party Venues</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houses.map((house) => (
                <Link
                  key={house.slug}
                  href={`/house-archives/${house.slug}`}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-xl font-semibold mb-2 text-primary hover:underline">
                    {house.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">{house.location}</p>
                  <p className="text-foreground text-sm line-clamp-3">{house.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/house-archives"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                View All Venues
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              <AccordionItem value="item-0">
                <AccordionTrigger className="text-left">Does Ben come to us?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground mb-2">Yes. If you are staying in a House I will come to the house where you are staying.</p>
                  <p className="text-foreground">If you're staying in a Hotel or just doing a day trip then let me know, a function room can be arranged.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">I'm not sure how many people there will be. Can I confirm it later?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground">Yes. You can book with a deposit, then confirm the final numbers nearer the time.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Do we need to be able to draw?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground">You don't need any art experience. Fun drawing exercises will be explained and everybody will be included.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Are the Drawing Materials provided?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground">Yes. I will bring plenty of sketch pads and charcoal. You only need bring the drinks!</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Do we need to prepare anything?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground">You only need to prepare the space. Make sure everybody has somewhere to sit and a drink!</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">Will the model tell us what to do?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground">Yes, I will guide the whole session. I have a series of fun drawing exercises which everybody will enjoy.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">Can we take photos?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground">Yes, but ask me before you take a photo. I will hold a baloon in front</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">Will the model act professionally?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground">Yes, the activity is coducted in a professional manner.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">Do we pay a deposit?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground">Yes. You can confirm the booking with a depoist and then pay the the final amount two weeks prior to the event</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground mb-6">
              Feel welcome to call, text, or email.
            </p>
            <ContactButtons />
          </div>
        </div>
      </section>
    </div>
  );
}
