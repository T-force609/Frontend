import { useState } from "react";
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import {getCookie} from './utils';
import "react-datepicker/dist/react-datepicker.css";

const ContactForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [deadline, setDeadline] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);

    const csrftoken = getCookie('csrftoken')
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const formData = {
                ...data,
                deadline: deadline ? deadline.toISOString().split('T')[0] : null
            };

            const response = await fetch('https://codewithajdev-api.onrender.com/api/contact_request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmitStatus('success');
                reset();
                setDeadline(null);
            } else {
                const errorData = await response.json();
                setSubmitStatus('error');
                console.error('Submission error:', errorData);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Network error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-blue-400 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Book My Service</h3>
            
            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    <p className="font-semibold">Thank you! Your request has been submitted successfully.</p>
                    <p>I'll contact you within 24 hours to discuss your project.</p>
                </div>
            )}
            
            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-semibold">There was an error submitting your request. Please try again.</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name *
                        </label>
                        <input 
                            id="name" 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <input 
                            id="email" 
                            type="email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Needed *
                    </label>
                    <div className="space-y-2">
                        {[
                            {value: '3D', label: '3D Art'},
                            {value: 'WEB', label: 'Web dev'},
                            {value: 'ML', label: 'Machine Learning Project'},
                            {value: 'KIVY', label: 'Android App'},
                            {value: 'OTHER', label: 'Other'}
                        ].map((service) => (
                            <label key={service.value} className="flex items-center space-x-2">
                                <input 
                                    type="radio" 
                                    value={service.value} 
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    {...register('request_type', { required: 'Please select a service type' })} 
                                />
                                <span className="text-gray-700">{service.label}</span>
                            </label>
                        ))}
                        {errors.request_type && (
                            <p className="mt-1 text-sm text-red-600">{errors.request_type.message}</p>
                        )}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="project-details" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Details *
                    </label>
                    <textarea 
                        id="project-details" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        rows={4} 
                        placeholder="Describe your project requirements, goals, and any specific details..."
                        {...register('project_details', {
                            required: 'Project details are required',
                            minLength: {
                                value: 30,
                                message: 'Please provide more details (at least 30 characters)'
                            }
                        })}
                    />
                    {errors.project_details && (
                        <p className="mt-1 text-sm text-red-600">{errors.project_details.message}</p>
                    )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                            Estimated Budget (Optional)
                        </label>
                        <select 
                            id="budget" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            {...register('budget')}
                        >
                            <option value="">Select budget range</option>
                            <option value="$500 - $1,000">$500 - $1,000</option>
                            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000+">$10,000+</option>
                            <option value="Not sure">Not Sure</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                            Project Deadline (Optional)
                        </label>
                        <DatePicker 
                            id="deadline"
                            selected={deadline} 
                            onChange={(date) => setDeadline(date)}
                            minDate={new Date()}
                            placeholderText="Select a date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                    </div>
                </div>
                
                <div className="pt-4">
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
