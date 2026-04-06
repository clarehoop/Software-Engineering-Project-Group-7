import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

interface sendInquiryProps {

    firstName ?: string;
    lastName ?: string;
    email ?: string;
    phoneNumber ?: string;
    message ?: string;
    propertyId ?: string;
    landlordId ?: string;

}

const initialState: sendInquiryProps = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    propertyId: '',
    landlordId: ''

}

export const useSendInquiry = () => {
    const [form, setForm] = useState<sendInquiryProps>(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (field: keyof sendInquiryProps, value: string) => {
        setForm(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = async (ids?: {propertyId?: string, landlordId?: string}) => {
        console.log('handleSubmit called with ids:', ids);  // Add this
        console.log('propertyId value:', ids?.propertyId);  // Add this
        setError(null);
        setSuccess(false);

        if (!form.firstName || !form.email || !form.message) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            await addDoc(collection(db, 'inquiries'), {
                ...form,
                propertyId: ids?.propertyId ?? null,
                landlordId: ids?.landlordId ?? null,
                status: 'unread',
                createdAt: Timestamp.now()
            });
            setSuccess(true);
            setForm(initialState);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    return {form, handleChange, handleSubmit, loading, error, success};
  };