import { useState } from "react";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import useRedirect from "./useRedirect";




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
    is_student: boolean;
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
    is_admin: false,
    is_student: false
};

export const useSignUp = () => {

    const redirect = useRedirect();
    const [form, setForm] = useState<SignUpForm>(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, '');

    
        const numLimit = digits.slice(0,10);

    if (numLimit.length < 4) return numLimit;
    if(numLimit.length < 7) return `${numLimit.slice(0, 3)}-${numLimit.slice(3)}`
    return `${numLimit.slice(0, 3)}-${numLimit.slice(3, 6)}-${numLimit.slice(6)}`;
  };

    const handleChange =(field: keyof SignUpForm, value: string | boolean) => {
        if (field === 'phone_num' && typeof value === 'string') {
        setForm(prev => ({...prev, [field]:formatPhoneNumber(value)}));
        } else {
            setForm(prev => ({...prev, [field]: value}));
        }
    };

    const handleSubmit = async () => {
        setError(null);
        
        // Password Validation
        if (form.password != form.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Required Field Validation
        if (!form.username || !form.email || !form.first_name){
            setError('Please fill in all required fields');
            return;
        }
        
        // Date Of Birth Validation
        if (!form.date_of_birth) {
            setError('Please enter your date of birth');
            return;
        }
        // Phone Number Validation
        const digitsOnly = form.phone_num.replace(/\D/g, '');
        if (digitsOnly.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
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
            setForm(initialState);
            setTimeout(()=> {
               redirect('/sign-in')
            }, 5000)
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return {form, handleChange, handleSubmit, loading, error};
}