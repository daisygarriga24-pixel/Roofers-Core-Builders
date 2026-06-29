/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Send, Clock, User, Phone, Mail, MapPin, ClipboardList, Trash2, ShieldCheck, Database } from "lucide-react";
import { EstimateSubmission } from "../types";

interface EstimateFormProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
}

export default function EstimateForm({ selectedService, setSelectedService }: EstimateFormProps) {
  const [formData, setFormData] = useState<EstimateSubmission>({
    name: "",
    phone: "",
    email: "",
    address: "",
    serviceNeeded: "",
    projectDetails: "",
    preferredContactTime: "Morning (8AM - 12PM)"
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [storedLeads, setStoredLeads] = useState<EstimateSubmission[]>([]);
  const [showLeadsDashboard, setShowLeadsDashboard] = useState(false);

  // Sync selectedService prop to form input state
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        serviceNeeded: selectedService
      }));
    }
  }, [selectedService]);

  // Load existing leads from localStorage
  useEffect(() => {
    const leads = localStorage.getItem("roofers_core_leads");
    if (leads) {
      try {
        setStoredLeads(JSON.parse(leads));
      } catch (e) {
        console.error("Failed to parse leads", e);
      }
    }
  }, []);

  const servicesOptions = [
    "Roof Replacement",
    "Roof Repair",
    "Storm & Wind Damage Repair",
    "Gutter Installation",
    "Attic Venting Repairs",
    "Roof Decking & Wood Replacement",
    "Shingle Color Selection",
    "Roof Inspections"
  ];

  const timeOptions = [
    "Morning (8AM - 12PM)",
    "Afternoon (12PM - 4PM)",
    "Evening (4PM - 7PM)",
    "Urgent - Call ASAP!"
  ];

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    let formatted = "";
    if (rawValue.length > 0) {
      formatted += "(" + rawValue.substring(0, 3);
    }
    if (rawValue.length > 3) {
      formatted += ") " + rawValue.substring(3, 6);
    }
    if (rawValue.length > 6) {
      formatted += "-" + rawValue.substring(6, 10);
    }
    
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required";
    if (formData.phone.length < 14) tempErrors.phone = "Valid phone number is required (10 digits)";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.address.trim()) tempErrors.address = "Property address is required";
    if (!formData.serviceNeeded) tempErrors.serviceNeeded = "Please select a service";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Save lead to local storage
    const updatedLeads = [formData, ...storedLeads];
    setStoredLeads(updatedLeads);
    localStorage.setItem("roofers_core_leads", JSON.stringify(updatedLeads));

    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      serviceNeeded: "",
      projectDetails: "",
      preferredContactTime: "Morning (8AM - 12PM)"
    });
    setSelectedService("");
    setIsSubmitted(false);
  };

  const handleDeleteLead = (idxToDelete: number) => {
    const updatedLeads = storedLeads.filter((_, idx) => idx !== idxToDelete);
    setStoredLeads(updatedLeads);
    localStorage.setItem("roofers_core_leads", JSON.stringify(updatedLeads));
  };

  return (
    <section id="estimate" className="py-24 bg-brand-blue relative scroll-mt-12">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Lead Capture card wrapping */}
        <div className="bg-brand-slate/65 backdrop-blur-md border border-brand-slate rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          {/* Subtle gold line header accent */}
          <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form-entry"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="font-sans text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">
                    Get In Touch
                  </span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2 mb-3">
                    Request Your Free Roofing Estimate
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-gray-300">
                    Fill out our high-priority estimate request form below. Leonard or Dale will contact you shortly to review your scope and book your inspection.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" id="estimate-form-fields">
                  
                  {/* Two-Column Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`bg-brand-blue/80 border text-white rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition-all ${
                          errors.name ? "border-red-500" : "border-brand-slate"
                        }`}
                      />
                      {errors.name && <span className="font-sans text-xs text-red-500">{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="(305) 555-0199"
                        maxLength={14}
                        className={`bg-brand-blue/80 border text-white rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition-all ${
                          errors.phone ? "border-red-500" : "border-brand-slate"
                        }`}
                      />
                      {errors.phone && <span className="font-sans text-xs text-red-500">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@gmail.com"
                        className={`bg-brand-blue/80 border text-white rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition-all ${
                          errors.email ? "border-red-500" : "border-brand-slate"
                        }`}
                      />
                      {errors.email && <span className="font-sans text-xs text-red-500">{errors.email}</span>}
                    </div>

                    {/* Property Address */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Property Address *</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="1259 NW 7th St, Miami, FL 33125"
                        className={`bg-brand-blue/80 border text-white rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition-all ${
                          errors.address ? "border-red-500" : "border-brand-slate"
                        }`}
                      />
                      {errors.address && <span className="font-sans text-xs text-red-500">{errors.address}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Needed */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center space-x-1">
                        <ClipboardList className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Service Needed *</span>
                      </label>
                      <div className="relative">
                        <select
                          name="serviceNeeded"
                          value={formData.serviceNeeded}
                          onChange={handleChange}
                          className={`w-full bg-brand-blue/80 border text-white rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer ${
                            errors.serviceNeeded ? "border-red-500" : "border-brand-slate"
                          }`}
                        >
                          <option value="" disabled className="bg-brand-blue text-gray-400">
                            -- Select a Roofing Solution --
                          </option>
                          {servicesOptions.map((opt, oIdx) => (
                            <option key={oIdx} value={opt} className="bg-brand-slate text-white py-1">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-gold">
                          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                      {errors.serviceNeeded && <span className="font-sans text-xs text-red-500">{errors.serviceNeeded}</span>}
                    </div>

                    {/* Preferred Contact Time */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Preferred Contact Time</span>
                      </label>
                      <div className="relative">
                        <select
                          name="preferredContactTime"
                          value={formData.preferredContactTime}
                          onChange={handleChange}
                          className="w-full bg-brand-blue/80 border border-brand-slate text-white rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {timeOptions.map((opt, oIdx) => (
                            <option key={oIdx} value={opt} className="bg-brand-slate text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-gold">
                          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                      Project Details / Notes (Optional)
                    </label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      rows={4}
                      placeholder="e.g. Roof is leaking in kitchen, wind shingles missing since last storm, etc."
                      className="bg-brand-blue/80 border border-brand-slate text-white rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full group flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-extrabold py-4 rounded-xl text-base transition-all duration-300 shadow-xl shadow-red-600/10 hover:shadow-red-600/25 hover:scale-101 cursor-pointer"
                      id="form-submit-btn"
                    >
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      <span>Submit Estimate Request</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center space-x-1.5 text-xs text-gray-400 font-sans pt-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Your private details are encrypted and safe with us. No spam guarantee.</span>
                  </div>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <h2 className="font-display font-extrabold text-3xl text-white mb-3">
                  Estimate Requested Successfully!
                </h2>
                <p className="font-sans text-base text-gray-300 max-w-lg mx-auto mb-8">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your estimate request for <strong className="text-brand-gold">{formData.serviceNeeded}</strong> has been prioritised. Our estimator Zachary will call you at <span className="text-white font-mono">{formData.phone}</span> to finalize your booking.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleResetForm}
                    className="bg-brand-slate hover:bg-brand-slate/80 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all border border-brand-slate"
                  >
                    Submit Another Request
                  </button>
                  <a
                    href="tel:6456661250"
                    className="bg-brand-gold hover:bg-brand-gold-hover text-brand-blue font-bold py-3 px-6 rounded-xl text-sm transition-all"
                  >
                    Call Immediate Support
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Local storage leads logger widget (admin proof) */}
        {storedLeads.length > 0 && (
          <div className="mt-8 text-center" id="admin-log-widget">
            <button
              onClick={() => setShowLeadsDashboard(!showLeadsDashboard)}
              className="inline-flex items-center space-x-1.5 text-xs text-brand-gold/60 hover:text-brand-gold underline focus:outline-none cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{showLeadsDashboard ? "Hide" : "Show"} Active Leads Dashboard ({storedLeads.length})</span>
            </button>

            {showLeadsDashboard && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-brand-slate/40 border border-brand-slate text-left rounded-2xl p-5 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-brand-slate">
                  <h4 className="font-display font-bold text-sm text-white">Submitted Leads Database (Local Cache)</h4>
                  <span className="font-mono text-[10px] text-gray-400">Total: {storedLeads.length} leads</span>
                </div>

                <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                  {storedLeads.map((lead, idx) => (
                    <div key={idx} className="bg-brand-blue/60 border border-brand-slate p-4 rounded-xl relative flex justify-between items-start gap-4">
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-sans font-bold text-white text-sm">{lead.name}</span>
                          <span className="text-[10px] bg-brand-gold/15 text-brand-gold px-2 py-0.5 rounded font-semibold uppercase">{lead.serviceNeeded}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-gray-300">
                          <div>Phone: {lead.phone}</div>
                          <div>Email: {lead.email}</div>
                          <div className="sm:col-span-2">Address: {lead.address}</div>
                          <div className="sm:col-span-2">Preferred Contact: {lead.preferredContactTime}</div>
                        </div>
                        {lead.projectDetails && (
                          <p className="text-gray-400 italic text-[11px] pt-1">"{lead.projectDetails}"</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteLead(idx)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-all focus:outline-none shrink-0"
                        title="Delete lead from local log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
