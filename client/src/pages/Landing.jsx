import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Zap, Leaf, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Landing() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-green-100 selection:text-green-900">
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                            <Zap className="h-5 w-5 fill-current" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">
                            EcoCore <span className="text-green-600">Energy</span>
                        </h1>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link to="/login">
                            <Button className="bg-green-600 text-white hover:bg-green-700 font-semibold shadow-sm">
                                Client Portal
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 lg:py-32">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-100/50 via-transparent to-transparent"></div>
                    <div className="container mx-auto px-6 text-center">
                        <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-800 mb-8">
                            <Leaf className="mr-2 h-4 w-4" />
                            Sustainable Energy Solutions
                        </div>
                        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl mb-6">
                            Powering the Future with <br />
                            <span className="text-green-600">Clean Energy.</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-10">
                            EcoCore provides reliable, renewable energy infrastructure for modern enterprises.
                            Manage your consumption, view invoices, and track sustainability goals from our secure dashboard.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/login">
                                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-lg px-8 h-12">
                                    Access Dashboard
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="#">
                                <Button size="lg" variant="outline" className="text-lg px-8 h-12 border-slate-300 hover:bg-slate-50">
                                    View Rate Plans
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
                                    <Zap className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold">Reliable Grid</h3>
                                <p className="text-slate-600 leading-relaxed">99.99% uptime guarantee with our redundant smart-grid infrastructure designed for enterprise needs.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
                                    <Leaf className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold">100% Renewable</h3>
                                <p className="text-slate-600 leading-relaxed"> sourced primarily from wind, solar, and hydro. Reduce your carbon footprint instantly.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
                                    <ShieldCheck className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold">Secure Management</h3>
                                <p className="text-slate-600 leading-relaxed">Enterprise-grade document portal to manage contracts, compliance reports, and billing securely.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-8 bg-white border-t border-slate-200 text-center text-slate-500 text-sm">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} EcoCore Energy Solutions. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
