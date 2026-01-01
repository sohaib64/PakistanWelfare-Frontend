import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import MyImage from '../../assets/PWTLogo.png';
import { LayoutDashboard, Target, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 shadow-2xl sticky top-0 z-50 border-b border-emerald-400/30 backdrop-blur-xl">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl group-hover:bg-emerald-400/30 transition-all"></div>

                            <img
                                src={MyImage}
                                alt="Pakistan Welfare Trust"
                                className="h-14 w-14 rounded-full object-cover relative z-10"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                                Pakistan Welfare
                            </span>
                            <span className="text-xs text-gray-400">Lighting Paths, Lifting Lives</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated() ? (
                            <>
                                {isAdmin() ? (
                                    <>
                                        <Link to="/admin/dashboard">
                                            <Button variant="ghost" className="hover:bg-white/10 text-gray-200 hover:text-emerald-400 flex items-center gap-2">
                                                <LayoutDashboard className="h-4 w-4" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Link to="/campaigns">
                                            <Button variant="ghost" className="hover:bg-white/10 text-gray-200 hover:text-emerald-400 flex items-center gap-2">
                                                <Target className="h-4 w-4" />
                                                Campaigns
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/campaigns">
                                            <Button variant="ghost" className="hover:bg-white/10 text-gray-200 hover:text-emerald-400 flex items-center gap-2">
                                                <Target className="h-4 w-4" />
                                                Campaigns
                                            </Button>
                                        </Link>
                                        <Link to={`/user/dashboard/${user?.id}`}>
                                            <Button variant="ghost" className="hover:bg-white/10 text-gray-200 hover:text-emerald-400 flex items-center gap-2">
                                                <LayoutDashboard className="h-4 w-4" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                    </>
                                )}
                                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/20">
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                                        <div className="p-1.5 rounded-full bg-emerald-500/20">
                                            <User className="h-3.5 w-3.5 text-emerald-400" />
                                        </div>
                                        <span className="text-gray-200 text-sm font-medium">{user?.name}</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={handleLogout}
                                        className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/20 backdrop-blur-sm flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" className="hover:bg-white/10 text-gray-200 hover:text-emerald-400">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-emerald-500/50">
                                        Sign Up Free
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 transition-all"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-xl border-b border-emerald-400/30 shadow-2xl">
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            {isAuthenticated() ? (
                                <>
                                    {isAdmin() ? (
                                        <>
                                            <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-200 hover:text-emerald-400 transition-all">
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    Dashboard
                                                </div>
                                            </Link>
                                            <Link to="/campaigns" onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-200 hover:text-emerald-400 transition-all">
                                                    <Target className="h-4 w-4" />
                                                    Campaigns
                                                </div>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/campaigns" onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-200 hover:text-emerald-400 transition-all">
                                                    <Target className="h-4 w-4" />
                                                    Campaigns
                                                </div>
                                            </Link>
                                            <Link to={`/user/dashboard/${user?.id}`} onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-200 hover:text-emerald-400 transition-all">
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    Dashboard
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                    <div className="pt-2 border-t border-white/10">
                                        <div className="flex items-center gap-2 px-4 py-3 mb-2 rounded-lg bg-white/5">
                                            <User className="h-4 w-4 text-emerald-400" />
                                            <span className="text-gray-200 text-sm font-medium">{user?.name}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/20 transition-all"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <div className="w-full px-4 py-3 rounded-lg hover:bg-white/10 text-gray-200 hover:text-emerald-400 transition-all text-center">
                                            Login
                                        </div>
                                    </Link>
                                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <div className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white text-center font-medium shadow-lg">
                                            Sign Up Free
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}