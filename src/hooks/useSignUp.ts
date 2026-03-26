import { useState } from "react";
import { createUser } from "services/userService";

interface SignUpForm {

    username: string;
    password: string;
    confirmPassword: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    email: string;
    phone_num: string;
    is_landlord: boolean;
    is_admin: boolean;
}

const initialState: SignUpForm = {
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone_num: '',
    is_landlord: false,
    is_admin: false
};

export const useSignUp = () => {
    const [form, setForm] = useState<SignUpForm>(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange =(field: keyof SignUpForm, value: string | boolean) => {
        setForm(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = async () => {
        setError(null);

        // Password validation
        if (form.password != form.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        if (!form.username || !form.email || !form.first_name){
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            await createUser(
                form.username,
                form.password,
                form.first_name,
                form.last_name,
                new Date(form.date_of_birth),
                form.email,
                form.phone_num,
                form.is_landlord,
                form.is_admin,
                new Date()
            );
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return {form, handleChange, handleSubmit, loading, error};
}