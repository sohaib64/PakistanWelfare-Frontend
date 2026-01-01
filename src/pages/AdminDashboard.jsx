// AdminDashboard.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Plus, Download, Search, CheckCircle, Clock, TrendingUp, DollarSign, Users, Target, Shield, X, Calendar, Filter, AlertCircle, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ status: '', search: '' });

    // Campaign creation state
    const [showCampaignForm, setShowCampaignForm] = useState(false);
    const [campaignData, setCampaignData] = useState({
        name: '',
        description: '',
        goalAmount: '',
        deadline: ''
    });

    useEffect(() => {
        fetchDashboard();
        fetchDonations();
    }, []);

    const downloadReceipt = async (receiptId) => {
        try {
            const token = localStorage.getItem('token');
            window.open(`http://localhost:5000/api/receipts/download/${receiptId}?token=${token}`, '_blank');
        } catch (error) {
            console.error('Error downloading receipt:', error);
        }
    };

    const fetchDashboard = async () => {
        try {
            const response = await api.get('/dashboard/admin');
            setDashboard(response.data.data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDonations = async () => {
        try {
            const queryParams = new URLSearchParams(filter);
            const response = await api.get(`/donations?${queryParams}`);
            setDonations(response.data.data.donations);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };

    const updateDonationStatus = async (donationId, newStatus) => {
        try {
            await api.patch(`/donations/${donationId}/status`, { status: newStatus });
            fetchDonations();
            fetchDashboard();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const createCampaign = async (e) => {
        e.preventDefault();
        try {
            await api.post('/campaigns', campaignData);
            setShowCampaignForm(false);
            setCampaignData({ name: '', description: '', goalAmount: '', deadline: '' });
            fetchDashboard();
        } catch (error) {
            console.error('Error creating campaign:', error);
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

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header with Overview Card */}
                <div className="mb-8 animate-slide-in">
                    <div className="backdrop-blur-xl bg-gradient-to-r from-white/15 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            {/* Left side - Title and Badge */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-3">
                                    <Shield className="w-4 h-4 text-emerald-300" />
                                    <span className="text-sm font-medium text-white">Admin Control Panel</span>
                                </div>
                                <h1 className="text-5xl font-bold text-white leading-tight mb-2">
                                    Dashboard Overview
                                </h1>
                                <p className="text-gray-300">Manage donations, campaigns, and monitor platform activity</p>
                            </div>

                            {/* Right side - Quick Actions */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    onClick={() => setShowCampaignForm(true)}
                                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2 px-6 py-6 text-base"
                                >
                                    <Plus className="h-5 w-5" />
                                    Create Campaign
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Grid - Prominent Display */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {[
                        { title: 'Total Donations', value: dashboard?.statistics.totalDonations, icon: BarChart3, gradient: 'from-emerald-500/30 to-green-500/10', iconColor: 'text-emerald-400' },
                        { title: 'Total Amount', value: `Rs. ${dashboard?.statistics.totalAmount.toLocaleString()}`, icon: DollarSign, gradient: 'from-green-500/30 to-emerald-500/10', iconColor: 'text-green-400' },
                        { title: 'Total Donors', value: dashboard?.statistics.totalDonors, icon: Users, gradient: 'from-emerald-500/30 to-green-500/10', iconColor: 'text-emerald-400' },
                        { title: 'Pending', value: dashboard?.statistics.pendingDonations, icon: Clock, gradient: 'from-yellow-500/30 to-orange-500/10', iconColor: 'text-yellow-400' },
                        { title: 'Verified', value: dashboard?.statistics.verifiedDonations, icon: CheckCircle, gradient: 'from-emerald-500/30 to-green-500/10', iconColor: 'text-emerald-400' },
                        { title: 'Active Campaigns', value: dashboard?.statistics.activeCampaigns, icon: Target, gradient: 'from-green-500/30 to-emerald-500/10', iconColor: 'text-green-400' }
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card
                                key={index}
                                className={`backdrop-blur-xl bg-gradient-to-br ${stat.gradient} border border-white/20 shadow-2xl hover:scale-105 transition-all animate-slide-in group`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform`}>
                                            <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                                        </div>
                                    </div>
                                    <CardTitle className={`text-4xl font-bold ${stat.iconColor}`}>
                                        {stat.value}
                                    </CardTitle>
                                    <CardDescription className="text-gray-300 text-sm font-medium">{stat.title}</CardDescription>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>

                {/* Full Width Donations Management */}
                <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl mb-8 animate-slide-in" style={{ animationDelay: '0.7s' }}>
                    <CardHeader className="border-b border-white/10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-emerald-500/20 backdrop-blur-sm">
                                    <DollarSign className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-2xl">All Donations</CardTitle>
                                    <CardDescription className="text-gray-300">Manage and verify all donation records</CardDescription>
                                </div>
                            </div>
                        </div>

                        {/* Filters in Header */}
                        <div className="flex gap-3 mt-6 flex-wrap bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <Select
                                value={filter.status}
                                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                className="bg-white/5 border-white/20 text-white focus:border-emerald-400 min-w-[150px] h-11 [&>option]:bg-gray-500"
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Verified">Verified</option>
                            </Select>
                            <Input
                                placeholder="Search by donor name..."
                                value={filter.search}
                                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-300 focus:border-emerald-400 flex-1 min-w-[200px] h-11"
                            />

                            <Button
                                onClick={fetchDonations}
                                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2 h-11"
                            >
                                <Filter className="h-4 w-4" />
                                Apply Filters
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        {/* Donations Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-gray-200 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-emerald-400" />
                                                Date
                                            </div>
                                        </th>
                                        <th className="text-left p-4 font-semibold text-gray-200 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-emerald-400" />
                                                Donor
                                            </div>
                                        </th>
                                        <th className="text-left p-4 font-semibold text-gray-200 text-sm">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-emerald-400" />
                                                Amount
                                            </div>
                                        </th>
                                        <th className="text-left p-4 font-semibold text-gray-200 text-sm">Type</th>
                                        <th className="text-left p-4 font-semibold text-gray-200 text-sm">Payment</th>
                                        <th className="text-left p-4 font-semibold text-gray-200 text-sm">Status</th>
                                        <th className="text-left p-4 font-semibold text-gray-200 text-sm">Action</th>
                                        <th className="text-left p-4 font-semibold text-gray-200 text-sm">Receipt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center p-12">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="p-4 rounded-full bg-white/5">
                                                        <AlertCircle className="w-12 h-12 text-gray-500" />
                                                    </div>
                                                    <p className="text-gray-300 text-lg">No donations found</p>
                                                    <p className="text-gray-500 text-sm">Try adjusting your filters</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        donations.map((donation, index) => (
                                            <tr
                                                key={donation._id}
                                                className="border-b border-white/10 hover:bg-white/5 transition-colors"
                                                style={{
                                                    animation: 'slideIn 0.3s ease-out forwards',
                                                    animationDelay: `${index * 0.05}s`,
                                                    opacity: 0
                                                }}
                                            >
                                                <td className="p-4 text-gray-200 text-sm">
                                                    {new Date(donation.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="p-4">
                                                    <div>
                                                        <p className="font-semibold text-white text-sm">{donation.userId?.name}</p>
                                                        <p className="text-xs text-gray-400">{donation.userId?.email}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4 font-bold text-emerald-400 text-base">
                                                    Rs. {donation.amount.toLocaleString()}
                                                </td>
                                                <td className="p-4 text-gray-200 text-sm">{donation.type}</td>
                                                <td className="p-4 text-gray-200 text-sm">{donation.paymentMethod}</td>
                                                <td className="p-4">
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
                                                <td className="p-4">
                                                    {donation.status === 'Pending' && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => updateDonationStatus(donation._id, 'Verified')}
                                                            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white flex items-center gap-1 text-xs font-semibold"
                                                        >
                                                            <CheckCircle className="h-3 w-3" />
                                                            Verify
                                                        </Button>
                                                    )}
                                                </td>
                                                <td className="p-4">
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

                {/* Active Campaigns Grid - Bottom Section */}
                <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-slide-in" style={{ animationDelay: '0.8s' }}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-emerald-500/20 backdrop-blur-sm">
                                <Target className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <CardTitle className="text-white text-2xl">Active Campaigns</CardTitle>
                                <CardDescription className="text-gray-300">Current fundraising initiatives</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {dashboard?.campaigns.map((campaign, index) => {
                                const progress = (campaign.currentAmount / campaign.goalAmount) * 100;
                                return (
                                    <div
                                        key={campaign._id}
                                        className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:scale-105 transition-all group"
                                        style={{
                                            animation: 'slideIn 0.4s ease-out forwards',
                                            animationDelay: `${0.9 + index * 0.1}s`,
                                            opacity: 0
                                        }}
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">{campaign.name}</h3>
                                                <p className="text-sm text-gray-300 line-clamp-2">{campaign.description}</p>
                                            </div>
                                            <div className="ml-3 bg-emerald-500/20 rounded-full px-3 py-1 border border-emerald-400/30">
                                                <span className="text-sm text-emerald-300 font-bold">
                                                    {Math.round(progress)}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                                                <p className="text-[10px] text-gray-400 uppercase mb-1">Raised</p>
                                                <p className="text-sm font-bold text-emerald-400">Rs. {campaign.currentAmount.toLocaleString()}</p>
                                            </div>
                                            <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                                                <p className="text-[10px] text-gray-400 uppercase mb-1">Goal</p>
                                                <p className="text-sm font-bold text-emerald-400">Rs. {campaign.goalAmount.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                                            <div
                                                className="h-2.5 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-emerald-500/50"
                                                style={{ width: `${Math.min(progress, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Campaign Creation Modal */}
                {showCampaignForm && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-slide-in">
                        <Card className="w-full max-w-lg backdrop-blur-xl bg-slate-900/95 border border-emerald-400/30 shadow-2xl rounded-3xl">
                            <CardHeader className="relative border-b border-white/10 pb-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-white text-2xl mb-2 flex items-center gap-2">
                                            <Plus className="w-6 h-6 text-emerald-400" />
                                            Create New Campaign
                                        </CardTitle>
                                        <CardDescription className="text-gray-300">Launch a new fundraising initiative</CardDescription>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowCampaignForm(false)}
                                        className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </CardHeader>
                            <form onSubmit={createCampaign}>
                                <CardContent className="space-y-5 p-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-white flex items-center gap-2">
                                            <Target className="w-4 h-4 text-emerald-400" />
                                            Campaign Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={campaignData.name}
                                            onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                                            required
                                            className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 transition-all"
                                            placeholder="Enter campaign name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-white">Description</Label>
                                        <Input
                                            id="description"
                                            value={campaignData.description}
                                            onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                                            required
                                            className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 transition-all"
                                            placeholder="Describe the campaign purpose"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="goalAmount" className="text-white flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-emerald-400" />
                                            Goal Amount (Rs.)
                                        </Label>
                                        <Input
                                            id="goalAmount"
                                            type="number"
                                            value={campaignData.goalAmount}
                                            onChange={(e) => setCampaignData({ ...campaignData, goalAmount: e.target.value })}
                                            required
                                            className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 transition-all"
                                            placeholder="Enter target amount"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="deadline" className="text-white flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-emerald-400" />
                                            Deadline
                                        </Label>
                                        <Input
                                            id="deadline"
                                            type="date"
                                            value={campaignData.deadline}
                                            onChange={(e) => setCampaignData({ ...campaignData, deadline: e.target.value })}
                                            required
                                            className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 transition-all"
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            type="submit"
                                            className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all"
                                        >
                                            <Plus className="w-5 h-5 mr-2" />
                                            Create Campaign
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowCampaignForm(false)}
                                            className="border-white/50 text-black hover:bg-white/50 h-12"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </CardContent>
                            </form>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}