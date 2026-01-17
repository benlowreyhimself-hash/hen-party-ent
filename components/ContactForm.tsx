"use client";

import { useState, useEffect } from 'react';
import { trackFormSubmission } from '@/lib/gtm';
import { trackGoogleAdsConversion } from '@/lib/gtm/conversion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relation: '',
    occasion: '',
    region: '',
    groupSize: '',
    duration: '',
    startTime: '',
    eventDate: '',
    venue: '',
    fullAddress: '',
    message: '',
    gclid: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill enquiry date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // Check for GCLID in URL
    const params = new URLSearchParams(window.location.search);
    const gclidParam = params.get('gclid');
    if (gclidParam) {
      setFormData(prev => ({ ...prev, gclid: gclidParam }));
      console.log('✅ GCLID captured:', gclidParam);
    }

    // Capture UTM parameters
    const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmFields.forEach(field => {
      const value = params.get(field);
      if (value) {
        setFormData(prev => ({ ...prev, [field]: value }));
        console.log(`✅ ${field} captured:`, value);
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const enquiryDate = new Date().toISOString().split('T')[0];

      const submissionData = {
        ...formData,
        enquiryDate,
        source: formData.gclid ? 'Google Ads' : 'Website Contact Form',
        method: 'form',
      };

      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      // Track in GTM
      trackFormSubmission(submissionData);

      // Track Google Ads conversion
      trackGoogleAdsConversion();

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          Your booking enquiry has been sent successfully. We'll get back to you soon!
        </p>
        <p className="text-sm text-green-600 mt-4 font-medium border-t border-green-200 pt-4">
          ✨ Special Offer: 10% discount if you choose to pay in full (based on the minimum charge).
        </p>
      </div >
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-border rounded-lg p-8">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Relation */}
      <div>
        <label htmlFor="relation" className="block text-sm font-medium mb-2">
          Relation
        </label>
        <select
          id="relation"
          name="relation"
          value={formData.relation}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select...</option>
          <option value="Auntie">Auntie</option>
          <option value="Best Friend">Best Friend</option>
          <option value="Colleague">Colleague</option>
          <option value="Cousin">Cousin</option>
          <option value="Daughter">Daughter</option>
          <option value="Daughter in Law">Daughter in Law</option>
          <option value="Friend">Friend</option>
          <option value="Group">Group</option>
          <option value="Mother">Mother</option>
          <option value="Mum">Mum</option>
          <option value="Neighbour">Neighbour</option>
          <option value="Own">Own</option>
          <option value="Partner">Partner</option>
          <option value="Relative">Relative</option>
          <option value="Sister">Sister</option>
          <option value="Sister in Law">Sister in Law</option>
          <option value="Step Mum">Step Mum</option>
          <option value="Unspecified">Unspecified</option>
          <option value="Work">Work</option>
        </select>
      </div>

      {/* Occasion */}
      <div>
        <label htmlFor="occasion" className="block text-sm font-medium mb-2">
          Occasion
        </label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select...</option>
          <option value="30th Birthday">30th Birthday</option>
          <option value="40th Birthday">40th Birthday</option>
          <option value="50th Birthday">50th Birthday</option>
          <option value="Bachelorette Party">Bachelorette Party</option>
          <option value="Birthday">Birthday</option>
          <option value="Hen Do">Hen Do</option>
          <option value="Hen Party">Hen Party</option>
          <option value="Hen Weekend">Hen Weekend</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Region */}
      <div>
        <label htmlFor="region" className="block text-sm font-medium mb-2">
          Region
        </label>
        <select
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select...</option>
          <optgroup label="South West">
            <option value="Bath (BA)">Bath (BA)</option>
            <option value="Bournemouth (BH)">Bournemouth (BH)</option>
            <option value="Bristol (BS)">Bristol (BS)</option>
            <option value="Dorchester (DT)">Dorchester (DT)</option>
            <option value="Exeter (EX)">Exeter (EX)</option>
            <option value="Gloucester (GL)">Gloucester (GL)</option>
            <option value="Plymouth (PL)">Plymouth (PL)</option>
            <option value="Salisbury (SP)">Salisbury (SP)</option>
            <option value="Swindon (SN)">Swindon (SN)</option>
            <option value="Taunton (TA)">Taunton (TA)</option>
            <option value="Torquay (TQ)">Torquay (TQ)</option>
            <option value="Truro (TR)">Truro (TR)</option>
            <option value="Frome (BA11)">Frome (BA11)</option>
            <option value="Glastonbury (BA6)">Glastonbury (BA6)</option>
          </optgroup>
          <optgroup label="South East">
            <option value="Brighton (BN)">Brighton (BN)</option>
            <option value="Canterbury (CT)">Canterbury (CT)</option>
            <option value="Guilford (GU)">Guilford (GU)</option>
            <option value="Medway (ME)">Medway (ME)</option>
            <option value="Milton Keynes (MK)">Milton Keynes (MK)</option>
            <option value="Oxford (OX)">Oxford (OX)</option>
            <option value="Portsmouth (PO)">Portsmouth (PO)</option>
            <option value="Reading (RG)">Reading (RG)</option>
            <option value="Redhill (RH)">Redhill (RH)</option>
            <option value="Slough (SL)">Slough (SL)</option>
            <option value="Southampton (SO)">Southampton (SO)</option>
            <option value="Tonbridge (TN)">Tonbridge (TN)</option>
          </optgroup>
          <optgroup label="Greater London">
            <option value="Bromley (BR)">Bromley (BR)</option>
            <option value="Croydon (CR)">Croydon (CR)</option>
            <option value="Dartford (DA)">Dartford (DA)</option>
            <option value="Enfield (EN)">Enfield (EN)</option>
            <option value="Harrow (HA)">Harrow (HA)</option>
            <option value="Ilford (IG)">Ilford (IG)</option>
            <option value="Kingston (KT)">Kingston (KT)</option>
            <option value="London (E)">London (E)</option>
            <option value="London (EC)">London (EC)</option>
            <option value="London (N)">London (N)</option>
            <option value="London (NW)">London (NW)</option>
            <option value="London (SE)">London (SE)</option>
            <option value="London (SW)">London (SW)</option>
            <option value="London (W)">London (W)</option>
            <option value="London (WC)">London (WC)</option>
            <option value="Romford (RM)">Romford (RM)</option>
            <option value="Southall (UB)">Southall (UB)</option>
            <option value="Sutton (SM)">Sutton (SM)</option>
            <option value="Twickenham (TW)">Twickenham (TW)</option>
            <option value="Watford (WD)">Watford (WD)</option>
          </optgroup>
          <optgroup label="East of England">
            <option value="Cambridge (CB)">Cambridge (CB)</option>
            <option value="Chelmsford (CM)">Chelmsford (CM)</option>
            <option value="Colchester (CO)">Colchester (CO)</option>
            <option value="Hemel (HP)">Hemel (HP)</option>
            <option value="Ipswich (IP)">Ipswich (IP)</option>
            <option value="Luton (LU)">Luton (LU)</option>
            <option value="Norwich (NR)">Norwich (NR)</option>
            <option value="Peterborough (PE)">Peterborough (PE)</option>
            <option value="Southend (SS)">Southend (SS)</option>
            <option value="St. Albans (AL)">St. Albans (AL)</option>
            <option value="Stevenage (SG)">Stevenage (SG)</option>
          </optgroup>
          <optgroup label="West Midlands">
            <option value="Birmingham (B)">Birmingham (B)</option>
            <option value="Coventry (CV)">Coventry (CV)</option>
            <option value="Dudley (DY)">Dudley (DY)</option>
            <option value="Hereford (HR)">Hereford (HR)</option>
            <option value="Northampton (NN)">Northampton (NN)</option>
            <option value="Shrewsbury (SY)">Shrewsbury (SY)</option>
            <option value="Stoke on Trent (ST)">Stoke on Trent (ST)</option>
            <option value="Telford (TF)">Telford (TF)</option>
            <option value="Walsall (WS)">Walsall (WS)</option>
            <option value="Wolverhampton (WV)">Wolverhampton (WV)</option>
            <option value="Worcester (WR)">Worcester (WR)</option>
          </optgroup>
          <optgroup label="East Midlands">
            <option value="Derby (DE)">Derby (DE)</option>
            <option value="Doncaster (DN)">Doncaster (DN)</option>
            <option value="Leicester (LE)">Leicester (LE)</option>
            <option value="Lincoln (LN)">Lincoln (LN)</option>
            <option value="Nottingham (NG)">Nottingham (NG)</option>
            <option value="Sheffield (S)">Sheffield (S)</option>
          </optgroup>
          <optgroup label="North West">
            <option value="Blackburn (BB)">Blackburn (BB)</option>
            <option value="Blackpool (FY)">Blackpool (FY)</option>
            <option value="Bolton (BL)">Bolton (BL)</option>
            <option value="Bradford (BD)">Bradford (BD)</option>
            <option value="Carlisle (CA)">Carlisle (CA)</option>
            <option value="Chester (CH)">Chester (CH)</option>
            <option value="Crewe (CW)">Crewe (CW)</option>
            <option value="Halifax (HX)">Halifax (HX)</option>
            <option value="Huddersfield (HD)">Huddersfield (HD)</option>
            <option value="Lancaster (LA)">Lancaster (LA)</option>
            <option value="Liverpool (L)">Liverpool (L)</option>
            <option value="Manchester (M)">Manchester (M)</option>
            <option value="Oldham (OL)">Oldham (OL)</option>
            <option value="Preston (PR)">Preston (PR)</option>
            <option value="Stockport (SK)">Stockport (SK)</option>
            <option value="Warrington (WA)">Warrington (WA)</option>
            <option value="Wigan (WN)">Wigan (WN)</option>
          </optgroup>
          <optgroup label="North East">
            <option value="Cleveland (TS)">Cleveland (TS)</option>
            <option value="Darlington (DL)">Darlington (DL)</option>
            <option value="Durham (DH)">Durham (DH)</option>
            <option value="Harrogate (HG)">Harrogate (HG)</option>
            <option value="Hull (HU)">Hull (HU)</option>
            <option value="Leeds (LS)">Leeds (LS)</option>
            <option value="Newcastle (NE)">Newcastle (NE)</option>
            <option value="Sunderland (SR)">Sunderland (SR)</option>
            <option value="Wakefield (WF)">Wakefield (WF)</option>
            <option value="York (YO)">York (YO)</option>
          </optgroup>
          <optgroup label="Wales">
            <option value="Cardiff (CF)">Cardiff (CF)</option>
            <option value="Llandrindod (LD)">Llandrindod (LD)</option>
            <option value="Llandudno (LL)">Llandudno (LL)</option>
            <option value="Newport (NP)">Newport (NP)</option>
            <option value="Swansea (SA)">Swansea (SA)</option>
          </optgroup>
          <optgroup label="Scotland">
            <option value="Aberdeen (AB)">Aberdeen (AB)</option>
            <option value="Comhairle nan Eilean Siar (HS)">Comhairle nan Eilean Siar (HS)</option>
            <option value="Dumfries (DG)">Dumfries (DG)</option>
            <option value="Dundee (DD)">Dundee (DD)</option>
            <option value="Edinburgh (EH)">Edinburgh (EH)</option>
            <option value="Falkirk (FK)">Falkirk (FK)</option>
            <option value="Galashiels (TD)">Galashiels (TD)</option>
            <option value="Glasgow (G)">Glasgow (G)</option>
            <option value="Inverness (IV)">Inverness (IV)</option>
            <option value="Kilmarnock (KA)">Kilmarnock (KA)</option>
            <option value="Kirkaldy (KY)">Kirkaldy (KY)</option>
            <option value="Kirkwall (KW)">Kirkwall (KW)</option>
            <option value="Motherwell (ML)">Motherwell (ML)</option>
            <option value="Paisley (PA)">Paisley (PA)</option>
            <option value="Perth (PH)">Perth (PH)</option>
            <option value="Shetland (ZE)">Shetland (ZE)</option>
          </optgroup>
          <optgroup label="Northern Ireland">
            <option value="Belfast (BT)">Belfast (BT)</option>
          </optgroup>
          <optgroup label="Channel Islands">
            <option value="Guernsey (GY)">Guernsey (GY)</option>
            <option value="Jersey (JE)">Jersey (JE)</option>
          </optgroup>
          <optgroup label="Isle of Man">
            <option value="Isle of Man (IM)">Isle of Man (IM)</option>
          </optgroup>
          <option value="Nationwide">Nationwide</option>
        </select>
      </div>

      {/* Group Size */}
      <div>
        <label htmlFor="groupSize" className="block text-sm font-medium mb-2">
          Group Size
        </label>
        <input
          type="number"
          id="groupSize"
          name="groupSize"
          value={formData.groupSize}
          onChange={handleChange}
          min="1"
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration" className="block text-sm font-medium mb-2">
          Duration
        </label>
        <select
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select...</option>
          <option value="60 mins">60 minutes</option>
          <option value="90 mins">90 minutes</option>
          <option value="TBC">TBC (To Be Confirmed)</option>
        </select>
      </div>

      {/* Start Time */}
      <div>
        <label htmlFor="startTime" className="block text-sm font-medium mb-2">
          Start Time
        </label>
        <input
          type="text"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          placeholder="e.g., 3:30pm, Afternoon, Evening"
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Event Date */}
      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
          Event Date
        </label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Venue Type */}
      <div>
        <label htmlFor="venue" className="block text-sm font-medium mb-2">
          Venue Type
        </label>
        <select
          id="venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select...</option>
          <option value="AirBnB">AirBnB</option>
          <option value="Own House">Own House</option>
          <option value="Function Room - Needed">Function Room - Needed</option>
          <option value="Function Room - Already Arranged">Function Room - Already Arranged</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Full Address */}
      <div>
        <label htmlFor="fullAddress" className="block text-sm font-medium mb-2">
          Full Address for the event
        </label>
        <textarea
          id="fullAddress"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          rows={4}
          placeholder="Enter the full address of the venue"
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Message/Notes */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message / Additional Notes
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          placeholder="Any additional information or special requests..."
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:opacity-90 transition-opacity font-semibold disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Submit Booking Enquiry'}
      </button>
    </form>
  );
}

