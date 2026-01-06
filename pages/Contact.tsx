import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../services/firebase';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { showToast } = useToast();

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;
      case 'email':
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
        return undefined;
      case 'message':
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<FormState> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormState]);
      if (error) newErrors[key as keyof FormState] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) {
      showToast("Please check the form for errors.", "error");
      return;
    }

    setIsSubmitting(true);
    const success = await submitContactForm(formData);

    if (success) {
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      showToast("Message sent successfully!", "success");
    } else {
      showToast("Something went wrong. Please try again.", "error");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Contact | Anurup R Krishnan</title>
        <meta name="description" content="Get in touch with Anurup R Krishnan." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4">
            Get In <span className="text-neo-yellow stroke-black">Touch</span>
          </h1>
          <p className="text-xl font-bold">
            Have a project in mind? Let's Build Something Exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card color="blue" className="h-full flex flex-col justify-center" tilt>
              <h3 className="text-3xl font-black uppercase mb-6 text-white">Let's talk!</h3>
              <p className="text-lg font-bold mb-8">
                I'm open to full-time opportunities and complex engineering challenges. If you have a question or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-4 font-bold text-lg">
                <div className="bg-white p-4 border-4 border-neo-black shadow-neo-sm break-all">
                  anuruprkrishnan@gmail.com
                </div>
                <div className="bg-white p-4 border-4 border-neo-black shadow-neo-sm">
                  Coimbatore, India
                </div>
              </div>
            </Card>
          </div>

          {/* Form */}
          <div>
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-neo-green border-4 border-neo-black p-8 text-center shadow-neo h-full flex flex-col items-center justify-center"
              >
                <CheckCircle size={64} className="mb-4 text-black" />
                <h3 className="text-3xl font-black uppercase mb-4">Message Sent!</h3>
                <p className="text-xl font-bold mb-8">Thanks for reaching out. I'll be in touch shortly.</p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                  Send Another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border-4 border-neo-black p-8 shadow-neo">
                <motion.div animate={errors.name ? { x: [-10, 10, -10, 10, 0] } : {}}>
                  <Input
                    label="Name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                </motion.div>

                <motion.div animate={errors.email ? { x: [-10, 10, -10, 10, 0] } : {}}>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </motion.div>

                <motion.div animate={errors.message ? { x: [-10, 10, -10, 10, 0] } : {}}>
                  <TextArea
                    label="Message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                  />
                </motion.div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full flex justify-center items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send className="ml-2" size={20} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;