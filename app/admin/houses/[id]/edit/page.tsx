'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditHousePage() {
  const router = useRouter();
  const params = useParams();
  const houseId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    postcode: '',
    location: '',
    address: '',
    description: '',
    content: '',
    image_url: '',
    photo_1_url: '',
    photo_2_url: '',
    photo_3_url: '',
    meta_title: '',
    meta_description: '',
    booking_url: '',
    google_maps_url: '',
    is_published: true,
    is_featured: false,
    features: '',
    // Venue tracking fields
    ben_visited_dates: '',
    has_affiliate_relationship: false,
    owner_approved: false,
    owner_contact_info: '',
    owner_notes: '',
  });

  useEffect(() => {
    async function loadHouse() {
      try {
        const response = await fetch(`/api/admin/houses/${houseId}`);
        if (response.ok) {
          const house = await response.json();
          setFormData({
            title: house.title || '',
            slug: house.slug || '',
            postcode: house.postcode || '',
            location: house.location || '',
            address: house.address || '',
            description: house.description || '',
            content: house.content || '',
            image_url: house.image_url || '',
            photo_1_url: house.photo_1_url || '',
            photo_2_url: house.photo_2_url || '',
            photo_3_url: house.photo_3_url || '',
            meta_title: house.meta_title || '',
            meta_description: house.meta_description || '',
            booking_url: house.booking_url || '',
            google_maps_url: house.google_maps_url || '',
            is_published: house.is_published ?? true,
            is_featured: house.is_featured ?? false,
            features: house.features ? house.features.join('\n') : '',
            ben_visited_dates: house.ben_visited_dates ? house.ben_visited_dates.join('\n') : '',
            has_affiliate_relationship: house.has_affiliate_relationship ?? false,
            owner_approved: house.owner_approved ?? false,
            owner_contact_info: house.owner_contact_info || '',
            owner_notes: house.owner_notes || '',
          });
        }
      } catch (error) {
        console.error('Error loading house:', error);
        alert('Error loading house data');
      } finally {
        setLoading(false);
      }
    }
    loadHouse();
  }, [houseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Convert features and dates strings to arrays
      const featuresArray = formData.features
        ? formData.features.split('\n').filter(f => f.trim())
        : [];
      const datesArray = formData.ben_visited_dates
        ? formData.ben_visited_dates.split('\n').filter(d => d.trim())
        : [];

      const houseData = {
        ...formData,
        features: featuresArray,
        ben_visited_dates: datesArray,
      };

      const response = await fetch(`/api/admin/houses/${houseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(houseData),
      });

      if (response.ok) {
        router.push('/admin/houses');
      } else {
        const error = await response.json();
        alert(`Error updating house: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating house');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Edit House</h2>
        <Link
          href="/admin/houses"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Postcode *</label>
            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Content (Sales Piece)</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Features (one per line)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Venue Tracking Section */}
          <div className="md:col-span-2 border-t pt-6 mt-6">
            <h3 className="text-xl font-semibold mb-4">Venue Tracking</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Ben Visited Dates (one per line, YYYY-MM-DD format)
              </label>
              <textarea
                name="ben_visited_dates"
                value={formData.ben_visited_dates}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="2024-01-15&#10;2024-03-20"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter dates when Ben provided service at this venue, one per line
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="has_affiliate_relationship"
                  checked={formData.has_affiliate_relationship}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Has Affiliate Relationship</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="owner_approved"
                  checked={formData.owner_approved}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Owner Approved</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Owner Contact Info</label>
              <input
                type="text"
                name="owner_contact_info"
                value={formData.owner_contact_info}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Email or phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Owner Notes</label>
              <textarea
                name="owner_notes"
                value={formData.owner_notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Notes about owner relationship, approval status, etc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Main Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Photo 1 URL</label>
            <input
              type="url"
              name="photo_1_url"
              value={formData.photo_1_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Photo 2 URL</label>
            <input
              type="url"
              name="photo_2_url"
              value={formData.photo_2_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Photo 3 URL</label>
            <input
              type="url"
              name="photo_3_url"
              value={formData.photo_3_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Booking URL</label>
            <input
              type="url"
              name="booking_url"
              value={formData.booking_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Google Maps URL</label>
            <input
              type="url"
              name="google_maps_url"
              value={formData.google_maps_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Meta Title (SEO)</label>
            <input
              type="text"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Meta Description (SEO)</label>
            <textarea
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Published (visible on public site)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Featured</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/houses"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

