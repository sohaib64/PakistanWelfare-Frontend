import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Download, TrendingUp, DollarSign, CheckCircle, Clock, HeartHandshake, Award, Calendar, FileText } from 'lucide-react';

export default function UserDashboard() {
    const { userId } = useParams();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, [userId]);

    const fetchDashboard = async () => {
        try {
            const response = await api.get(`/dashboard/user/${userId}`);
            setDashboard(response.data.data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadReceipt = async (receiptId) => {
        try {
            const token = localStorage.getItem('token');
            window.open(`http://localhost:5000/api/receipts/download/${receiptId}?token=${token}`, '_blank');
        } catch (error) {
            console.error('Error downloading receipt:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="relative z-10 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
                    <p className="mt-4 text-gray-300">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-100vh); opacity: 0; }
                }
                @keyframes slideIn {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.6s ease-out forwards;
                }
            `}</style>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-12 animate-slide-in">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                                <HeartHandshake className="w-4 h-4 text-emerald-300" />
                                <span className="text-sm font-medium text-white">
                                    Pakistan Welfare Trust
                                </span>
                            </div>
                            <h1 className="text-5xl font-bold text-white leading-tight mb-2">
                                My Dashboard
                            </h1>
                            <p className="text-gray-300">Track your contributions and make a difference</p>
                        </div>
                        
                        {/* Quick Stats Badge */}
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <Award className="w-10 h-10 text-emerald-400" />
                                <div>
                                    <p className="text-gray-300 text-sm">Total Impact</p>
                                    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                        Rs. {dashboard?.statistics.totalAmount.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Statistics */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Statistics Cards Grid */}
                        <div className="grid md:grid-cols-3 gap-4 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                            <Card className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-400/30 shadow-2xl hover:scale-105 transition-all">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <TrendingUp className="h-8 w-8 text-emerald-400" />
                                        <div className="bg-emerald-500/20 rounded-full p-2">
                                            <span className="text-emerald-300 text-xs font-bold">TOTAL</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-5xl bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                        {dashboard?.statistics.totalDonations}
                                    </CardTitle>
                                    <CardDescription className="text-gray-300 font-medium">Donations Made</CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-400/30 shadow-2xl hover:scale-105 transition-all">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <CheckCircle className="h-8 w-8 text-green-400" />
                                        <div className="bg-green-500/20 rounded-full p-2">
                                            <span className="text-green-300 text-xs font-bold">VERIFIED</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-5xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                        {dashboard?.statistics.verifiedDonations}
                                    </CardTitle>
                                    <CardDescription className="text-gray-300 font-medium">Verified</CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-400/30 shadow-2xl hover:scale-105 transition-all">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <Clock className="h-8 w-8 text-yellow-400" />
                                        <div className="bg-yellow-500/20 rounded-full p-2">
                                            <span className="text-yellow-300 text-xs font-bold">PENDING</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-5xl text-yellow-400">
                                        {dashboard?.statistics.pendingDonations}
                                    </CardTitle>
                                    <CardDescription className="text-gray-300 font-medium">In Review</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Donation History Table */}
                        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-slide-in" style={{ animationDelay: '0.3s' }}>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-emerald-400" />
                                    <CardTitle className="text-white">Donation History</CardTitle>
                                </div>
                                <CardDescription className="text-gray-300">Complete record of your contributions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-emerald-400/30">
                                                <th className="text-left p-3 font-semibold text-gray-200 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        Date
                                                    </div>
                                                </th>
                                                <th className="text-left p-3 font-semibold text-gray-200 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="w-4 h-4" />
                                                        Amount
                                                    </div>
                                                </th>
                                                <th className="text-left p-3 font-semibold text-gray-200 text-sm">Type</th>
                                                <th className="text-left p-3 font-semibold text-gray-200 text-sm">Category</th>
                                                <th className="text-left p-3 font-semibold text-gray-200 text-sm">Campaign</th>
                                                <th className="text-left p-3 font-semibold text-gray-200 text-sm">Status</th>
                                                <th className="text-left p-3 font-semibold text-gray-200 text-sm">Receipt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dashboard?.donations.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center p-8 text-gray-300">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <FileText className="w-12 h-12 text-gray-500" />
                                                            <p>No donations yet</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                dashboard?.donations.map((donation, index) => (
                                                    <tr 
                                                        key={donation._id} 
                                                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                                                        style={{ 
                                                            animation: 'slideIn 0.3s ease-out forwards',
                                                            animationDelay: `${index * 0.05}s`,
                                                            opacity: 0
                                                        }}
                                                    >
                                                        <td className="p-3 text-gray-200 text-sm">
                                                            {new Date(donation.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="p-3 font-bold text-emerald-400">
                                                            Rs. {donation.amount.toLocaleString()}
                                                        </td>
                                                        <td className="p-3 text-gray-200 text-sm">{donation.type}</td>
                                                        <td className="p-3 text-gray-200 text-sm">{donation.category}</td>
                                                        <td className="p-3 text-gray-200 text-sm">
                                                            {donation.campaignId?.name || 'General'}
                                                        </td>
                                                        <td className="p-3">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${donation.status === 'Verified'
                                                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                                                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                                                                }`}>
                                                                {donation.status === 'Verified' ? (
                                                                    <CheckCircle className="h-3 w-3" />
                                                                ) : (
                                                                    <Clock className="h-3 w-3" />
                                                                )}
                                                                {donation.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-3">
                                                            {donation.receiptId && (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => downloadReceipt(donation.receiptId._id)}
                                                                    className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 flex items-center gap-1 backdrop-blur-sm text-xs"
                                                                >
                                                                    <Download className="h-3 w-3" />
                                                                    Download
                                                                </Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Donations by Type */}
                    <div className="space-y-6">
                        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-slide-in" style={{ animationDelay: '0.2s' }}>
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                    Donations by Type
                                </CardTitle>
                                <CardDescription className="text-gray-300">Breakdown of your contributions</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {Object.entries(dashboard?.statistics.donationsByType || {}).map(([type, amount], index) => (
                                    <div 
                                        key={type} 
                                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20 hover:bg-white/10 hover:scale-105 transition-all"
                                        style={{ 
                                            animation: 'slideIn 0.4s ease-out forwards',
                                            animationDelay: `${0.2 + index * 0.1}s`,
                                            opacity: 0
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm text-gray-300 font-semibold">{type}</p>
                                            <div className="bg-emerald-500/20 rounded-full px-3 py-1">
                                                <span className="text-xs text-emerald-300 font-bold">PKR</span>
                                            </div>
                                        </div>
                                        <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                            {amount.toLocaleString()}
                                        </p>
                                        
                                        {/* Progress indicator */}
                                        <div className="mt-3 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${(amount / dashboard?.statistics.totalAmount) * 100}%` 
                                                }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {((amount / dashboard?.statistics.totalAmount) * 100).toFixed(1)}% of total
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Additional Info Card */}
                        <Card className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl animate-slide-in" style={{ animationDelay: '0.4s' }}>
                            <CardContent className="p-6">
                                <div className="text-center space-y-3">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-2">
                                        <HeartHandshake className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Keep Making a Difference!</h3>
                                    <p className="text-sm text-gray-300">
                                        Your contributions are helping those in need. Thank you for your generosity.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}