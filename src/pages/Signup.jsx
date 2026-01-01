// Signup.jsx
import SignupForm from '../components/auth/SignupForm';
import { HeartHandshake } from 'lucide-react';

export default function Signup() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">

            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-green-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                ></div>
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
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left content */}
                    <div className="text-white space-y-6 animate-slide-in hidden lg:block">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <HeartHandshake className="w-4 h-4 text-emerald-300" />
                            <span className="text-sm font-medium">
                                Pakistan Welfare Trust
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold leading-tight">
                            Serve Humanity with
                            <span className="block bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                Pakistan Welfare
                            </span>
                        </h1>

                        <p className="text-gray-300 text-lg">
                            Join thousands of volunteers and donors working together
                            to support education, food, and healthcare initiatives.
                        </p>

                        <div className="space-y-3 pt-4 text-gray-200">
                            <div className="flex items-center gap-3">🍛 Food & Ration Programs</div>
                            <div className="flex items-center gap-3">📚 Education & Skills Training</div>
                            <div className="flex items-center gap-3">🏥 Healthcare & Relief Work</div>
                        </div>
                    </div>

                    {/* Right side – your existing form */}
                    <div className="animate-slide-in">
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                            <SignupForm />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
