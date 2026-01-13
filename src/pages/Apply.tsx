
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, User, GraduationCap, Code, FileText, Phone, ArrowRight, ChevronLeft, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechGridBackground from '@/components/ui/TechGridBackground';
import HolographicCard from '@/components/ui/HolographicCard';
import RevealText from '@/components/ui/RevealText';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Apply = () => {
    const { user, signInWithGoogle, loading: authLoading } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: user?.displayName || '',
        rollNumber: '',
        phone: '',
        department: '',
        year: '',
        primaryDept: '',
        domains: [] as string[],
        skills: '',
        reason: '',
        secondaryDept: '',
        secondaryDomains: [] as string[],
        secondarySkills: '',
        secondaryReason: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const domainOptions: Record<string, string[]> = {
        'Technical': ['IoT & Embedded Systems', 'Robotics & Automation', 'AI & Edge Computing', 'Cybersecurity', 'Web & App Development'],
        'Management': ['Event Management', 'Team Coordination', 'Logistics', 'Public Relations'],
        'Design & Content': ['Graphic Design (Canva/Figma)', 'Video Editing', 'Content Writing', 'UI/UX Design'],
        'Branding': ['Brand Strategy', 'Visual Identity', 'Marketing Campaigns', 'Social Media Management', 'Content Scheduling', 'Analytics'],
        'Finance': ['Budgeting', 'Sponsorship Management', 'Accounting'],
        'Outreach': ['Corporate Outreach', 'Student Outreach', 'Partnerships']
    };

    const skillLabels: Record<string, string> = {
        'Technical': 'Technical Skills',
        'Design & Content': 'Design Tools & Software',
        'Finance': 'Accounting/Management Tools',
        'Branding': 'Branding & Social Tools',
        'default': 'Relevant Skills'
    };

    const skillPlaceholders: Record<string, string> = {
        'Technical': 'e.g. Python, C++, Arduino, React, PCB Design...',
        'Design & Content': 'e.g. Photoshop, Illustrator, Figma, Premiere Pro...',
        'Management': 'e.g. Asana, Trello, Leadership, Communication...',
        'Branding': 'e.g. Brand Strategy, Canva, Instagram Insights, Copywriting...',
        'Finance': 'e.g. Excel, Tally, Budget Management...',
        'Outreach': 'e.g. Public Speaking, Email Writing, Negotiation...',
        'default': 'List your relevant skills here...'
    };

    const reasonPlaceholders: Record<string, string> = {
        'Technical': 'Tell us about your technical projects and what you want to build...',
        'Design & Content': 'Share your design philosophy or portfolio links...',
        'Management': 'Describe your experience in leading teams or organizing events...',
        'Branding': 'How would you position NOVA CPS as a brand and grow our online presence?',
        'Finance': 'Why do you want to manage finances for a student organization?',
        'Outreach': 'How would you help us connect with industry experts?',
        'default': 'Tell us about your motivation and what you hope to achieve...'
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'primaryDept') {
            setFormData(prev => ({ ...prev, primaryDept: value, domains: [] }));
        } else if (name === 'secondaryDept') {
            setFormData(prev => ({ ...prev, secondaryDept: value, secondaryDomains: [] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDomainToggle = (domain: string, isSecondary = false) => {
        setFormData(prev => {
            const targetList = isSecondary ? prev.secondaryDomains : prev.domains;
            const updated = targetList.includes(domain)
                ? targetList.filter(d => d !== domain)
                : [...targetList, domain];

            return isSecondary
                ? { ...prev, secondaryDomains: updated }
                : { ...prev, domains: updated };
        });
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName) {
            // Basic validation check
        }
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevStep = () => {
        setStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);

        try {
            // Attempt to save to Firestore
            // This will throw if API keys are missing or permissions denied
            await addDoc(collection(db, 'applications'), {
                ...formData,
                email: user.email,
                userId: user.uid,
                createdAt: serverTimestamp(),
                status: 'pending'
            });

            console.log("Application saved to Firestore successfully");

            setIsSubmitting(false);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting application:', error);
            // Even if Firestore fails (likely due to config), we show success to user if in development to not block flow?
            // "There should no reason for the loss of data" -> We should alert the user if it fails!
            alert("Warning: Application could not be saved to the database. Please check console/admin settings.");
            setIsSubmitting(false);
        }
    };

    // derived values
    const currentDomains = formData.primaryDept ? domainOptions[formData.primaryDept] || [] : [];
    const currentSkillLabel = formData.primaryDept ? (skillLabels[formData.primaryDept] || skillLabels['default']) : skillLabels['default'];
    const currentSkillPlaceholder = formData.primaryDept ? (skillPlaceholders[formData.primaryDept] || skillPlaceholders['default']) : skillPlaceholders['default'];
    const currentReasonPlaceholder = formData.primaryDept ? (reasonPlaceholders[formData.primaryDept] || reasonPlaceholders['default']) : reasonPlaceholders['default'];

    // derived values for secondary
    const secondaryDomainsList = formData.secondaryDept ? domainOptions[formData.secondaryDept] || [] : [];
    const secondarySkillLabel = formData.secondaryDept ? (skillLabels[formData.secondaryDept] || skillLabels['default']) : skillLabels['default'];
    const secondarySkillPlaceholder = formData.secondaryDept ? (skillPlaceholders[formData.secondaryDept] || skillPlaceholders['default']) : skillPlaceholders['default'];
    const secondaryReasonPlaceholder = formData.secondaryDept ? (reasonPlaceholders[formData.secondaryDept] || reasonPlaceholders['default']) : reasonPlaceholders['default'];

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-foreground">
                <TechGridBackground />
                <div className="absolute inset-0 bg-background/80 pointer-events-none -z-10" />

                <HolographicCard className="p-12 max-w-lg w-full text-center">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold mb-4">Application Received</h2>
                    <p className="text-muted-foreground mb-8">
                        Thank you for applying to NOVA CPS. We have recorded your preferences and will be in touch soon.
                    </p>
                    <Button asChild className="bg-primary text-primary-foreground">
                        <Link to="/">Return to Home</Link>
                    </Button>
                </HolographicCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative text-foreground">
            <TechGridBackground />
            <div className="absolute inset-0 bg-background/80 pointer-events-none -z-10" />

            <div className="container mx-auto px-6 py-12 relative z-10">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                {authLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : !user ? (
                    <div className="max-w-lg mx-auto mt-20">
                        <HolographicCard className="p-10 text-center">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <User className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-heading font-bold mb-4">Authentication Required</h2>
                            <p className="text-muted-foreground mb-8">
                                To apply for NOVA CPS, you must sign in with your VIT Student email address (@vitstudent.ac.in).
                            </p>
                            <Button
                                onClick={() => signInWithGoogle()}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-bold"
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Sign In with Google
                            </Button>
                        </HolographicCard>
                    </div>
                ) : (

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                                <RevealText text={step === 1 ? "Membership Application" : "Second Preference"} />
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                {step === 1
                                    ? "Step 1: Personal Details & Primary Choice"
                                    : "Step 2: Backup Department Choice"}
                            </p>
                            {/* Step Indicator */}
                            <div className="flex justify-center gap-2 mt-4">
                                <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-primary' : 'w-2 bg-primary/30'}`} />
                                <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-primary' : 'w-2 bg-primary/30'}`} />
                            </div>
                        </div>

                        <HolographicCard className="p-8 md:p-10">
                            <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-8">

                                {/* STEP 1 CONTENT */}
                                {step === 1 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                                        {/* Personal Info */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-heading font-semibold flex items-center gap-2 text-primary/80">
                                                <User className="w-5 h-5" /> Personal Details
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                                        placeholder="Donald Putin"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-muted-foreground">Roll Number / ID</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="rollNumber"
                                                        value={formData.rollNumber}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                                        placeholder="23BPS1234"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                                        <input
                                                            required
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-background/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                                            placeholder="+91 98765 43210"
                                                        />
                                                    </div>
                                                </div>                        </div>
                                        </div>

                                        {/* Academic Info */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-heading font-semibold flex items-center gap-2 text-primary/80">
                                                <GraduationCap className="w-5 h-5" /> Academic Info
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                                                    <select
                                                        required
                                                        name="department"
                                                        value={formData.department}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground"
                                                    >
                                                        <option value="" disabled>Select Department</option>
                                                        <option value="CSE (CPS)">CSE (Cyber Physical Systems)</option>
                                                        <option value="CSE (Core)">CSE (Core & Specializations)</option>
                                                        <option value="OTHER">Other</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-muted-foreground">Year of Study</label>
                                                    <select
                                                        name="year"
                                                        value={formData.year}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground"
                                                    >
                                                        <option value="" disabled>Select Year</option>
                                                        <option value="1">1st Year</option>
                                                        <option value="2">2nd Year</option>
                                                        <option value="3">3rd Year</option>
                                                        <option value="4">4th Year</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Primary Role Choice */}
                                        <div className="space-y-6 pt-6 border-t border-white/10">
                                            <h3 className="text-xl font-heading font-semibold flex items-center gap-2 text-primary">
                                                <Code className="w-5 h-5" /> Primary Choice (Dept 1)
                                            </h3>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-muted-foreground">Department of Interest</label>
                                                <select
                                                    required
                                                    name="primaryDept"
                                                    value={formData.primaryDept}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground"
                                                >
                                                    <option value="" disabled>Select Primary Department</option>
                                                    <option value="Technical">Technical</option>
                                                    <option value="Management">Management</option>
                                                    <option value="Design & Content">Design & Content</option>
                                                    <option value="Branding">Branding</option>
                                                    <option value="Finance">Finance</option>
                                                    <option value="Outreach">Outreach</option>
                                                </select>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-sm font-medium text-muted-foreground">
                                                    {formData.primaryDept ? `Specific Roles for ${formData.primaryDept}` : 'Select a Department above to see roles'}
                                                </label>

                                                {currentDomains.length > 0 ? (
                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        {currentDomains.map(domain => (
                                                            <div
                                                                key={domain}
                                                                onClick={() => handleDomainToggle(domain)}
                                                                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all duration-200 flex items-center gap-3
                                    ${formData.domains.includes(domain)
                                                                        ? 'bg-primary/20 border-primary text-primary'
                                                                        : 'bg-background/30 border-white/5 hover:border-white/20 text-muted-foreground'
                                                                    }`}
                                                            >
                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0
                                    ${formData.domains.includes(domain) ? 'border-primary bg-primary' : 'border-current'}
                                `}>
                                                                    {formData.domains.includes(domain) && <div className="w-2 h-2 bg-background rounded-sm" />}
                                                                </div>
                                                                <span className="text-sm font-medium">{domain}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center text-muted-foreground text-sm italic">
                                                        Please select a Department of Interest first.
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-muted-foreground">{currentSkillLabel}</label>
                                                <input
                                                    type="text"
                                                    name="skills"
                                                    value={formData.skills}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                                    placeholder={currentSkillPlaceholder}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-muted-foreground">Why do you want to join this department?</label>
                                                <textarea
                                                    required
                                                    name="reason"
                                                    value={formData.reason}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                                                    placeholder={currentReasonPlaceholder}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <Button
                                                type="submit"
                                                className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg group"
                                            >
                                                Next Step
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2 CONTENT */}
                                {step === 2 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary mb-6">
                                            <span className="text-sm font-medium">✨ Why a second preference?</span>
                                            <span className="text-xs text-muted-foreground">If slots in your primary department are full, we will consider you for this role.</span>
                                        </div>

                                        {/* Secondary Role Choice */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-heading font-semibold flex items-center gap-2 text-primary">
                                                <Code className="w-5 h-5" /> Secondary Choice (Dept 2)
                                            </h3>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-muted-foreground">Department of Interest</label>
                                                <select
                                                    required
                                                    name="secondaryDept"
                                                    value={formData.secondaryDept}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground"
                                                >
                                                    <option value="" disabled>Select Secondary Department</option>
                                                    <option value="Technical" disabled={formData.primaryDept === 'Technical'}>Technical</option>
                                                    <option value="Management" disabled={formData.primaryDept === 'Management'}>Management</option>
                                                    <option value="Design & Content" disabled={formData.primaryDept === 'Design & Content'}>Design & Content</option>
                                                    <option value="Branding" disabled={formData.primaryDept === 'Branding'}>Branding</option>
                                                    <option value="Finance" disabled={formData.primaryDept === 'Finance'}>Finance</option>
                                                    <option value="Outreach" disabled={formData.primaryDept === 'Outreach'}>Outreach</option>
                                                </select>
                                                {/* If primary dept selected, show visual feedback */}
                                                {formData.primaryDept && (
                                                    <p className="text-xs text-muted-foreground">Your primary choice <b>{formData.primaryDept}</b> is disabled here.</p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-sm font-medium text-muted-foreground">
                                                    {formData.secondaryDept ? `Specific Roles for ${formData.secondaryDept}` : 'Select a Department above to see roles'}
                                                </label>

                                                {secondaryDomainsList.length > 0 ? (
                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        {secondaryDomainsList.map(domain => (
                                                            <div
                                                                key={domain}
                                                                onClick={() => handleDomainToggle(domain, true)}
                                                                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all duration-200 flex items-center gap-3
                                    ${formData.secondaryDomains.includes(domain)
                                                                        ? 'bg-primary/20 border-primary text-primary'
                                                                        : 'bg-background/30 border-white/5 hover:border-white/20 text-muted-foreground'
                                                                    }`}
                                                            >
                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0
                                    ${formData.secondaryDomains.includes(domain) ? 'border-primary bg-primary' : 'border-current'}
                                `}>
                                                                    {formData.secondaryDomains.includes(domain) && <div className="w-2 h-2 bg-background rounded-sm" />}
                                                                </div>
                                                                <span className="text-sm font-medium">{domain}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center text-muted-foreground text-sm italic">
                                                        Please select a Secondary Department of Interest first.
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-muted-foreground">{secondarySkillLabel}</label>
                                                <input
                                                    type="text"
                                                    name="secondarySkills"
                                                    value={formData.secondarySkills}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                                    placeholder={secondarySkillPlaceholder}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-muted-foreground">Why this secondary choice?</label>
                                                <textarea
                                                    required
                                                    name="secondaryReason"
                                                    value={formData.secondaryReason}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                                                    placeholder={secondaryReasonPlaceholder}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handlePrevStep}
                                                className="h-12 px-6 border-white/10 hover:bg-white/5"
                                            >
                                                <ChevronLeft className="w-4 h-4 mr-2" />
                                                Back
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg"
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center">
                                                        <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                                                        Submitting...
                                                    </span>
                                                ) : (
                                                    'Submit Application'
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}

                            </form>
                        </HolographicCard>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Apply;
