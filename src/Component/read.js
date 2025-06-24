import { useState } from "react";
import { useForm} from 'react-hook-form';
import DatePicker from 'react-datepicker';

const ContactForm = () => {
    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const [deadline, setDeadline] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setSubmitStatus(null)

        try{
            const formData = {
                ...data,
                deadline: deadline? deadline.toISOString().split('T')[0]: null
            };

            const response = await fetch('http//codewithajdev.render.com/api/contact-request/', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmitStatus('success');
                reset();
                setDeadline(null);
            } else {
                const errorDate = await response.json();
                setSubmitStatus('error');
                console.error('submission error:', errorDate);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Network error:', error);
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <div>
            <h3>Book My Service</h3>
            {submitStatus === 'success' && (
                <div>
                    <p>Thank you! Your request has been submitted successfully</p>
                    <p>I'll contact you within 24 hours to discuss your project.</p>
                </div>
            )}
            {submitStatus === 'error' && (
                <div>
                    <p>There was an error submitting your request. Please try again.</p>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid">
                    <div>
                        <label htmlFor="name">
                            Your Name *
                        </label>
                        <input id="name" type="text" className="text-black"></input>
                    </div>

                    <div>
                        <label htmlFor="email">
                            Email Address *
                        </label>
                        <input id="email" type="text" className="text-black"></input>
                        {errors.email && (<p>{errors.email.message}</p>)}
                    </div>
                </div>
                <div>
                    <label>
                        Service Needed *
                    </label>
                    <div>
                        {[
                            {value: '3D', label: '3D Art'},
                            {value: 'WEB', label: 'Web dev'},
                            {value: 'ML', label: 'Machine Learning Project'},
                            {value: 'KIVY', label: 'Andriod App'},
                            {value: 'OTHER', label: 'Other'}
                        ].map((service)=> (
                            <label key={service.value}>
                                <input type="radio" value={service.value} className="text-black" {...register('request_type', {request:'Please select a service type'})} />
                                <span className="">{service.label}</span>
                            </label>
                        ))}
                        <div>
                            {errors.request_type && (
                                <p>{errors.request_type.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="project-type">
                                Project Detail *
                            </label>
                            <textarea id="project-type" className="text-black"
                                rows={4} placeholder="describe your project requirements, goals, and any specific details..." 
                                {...register('project_details are required ',{
                                    required: 'Project details are required',
                                    minlength: {
                                        value : 30,
                                        message: 'please provide more details (at least 30 characters)'
                                    }
                                }
                                )}
                                />
                                {errors.project_detail && (
                                    <p>{errors.project_details.message}</p>
                                )}
                        </div>
                        <div>
                            <div>
                                <label htmlFor="budget">
                                    Estimated budget (Optional)
                                </label>
                                <select id="budget" 
                                {...register('budget')}>
                                    <option value="" className="text-black">select budget range </option>
                                    <option value="$500 - $1,000" className="text-black">$500 - $1,000</option>
                                    <option value='$1,000 - $5,000' className="text-black">$1000 - $5,000</option>
                                    <option value='$5,000 - $10,000' className="text-black">$5,000 - $10,000</option>
                                    <option value='$10,000' className="text-black">$10,000</option>
                                    <option value="Not sure" className="text-black">Not Sure</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="deadline">
                                Project Deadline (Optional)
                            </label>
                            <DatePicker 
                                selected={deadline} 
                                onchange={(date) => setDeadline(date)}
                                minDate={new Date()}
                                placeholderText="select a date" />
                        </div>
                    </div>
                    <div>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            >

                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;
