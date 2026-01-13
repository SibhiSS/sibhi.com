import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Download, Search, Loader2 } from 'lucide-react';
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
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface Application {
    id: string;
    fullName: string;
    email: string;
    rollNumber: string;
    department: string;
    year: string;
    phone: string;
    primaryDept: string;
    domains: string[];
    submittedAt?: any;
    // ... add other fields as needed
}

const Admin = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!authLoading && (!user || user.email !== 'sibhi.s2024@vitstudent.ac.in')) {
            // Redirect or show access denied
            return;
        }

        const fetchApplications = async () => {
            try {
                const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const apps: Application[] = [];

                querySnapshot.forEach((doc) => {
                    apps.push({ id: doc.id, ...doc.data() } as Application);
                });

                setApplications(apps);
            } catch (error) {
                console.error("Error fetching documents: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.email === 'sibhi.s2024@vitstudent.ac.in') {
            fetchApplications();
        }
    }, [user, authLoading]);

    const downloadCSV = () => {
        const headers = ['Full Name', 'Email', 'Roll Number', 'Phone', 'Year', 'Department', 'Primary Choice', 'Domains'];
        const csvContent = [
            headers.join(','),
            ...applications.map(app => [
                app.fullName,
                app.email,
                app.rollNumber,
                app.phone,
                app.year,
                app.department,
                app.primaryDept,
                `"${app.domains.join(', ')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'nova_applications.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const generateSampleData = async () => {
        setIsLoading(true);
        const samples = [
            {
                fullName: "Alice Johnson",
                email: "alice.johnson2024@vitstudent.ac.in",
                rollNumber: "21BCE1234",
                department: "CSE (Core)",
                year: "3",
                phone: "9876543210",
                primaryDept: "Technical",
                domains: ["IoT & Embedded Systems", "Robotics & Automation"],
                createdAt: serverTimestamp(),
                status: 'pending'
            },
            {
                fullName: "Bob Smith",
                email: "bob.smith2024@vitstudent.ac.in",
                rollNumber: "22BIT5678",
                department: "IT",
                year: "2",
                phone: "8765432109",
                primaryDept: "Design & Content",
                domains: ["Graphic Design", "UI/UX Design"],
                createdAt: serverTimestamp(),
                status: 'pending'
            },
            {
                fullName: "Charlie Brown",
                email: "charlie.brown2024@vitstudent.ac.in",
                rollNumber: "23BME9012",
                department: "Mechanical",
                year: "1",
                phone: "7654321098",
                primaryDept: "Management",
                domains: ["Event Management", "Logistics"],
                createdAt: serverTimestamp(),
                status: 'pending'
            }
        ];

        try {
            const promises = samples.map(data => addDoc(collection(db, 'applications'), data));
            await Promise.all(promises);
            // Refresh
            const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const apps: Application[] = [];
            querySnapshot.forEach((doc) => {
                apps.push({ id: doc.id, ...doc.data() } as Application);
            });
            setApplications(apps);
            alert("Sample data added!");
        } catch (error) {
            console.error("Error adding sample data: ", error);
            alert("Failed to add sample data. Check console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    if (!user || user.email !== 'sibhi.s2024@vitstudent.ac.in') {
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

    return (
        <div className="min-h-screen bg-black text-foreground p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
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
                        <Button onClick={generateSampleData} variant="outline" className="border-white/10 hover:bg-white/5">
                            Generate Sample Data
                        </Button>
                        <Button onClick={downloadCSV} className="bg-primary hover:bg-primary/90">
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                <HolographicCard className="p-0 overflow-hidden">
                    <div className="max-h-[70vh] overflow-auto">
                        <Table>
                            <TableHeader className="bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                                <TableRow className="hover:bg-white/5 border-white/10">
                                    <TableHead className="text-primary">Name</TableHead>
                                    <TableHead className="text-primary">Roll No.</TableHead>
                                    <TableHead className="text-primary">Dept</TableHead>
                                    <TableHead className="text-primary">Choice 1</TableHead>
                                    <TableHead className="text-primary w-[300px]">Domains</TableHead>
                                    <TableHead className="text-primary">Contact</TableHead>
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
                                        <TableRow key={app.id} className="hover:bg-white/5 border-white/10 transition-colors">
                                            <TableCell className="font-medium">{app.fullName}</TableCell>
                                            <TableCell className="font-mono text-xs">{app.rollNumber}</TableCell>
                                            <TableCell>{app.department} <span className="text-xs text-muted-foreground">({app.year} Yr)</span></TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                                    {app.primaryDept}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {app.domains.join(', ')}
                                            </TableCell>
                                            <TableCell className="text-xs">
                                                <div className="flex flex-col gap-1">
                                                    <span>{app.email}</span>
                                                    <span className="text-muted-foreground">{app.phone}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </HolographicCard>
            </div>
        </div>
    );
};

export default Admin;
