import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Download, Search, Loader2, Eye, Star, CheckCircle, XCircle, MinusCircle, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import HolographicCard from '@/components/ui/HolographicCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface Application {
    id: string;
    fullName: string;
    email: string;
    rollNumber: string;
    phone: string;
    year: string;
    department: string; // Academic dept

    // Primary Choice
    primaryDept: string;
    domains: string[];
    skills: string;
    reason: string;

    // Secondary Choice
    secondaryDept: string;
    secondaryDomains: string[];
    secondarySkills: string;
    secondaryReason: string;

    submittedAt: any;
    status: 'pending' | 'selected' | 'rejected' | 'neutral';
    rating: number; // 0-5
}

const Admin = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

    const ADMIN_EMAILS = [
        'sibhi.s2024@vitstudent.ac.in',
        'sibhis5223@gmail.com',
        'santhosh.v2024d@vitstudent.ac.in'
    ];

    useEffect(() => {
        if (!authLoading && (!user || !user.email || !ADMIN_EMAILS.includes(user.email))) {
            return;
        }

        if (user?.email && ADMIN_EMAILS.includes(user.email)) {
            fetchApplications();
        }
    }, [user, authLoading]);

    const fetchApplications = async () => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const apps: Application[] = (data || []).map((doc: any) => ({
                id: doc.id,
                fullName: doc.full_name,
                email: doc.email,
                rollNumber: doc.roll_number,
                phone: doc.phone,
                year: doc.year,
                department: doc.department,

                primaryDept: doc.primary_dept,
                domains: doc.domains || [],
                skills: doc.skills || '',
                reason: doc.reason || '',

                secondaryDept: doc.secondary_dept || '',
                secondaryDomains: doc.secondary_domains || [],
                secondarySkills: doc.secondary_skills || '',
                secondaryReason: doc.secondary_reason || '',

                submittedAt: doc.created_at,
                status: doc.status || 'pending',
                rating: doc.rating || 0
            }));

            setApplications(apps);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateApplication = async (id: string, updates: Partial<Application>) => {
        try {
            // Optimistic update
            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, ...updates } : app
            ));
            if (selectedApp && selectedApp.id === id) {
                setSelectedApp(prev => prev ? { ...prev, ...updates } : null);
            }

            const dbUpdates: any = {};
            if (updates.status) dbUpdates.status = updates.status;
            if (updates.rating !== undefined) dbUpdates.rating = updates.rating;

            const { error } = await supabase
                .from('applications')
                .update(dbUpdates)
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error("Error updating application:", error);
            // Revert on error (could implement full revert logic here)
            alert("Failed to update application. Please try again.");
            fetchApplications();
        }
    };

    const deleteApplication = async (id: string) => {
        if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
            return;
        }

        try {
            const { error } = await supabase
                .from('applications')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setApplications(prev => prev.filter(app => app.id !== id));
            if (selectedApp?.id === id) {
                setSelectedApp(null);
            }
        } catch (error) {
            console.error("Error deleting application:", error);
            alert("Failed to delete application. Please try again.");
        }
    };

    const downloadExcel = () => {
        const data = applications.map(app => ({
            'Full Name': app.fullName,
            'Email': app.email,
            'Roll Number': app.rollNumber,
            'Phone': app.phone,
            'Year': app.year,
            'Department': app.department,
            'Primary Choice': app.primaryDept,
            'Primary Domains': app.domains.join(', '),
            'Primary Skills': app.skills,
            'Primary Reason': app.reason,
            'Secondary Choice': app.secondaryDept,
            'Secondary Domains': app.secondaryDomains.join(', '),
            'Secondary Skills': app.secondarySkills,
            'Secondary Reason': app.secondaryReason,
            'Status': app.status,
            'Rating': app.rating,
            'Submitted At': app.submittedAt ? new Date(app.submittedAt).toLocaleString() : ''
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Applications");
        XLSX.writeFile(wb, "nova_applications.xlsx");
    };

    if (authLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    if (!user || !user.email || !['sibhi.s2024@vitstudent.ac.in', 'sibhis5223@gmail.com', 'santhosh.v2024d@vitstudent.ac.in'].includes(user.email)) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <HolographicCard className="max-w-md w-full text-center p-8 border-red-500/50">
                    <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h1>
                    <p className="text-muted-foreground mb-6">
                        You do not have permission to view this page. This area is restricted to administrators only.
                    </p>
                    <Button onClick={() => navigate('/')} variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-950/30">
                        Return Home
                    </Button>
                </HolographicCard>
            </div>
        );
    }

    const filteredApps = applications.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'selected': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'rejected': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'neutral': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-black text-foreground p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                            Admin Dashboard
                        </h1>
                        <p className="text-muted-foreground">Managing {applications.length} applications</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search applicants..."
                                className="pl-9 bg-white/5 border-white/10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button onClick={downloadExcel} className="bg-primary hover:bg-primary/90">
                            <Download className="w-4 h-4 mr-2" />
                            Export Excel
                        </Button>
                    </div>
                </div>

                {/* Main Table */}
                <HolographicCard className="p-0 overflow-hidden">
                    <div className="max-h-[70vh] overflow-auto">
                        <Table>
                            <TableHeader className="bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                                <TableRow className="hover:bg-white/5 border-white/10">
                                    <TableHead className="text-primary w-[200px]">Name</TableHead>
                                    <TableHead className="text-primary">Dept</TableHead>
                                    <TableHead className="text-primary">Choice 1</TableHead>
                                    <TableHead className="text-primary">Rating</TableHead>
                                    <TableHead className="text-primary text-center">Status</TableHead>
                                    <TableHead className="text-primary text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-32 text-center">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                                        </TableCell>
                                    </TableRow>
                                ) : filteredApps.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                            No applications found matching your criteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredApps.map((app) => (
                                        <TableRow key={app.id} className="hover:bg-white/5 border-white/10 transition-colors cursor-pointer" onClick={() => setSelectedApp(app)}>
                                            <TableCell>
                                                <div className="font-medium">{app.fullName}</div>
                                                <div className="text-xs text-muted-foreground">{app.rollNumber}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">{app.department}</div>
                                                <div className="text-xs text-muted-foreground">Year {app.year}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                                                    {app.primaryDept}
                                                </Badge>
                                                <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">
                                                    {app.domains.join(', ')}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${star <= (app.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className={`capitalize ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }}>
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </HolographicCard>

                {/* Detailed View Modal */}
                <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
                    <DialogContent className="max-w-3xl bg-black/90 border-white/10 text-foreground backdrop-blur-xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold flex justify-between items-center">
                                <span>{selectedApp?.fullName}</span>
                                <Badge variant="outline" className="text-base font-normal">{selectedApp?.rollNumber}</Badge>
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Applied on {selectedApp?.submittedAt ? new Date(selectedApp.submittedAt).toLocaleDateString() : 'Unknown Date'}
                            </DialogDescription>
                        </DialogHeader>

                        {selectedApp && (
                            <div className="space-y-8 mt-4">
                                {/* Rating & Actions Bar */}
                                <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-muted-foreground mr-2">Rating:</span>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => updateApplication(selectedApp.id, { rating: star })}
                                                className={`transition-transform hover:scale-110 focus:outline-none`}
                                            >
                                                <Star
                                                    className={`w-6 h-6 ${star <= (selectedApp.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700 hover:text-yellow-400/50'}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant={selectedApp.status === 'rejected' ? 'destructive' : 'outline'}
                                            onClick={() => updateApplication(selectedApp.id, { status: 'rejected' })}
                                            className={selectedApp.status === 'rejected' ? '' : 'border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500'}
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Reject
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={selectedApp.status === 'neutral' ? 'secondary' : 'outline'}
                                            onClick={() => updateApplication(selectedApp.id, { status: 'neutral' })}
                                            className={selectedApp.status === 'neutral' ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30' : 'border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500'}
                                        >
                                            <MinusCircle className="w-4 h-4 mr-2" />
                                            Neutral
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={selectedApp.status === 'selected' ? 'default' : 'outline'}
                                            onClick={() => updateApplication(selectedApp.id, { status: 'selected' })}
                                            className={selectedApp.status === 'selected'
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'border-green-500/50 text-green-500 hover:bg-green-500/10 hover:border-green-500'
                                            }
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Select
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Personal Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Personal Details</h3>
                                        <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                            <span className="text-muted-foreground">Email:</span>
                                            <span>{selectedApp.email}</span>
                                            <span className="text-muted-foreground">Phone:</span>
                                            <span>{selectedApp.phone}</span>
                                            <span className="text-muted-foreground">Department:</span>
                                            <span>{selectedApp.department}</span>
                                            <span className="text-muted-foreground">Year:</span>
                                            <span>{selectedApp.year}</span>
                                        </div>
                                    </div>

                                    {/* Primary Choice */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Primary Choice</h3>
                                        <div>
                                            <Badge className="bg-primary hover:bg-primary/90 mb-2">{selectedApp.primaryDept}</Badge>
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {selectedApp.domains.map(d => (
                                                    <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                                                ))}
                                            </div>
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Skills</span>
                                                    <p className="text-sm bg-white/5 p-2 rounded-md border border-white/5">{selectedApp.skills}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Reason</span>
                                                    <p className="text-sm bg-white/5 p-2 rounded-md border border-white/5 max-h-[100px] overflow-y-auto">{selectedApp.reason}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Secondary Choice */}
                                    {selectedApp.secondaryDept && (
                                        <div className="space-y-4 md:col-span-2">
                                            <h3 className="text-lg font-semibold text-primary/70 border-b border-primary/20 pb-2">Secondary Choice</h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <Badge variant="secondary" className="mb-2">{selectedApp.secondaryDept}</Badge>
                                                    <div className="flex flex-wrap gap-1 mb-3">
                                                        {selectedApp.secondaryDomains.map(d => (
                                                            <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div>
                                                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Skills</span>
                                                        <p className="text-sm bg-white/5 p-2 rounded-md border border-white/5">{selectedApp.secondarySkills || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Reason</span>
                                                        <p className="text-sm bg-white/5 p-2 rounded-md border border-white/5">{selectedApp.secondaryReason || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Delete Action */}
                                    <div className="pt-4 border-t border-white/10 flex justify-end">
                                        <Button
                                            variant="destructive"
                                            onClick={() => deleteApplication(selectedApp.id)}
                                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Application
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Admin;
