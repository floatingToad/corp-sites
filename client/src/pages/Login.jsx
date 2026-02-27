import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useNavigate, Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // ... (handleLogin logic remains)
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');

            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-6">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-green-600/20 group-hover:scale-105 transition-transform">
                    <Zap className="h-6 w-6 fill-current" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-green-700 transition-colors">
                    EcoCore <span className="text-green-600">Energy</span>
                </h1>
            </Link>

            <Card className="w-[350px] shadow-xl border-slate-200">
                <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access the portal.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="e.g. admin"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="ghost" type="button" onClick={() => navigate('/')}>Cancel</Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Login</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
