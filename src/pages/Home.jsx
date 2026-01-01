import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CreditCard, Target, FileText, Rocket, HandHeart, User, Receipt, Coins, Award, TrendingUp, CheckCircle, Users, Building2, Heart, Calendar, Shield, Clock, DollarSign, BarChart3, Wallet, BookOpen } from 'lucide-react';

export default function Home() {
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
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.6s ease-out forwards;
                }
            `}</style>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Hero Section - Enhanced */}
                <div className="mb-20 animate-slide-in">
                    <div className="flex flex-col items-center text-center space-y-8">
                        {/* Organization Badge */}
                        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-emerald-400/30 shadow-lg">
                            <HandHeart className="h-6 w-6 text-emerald-300" />
                            <span className="font-bold text-white text-lg">Pakistan Welfare Trust</span>
                        </div>

                        {/* Main Hero Text */}
                        <div className="space-y-4 max-w-5xl">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                                Donate with
                            </h1>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent">
                                Confidence & Transparency
                            </h2>
                        </div>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl leading-relaxed">
                            Modern donation platform combining Islamic values with cutting-edge technology. 
                            Track your Zakat, support vital campaigns, and receive instant receipts—all secured and verified.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex gap-6 flex-wrap justify-center text-gray-300 pt-2">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <Shield className="h-5 w-5 text-emerald-400" />
                                <span className="font-medium">SSL Secured</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <Users className="h-5 w-5 text-green-400" />
                                <span className="font-medium">15,000+ Donors</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <CheckCircle className="h-5 w-5 text-blue-400" />
                                <span className="font-medium">Verified Platform</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-5 pt-4 flex-wrap justify-center">
                            <Link to="/signup">
                                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-12 py-8 text-xl shadow-2xl flex items-center gap-3 border-0 rounded-2xl font-bold">
                                    <Rocket className="h-6 w-6" />
                                    Start Your Journey
                                </Button>
                            </Link>
                            <Link to="/campaigns">
                                <Button size="lg" className="backdrop-blur-xl bg-white/10 border-2 border-emerald-400/40 text-white hover:bg-white/20 px-12 py-8 text-xl flex items-center gap-3 rounded-2xl font-bold">
                                    <Target className="h-6 w-6" />
                                    Browse Campaigns
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Key Features - Large Cards */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                    {/* Zakat & Donation Management */}
                    <Card className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-400/30 shadow-2xl hover:scale-[1.02] transition-all">
                        <CardHeader className="pb-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-20 h-20 bg-emerald-500/30 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                    <Wallet className="h-10 w-10 text-emerald-300" />
                                </div>
                                <div className="bg-emerald-500/20 rounded-full px-4 py-1.5">
                                    <span className="text-xs font-bold text-emerald-300">CORE FEATURE</span>
                                </div>
                            </div>
                            <CardTitle className="text-3xl text-white mb-3">Complete Zakat & Donation Management</CardTitle>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Manage all your charitable giving in one place. Calculate Zakat accurately, track donations by category (Sadaqah, Fitrana, General), and maintain complete digital records.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-emerald-400/20">
                                    <BookOpen className="h-6 w-6 text-emerald-300 mb-2" />
                                    <p className="text-sm font-semibold text-white">Zakat Calculator</p>
                                    <p className="text-xs text-gray-400">Islamic compliance</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-emerald-400/20">
                                    <BarChart3 className="h-6 w-6 text-green-300 mb-2" />
                                    <p className="text-sm font-semibold text-white">Category Tracking</p>
                                    <p className="text-xs text-gray-400">Organized records</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-emerald-400/20">
                                    <FileText className="h-6 w-6 text-blue-300 mb-2" />
                                    <p className="text-sm font-semibold text-white">Digital Receipts</p>
                                    <p className="text-xs text-gray-400">Instant PDF</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-emerald-400/20">
                                    <TrendingUp className="h-6 w-6 text-purple-300 mb-2" />
                                    <p className="text-sm font-semibold text-white">History & Stats</p>
                                    <p className="text-xs text-gray-400">Full analytics</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Campaign Support */}
                    <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-400/30 shadow-2xl hover:scale-[1.02] transition-all">
                        <CardHeader className="pb-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-20 h-20 bg-green-500/30 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                    <Target className="h-10 w-10 text-green-300" />
                                </div>
                                <div className="bg-green-500/20 rounded-full px-4 py-1.5">
                                    <span className="text-xs font-bold text-green-300">IMPACTFUL</span>
                                </div>
                            </div>
                            <CardTitle className="text-3xl text-white mb-3">Targeted Campaign Support</CardTitle>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Support specific causes that matter to you. From Ramadan relief to education initiatives, track real-time progress and see your impact with transparent goal monitoring.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-green-400/20">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-300">Active Campaigns</span>
                                        <span className="text-lg font-bold text-green-400">50+</span>
                                    </div>
                                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: '78%' }}></div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Average completion: 78%</p>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-white/5 rounded-lg p-3 text-center border border-green-400/20">
                                        <Heart className="h-5 w-5 text-green-300 mx-auto mb-1" />
                                        <p className="text-xs text-gray-300">Ramadan</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 text-center border border-green-400/20">
                                        <Users className="h-5 w-5 text-green-300 mx-auto mb-1" />
                                        <p className="text-xs text-gray-300">Education</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 text-center border border-green-400/20">
                                        <Building2 className="h-5 w-5 text-green-300 mx-auto mb-1" />
                                        <p className="text-xs text-gray-300">Relief</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment & Security Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-20 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/30 shadow-2xl hover:scale-105 transition-all">
                        <CardHeader>
                            <div className="w-16 h-16 bg-blue-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md mb-4">
                                <CreditCard className="h-8 w-8 text-blue-300" />
                            </div>
                            <CardTitle className="text-xl text-white mb-2">Multiple Payment Methods</CardTitle>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Cash deposits, bank transfers, or secure online payments via Stripe. Choose what works best for you.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <div className="bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-300 border border-blue-400/20">Cash</div>
                                <div className="bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-300 border border-blue-400/20">Bank</div>
                                <div className="bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-300 border border-blue-400/20">Online</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-400/30 shadow-2xl hover:scale-105 transition-all">
                        <CardHeader>
                            <div className="w-16 h-16 bg-purple-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md mb-4">
                                <FileText className="h-8 w-8 text-purple-300" />
                            </div>
                            <CardTitle className="text-xl text-white mb-2">Automated Receipt System</CardTitle>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Get instant PDF receipts with complete transaction details for tax purposes and personal records.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <CheckCircle className="h-4 w-4 text-purple-300" />
                                <span>Downloadable & Shareable</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="backdrop-blur-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/10 border border-orange-400/30 shadow-2xl hover:scale-105 transition-all">
                        <CardHeader>
                            <div className="w-16 h-16 bg-orange-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md mb-4">
                                <Award className="h-8 w-8 text-orange-300" />
                            </div>
                            <CardTitle className="text-xl text-white mb-2">Personal Impact Dashboard</CardTitle>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Track your giving journey with detailed statistics, history, and contribution analytics.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <TrendingUp className="h-4 w-4 text-orange-300" />
                                <span>Real-time Analytics</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* How It Works - Process Flow */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 md:p-14 mb-20 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-5">
                            <Clock className="h-5 w-5 text-emerald-300" />
                            <span className="text-sm font-bold text-emerald-300">SIMPLE 4-STEP PROCESS</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Start Making an Impact Today
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            From account creation to receipt generation—everything happens seamlessly in minutes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { 
                                num: '01', 
                                title: 'Create Account', 
                                desc: 'Quick signup with email verification and secure login', 
                                Icon: User, 
                                gradient: 'from-emerald-500 to-green-500',
                                iconColor: 'text-emerald-300'
                            },
                            { 
                                num: '02', 
                                title: 'Select Campaign', 
                                desc: 'Browse causes and choose what matters to you most', 
                                Icon: Target, 
                                gradient: 'from-green-500 to-teal-500',
                                iconColor: 'text-green-300'
                            },
                            { 
                                num: '03', 
                                title: 'Make Donation', 
                                desc: 'Choose amount, category, and preferred payment method', 
                                Icon: DollarSign, 
                                gradient: 'from-teal-500 to-cyan-500',
                                iconColor: 'text-teal-300'
                            },
                            { 
                                num: '04', 
                                title: 'Get Receipt', 
                                desc: 'Instant PDF receipt sent to your email and dashboard', 
                                Icon: Receipt, 
                                gradient: 'from-cyan-500 to-blue-500',
                                iconColor: 'text-cyan-300'
                            }
                        ].map((step, index) => (
                            <div key={step.num} className="relative group">
                                {/* Connection Arrow */}
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5">
                                        <div className="w-full h-full bg-gradient-to-r from-white/30 to-transparent"></div>
                                    </div>
                                )}
                                
                                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                                            {step.num}
                                        </div>
                                        <step.Icon className={`h-8 w-8 ${step.iconColor}`} />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2 text-white">{step.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistics Banner */}
                <div className="grid md:grid-cols-4 gap-6 mb-20 animate-slide-in" style={{ animationDelay: '0.4s' }}>
                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
                        <Users className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                        <h3 className="text-5xl font-bold text-white mb-2">15K+</h3>
                        <p className="text-gray-300 font-medium">Active Donors</p>
                    </div>
                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
                        <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
                        <h3 className="text-5xl font-bold text-white mb-2">50+</h3>
                        <p className="text-gray-300 font-medium">Active Campaigns</p>
                    </div>
                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
                        <DollarSign className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                        <h3 className="text-5xl font-bold text-white mb-2">75M+</h3>
                        <p className="text-gray-300 font-medium">PKR Donated</p>
                    </div>
                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
                        <Heart className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                        <h3 className="text-5xl font-bold text-white mb-2">100K+</h3>
                        <p className="text-gray-300 font-medium">Lives Impacted</p>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center backdrop-blur-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-3xl p-12 md:p-16 shadow-2xl animate-slide-in" style={{ animationDelay: '0.5s' }}>
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/30 mb-6 shadow-lg">
                        <HandHeart className="w-12 h-12 text-emerald-300" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white">
                        Join Pakistan's Most Trusted Donation Platform
                    </h2>
                    <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Every contribution matters. Start your journey of giving with transparency, security, and Islamic values at the core.
                    </p>
                    <div className="flex gap-5 justify-center flex-wrap">
                        <Link to="/signup">
                            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-14 py-8 text-xl shadow-2xl flex items-center gap-3 border-0 rounded-2xl font-bold">
                                <Rocket className="h-7 w-7" />
                                Get Started Now
                            </Button>
                        </Link>
                        <Link to="/campaigns">
                            <Button size="lg" className="backdrop-blur-xl bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-14 py-8 text-xl flex items-center gap-3 rounded-2xl font-bold">
                                <Calendar className="h-7 w-7" />
                                Explore Campaigns
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}