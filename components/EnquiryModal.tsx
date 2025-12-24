"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    houseId: string;
    houseTitle: string;
    venueEmail?: string | null;
}

export default function EnquiryModal({ isOpen, onClose, houseId, houseTitle }: EnquiryModalProps) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        groupSize: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/enquire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    houseId,
                    venueName: houseTitle,
                    trackingId: 'modal_enquiry'
                }),
            });

            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
                toast({
                    title: "Enquiry Sent!",
                    description: "We have received your enquiry and will be in touch shortly.",
                });
            } else {
                throw new Error(data.error || 'Failed to send enquiry');
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again or email us directly.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Enquire about {houseTitle}</DialogTitle>
                    <DialogDescription>
                        Check availability for Life Drawing at this venue.
                    </DialogDescription>
                </DialogHeader>

                {submitted ? (
                    <div className="text-center py-8">
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h3 className="text-xl font-bold mb-2">Enquiry Sent!</h3>
                        <p className="text-gray-600 mb-6">
                            Thank you for your enquiry. We have sent a confirmation to your email.
                            Ben or the venue will respond shortly.
                        </p>
                        <Button onClick={onClose}>Close</Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Event Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (Optional)</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="groupSize">Group Size</Label>
                                <Input
                                    id="groupSize"
                                    placeholder="Approx."
                                    value={formData.groupSize}
                                    onChange={e => setFormData({ ...formData, groupSize: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Any specific requirements or questions?"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Enquiry'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
