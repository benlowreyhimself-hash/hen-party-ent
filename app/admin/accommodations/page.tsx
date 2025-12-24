"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, EyeOff, Search, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Accommodation {
    id: string;
    title: string;
    address: string;
    is_published: boolean;
    address_verified: boolean;
    image_url: string | null;
    location: string;
    affiliate_link: string | null;
    contact_email: string | null;
}

export default function AdminAccommodationsPage() {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
    const [search, setSearch] = useState('');
    const [editingHouse, setEditingHouse] = useState<Accommodation | null>(null);
    const [editForm, setEditForm] = useState({ affiliate_link: '', contact_email: '' });

    useEffect(() => {
        fetchAccommodations();
    }, []);

    const fetchAccommodations = async () => {
        try {
            const res = await fetch('/api/admin/accommodations');
            const data = await res.json();
            setAccommodations(data.houses || []);
        } catch (error) {
            console.error('Failed to fetch accommodations', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, field: 'is_published' | 'address_verified', currentValue: boolean) => {
        // Optimistic update
        setAccommodations(prev => prev.map(acc =>
            acc.id === id ? { ...acc, [field]: !currentValue } : acc
        ));

        try {
            await fetch('/api/admin/accommodations', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, [field]: !currentValue })
            });
        } catch (error) {
            // Revert on error
            console.error('Update failed', error);
            fetchAccommodations();
        }
    };

    const openEdit = (house: Accommodation) => {
        setEditingHouse(house);
        setEditForm({
            affiliate_link: house.affiliate_link || '',
            contact_email: house.contact_email || ''
        });
    };

    const handleSaveEdit = async () => {
        if (!editingHouse) return;

        try {
            await fetch('/api/admin/accommodations', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingHouse.id,
                    affiliate_link: editForm.affiliate_link,
                    contact_email: editForm.contact_email
                })
            });

            // Optimistic update
            setAccommodations(prev => prev.map(acc =>
                acc.id === editingHouse.id
                    ? { ...acc, affiliate_link: editForm.affiliate_link, contact_email: editForm.contact_email }
                    : acc
            ));

            setEditingHouse(null);
        } catch (error) {
            console.error('Failed to save', error);
        }
    };

    const filtered = accommodations.filter(acc => {
        const matchesSearch = acc.title.toLowerCase().includes(search.toLowerCase()) ||
            acc.address?.toLowerCase().includes(search.toLowerCase());

        if (filter === 'verified') return matchesSearch && acc.address_verified;
        if (filter === 'unverified') return matchesSearch && !acc.address_verified;
        return matchesSearch;
    });

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Accommodation Management</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border rounded-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="border rounded-lg px-4 py-2"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                    >
                        <option value="all">All Accommodations</option>
                        <option value="verified">Verified Only</option>
                        <option value="unverified">Unverified Only</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading...</div>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filtered.map((acc) => (
                                <tr key={acc.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {acc.image_url ? (
                                                <Image src={acc.image_url} alt="" width={40} height={40} className="rounded object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">?</div>
                                            )}
                                            <div>
                                                <div className="font-medium text-gray-900">{acc.title}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-[200px]">{acc.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {acc.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(acc.id, 'address_verified', acc.address_verified)}
                                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${acc.address_verified
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {acc.address_verified ? (
                                                <><CheckCircle className="w-3 h-3" /> Verified</>
                                            ) : (
                                                <><XCircle className="w-3 h-3" /> Unverified</>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(acc.id, 'is_published', acc.is_published)}
                                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${acc.is_published
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {acc.is_published ? (
                                                <><Eye className="w-3 h-3" /> Live</>
                                            ) : (
                                                <><EyeOff className="w-3 h-3" /> Hidden</>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <button
                                            onClick={() => openEdit(acc)}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Edit Links
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No accommodations found matching your filters.
                        </div>
                    )}
                </div>
            )}

            {/* Edit Modal */}
            <Dialog open={!!editingHouse} onOpenChange={(open) => !open && setEditingHouse(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit {editingHouse?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="affiliate">Affiliate Link</Label>
                            <Input
                                id="affiliate"
                                placeholder="https://..."
                                value={editForm.affiliate_link}
                                onChange={e => setEditForm({ ...editForm, affiliate_link: e.target.value })}
                            />
                            <p className="text-xs text-gray-500">Overrides standard booking links efficiently.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact">Venue Contact Email</Label>
                            <Input
                                id="contact"
                                type="email"
                                placeholder="venue@example.com"
                                value={editForm.contact_email}
                                onChange={e => setEditForm({ ...editForm, contact_email: e.target.value })}
                            />
                            <p className="text-xs text-gray-500">Used for direct booking enquiries.</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingHouse(null)}>Cancel</Button>
                        <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
