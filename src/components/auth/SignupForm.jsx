import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { HandHeart, Lock, Mail, Shield, CheckCircle, User, Phone } from 'lucide-react';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        // Don't send confirmPassword to backend
        const { confirmPassword, ...signupData } = formData;
        const result = await signup(signupData);

        if (result.success) {
            // Redirect to campaigns after signup
            navigate('/campaigns');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-4">
            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
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

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-100vh); opacity: 0; }
                }
            `}</style>

            {/* Signup Card */}
            <Card className="w-full max-w-md relative z-10 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl">
                <CardHeader className="space-y-4 pb-6">
                    {/* Organization Badge */}
                    <div className="flex justify-center mb-2">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30">
                            <HandHeart className="h-5 w-5 text-emerald-300" />
                            <span className="font-bold text-white text-sm">Pakistan Welfare Trust</span>
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <CardTitle className="text-3xl md:text-4xl font-bold text-white">
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-base">
                            Join Pakistan Welfare and start making a difference
                        </CardDescription>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex gap-3 justify-center pt-2">
                        <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                            <Shield className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-xs text-gray-300">Secured</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-xs text-gray-300">Verified</span>
                        </div>
                    </div>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 pt-2">
                        {error && (
                            <div className="bg-red-500/10 backdrop-blur-sm text-red-300 px-4 py-3 rounded-xl text-sm border border-red-400/30 flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs">!</span>
                                </div>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-200 font-medium">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="pl-11 h-12 backdrop-blur-sm bg-white/5 border-emerald-400/30 focus:border-emerald-400 text-white placeholder:text-gray-400 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-200 font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-11 h-12 backdrop-blur-sm bg-white/5 border-emerald-400/30 focus:border-emerald-400 text-white placeholder:text-gray-400 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-200 font-medium">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="03001234567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    pattern="[0-9]{10,15}"
                                    className="pl-11 h-12 backdrop-blur-sm bg-white/5 border-emerald-400/30 focus:border-emerald-400 text-white placeholder:text-gray-400 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-200 font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="pl-11 h-12 backdrop-blur-sm bg-white/5 border-emerald-400/30 focus:border-emerald-400 text-white placeholder:text-gray-400 rounded-xl"
                                />
                            </div>
                            <p className="text-xs text-gray-400">Must be at least 6 characters</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-200 font-medium">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="pl-11 h-12 backdrop-blur-sm bg-white/5 border-emerald-400/30 focus:border-emerald-400 text-white placeholder:text-gray-400 rounded-xl"
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-2">
                        <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-base font-bold shadow-lg rounded-xl border-0" 
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating account...
                                </span>
                            ) : (
                                'Create Your Account'
                            )}
                        </Button>

                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-transparent text-gray-400">or</span>
                            </div>
                        </div>

                        <p className="text-sm text-center text-gray-300">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-colors"
                            >
                                Login here
                            </Link>
                        </p>

                        <p className="text-xs text-center text-gray-400 pt-2">
                            By signing up, you agree to our secure platform policies
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}