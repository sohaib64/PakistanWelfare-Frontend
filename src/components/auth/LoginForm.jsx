// LoginForm.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
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
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            // Redirect based on role
            if (result.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/campaigns');
            }
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-primary">
            <CardHeader className="bg-primary-light border-b border-border">
                <CardTitle className="text-foreground text-2xl">Welcome Back</CardTitle>
                <CardDescription>Please login to continue to Pakistan Welfare</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-6">
                    {error && (
                        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm border border-destructive/20">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border-primary/30 focus:border-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="border-primary/30 focus:border-primary"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white shadow-md" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}