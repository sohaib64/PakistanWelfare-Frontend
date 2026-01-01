// Campaigns.jsx
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import api from '../api/axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { useAuth } from '../context/AuthContext';
import { X as CloseIcon } from 'lucide-react';
import {
  Heart,
  DollarSign,
  Lock,
  Info,
  Target,
  Clock,
  TrendingUp,
  X,
  Sparkles,
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Award
} from 'lucide-react';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here'
);

export default function Campaigns() {
  const { user } = useAuth();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [donationData, setDonationData] = useState({
    amount: '',
    type: 'General',
    category: 'Food',
    paymentMethod: 'Cash'
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await api.get('/campaigns/active');
      setCampaigns(res.data.data.campaigns);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonationForm(true);
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const payload = {
        amount: Number(donationData.amount),
        type: donationData.type,
        category: donationData.category,
        paymentMethod: donationData.paymentMethod,
        campaignId: selectedCampaign?._id
      };

      if (donationData.paymentMethod === 'Online' || donationData.paymentMethod === 'Bank') {
        const res = await api.post('/payment/create-checkout-session', payload);
        if (res.data?.data?.url) {
          window.location.href = res.data.data.url;
        }
        return;
      }

      await api.post('/donations', payload);

      setMessage('Donation successful. Category-wise receipt generated.');
      setDonationData({
        amount: '',
        type: 'General',
        category: 'Food',
        paymentMethod: 'Cash'
      });

      setShowDonationForm(false);
      setSelectedCampaign(null);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
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
          <p className="mt-4 text-gray-300">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white">
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

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Enhanced Header Section */}
        <div className="mb-16 animate-slide-in">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <span className="text-emerald-200 font-semibold">Active Campaigns</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              Make an <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Impact</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose a campaign and donate category-wise with auto receipt generation
            </p>

            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4">
                <Target className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-emerald-400">{campaigns.length}</p>
                <p className="text-sm text-gray-300">Active Campaigns</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-400">1000+</p>
                <p className="text-sm text-gray-300">Donors</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-400">100%</p>
                <p className="text-sm text-gray-300">Transparency</p>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className="max-w-xl mx-auto mb-8 p-4 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400 rounded-xl text-center animate-slide-in">
            <CheckCircle className="inline w-5 h-5 mr-2" />
            {message}
          </div>
        )}

        {/* All Campaigns - Same Layout for Each */}
        <div className="space-y-12">
          {campaigns.map((campaign, index) => {
            const progress = (campaign.currentAmount / campaign.goalAmount) * 100;
            
            return (
              <div
                key={campaign._id}
                className="animate-slide-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border-2 border-emerald-400/30 rounded-3xl p-8 shadow-2xl hover:scale-[1.01] transition-all">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span className="text-sm font-semibold text-emerald-300">
                          {index === 0 ? 'Featured Campaign' : `Campaign #${index + 1}`}
                        </span>
                      </div>

                      <h2 className="text-4xl font-bold text-white">{campaign.name}</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">{campaign.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
                          <p className="text-gray-400 text-sm mb-1">Raised</p>
                          <p className="text-2xl font-bold text-emerald-400">Rs. {campaign.currentAmount.toLocaleString()}</p>
                        </div>
                        <div className="backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
                          <p className="text-gray-400 text-sm mb-1">Goal</p>
                          <p className="text-2xl font-bold text-emerald-400">Rs. {campaign.goalAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleDonateClick(campaign)}
                        className="w-full lg:w-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all px-8 py-6 text-lg"
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        Donate to This Campaign
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-300 font-medium">Campaign Progress</span>
                          <span className="text-emerald-400 font-bold text-xl">
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <div className="h-4 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className="h-4 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
                        <h3 className="font-semibold text-white mb-3">Why This Campaign Matters</h3>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">Direct impact on community welfare</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">100% transparent fund allocation</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">Automatic receipt generation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Donation Modal */}
        {showDonationForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-slide-in">
            <Card className="w-full max-w-lg backdrop-blur-xl bg-slate-900/95 border border-emerald-400/30 shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="relative border-b border-white/10 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-2xl mb-2">Make Donation</CardTitle>
                    <CardDescription className="text-gray-300 flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-400" />
                      {selectedCampaign?.name}
                    </CardDescription>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowDonationForm(false);
                      setSelectedCampaign(null);
                      setDonationData({
                        amount: '',
                        type: 'General',
                        category: 'Food',
                        paymentMethod: 'Cash'
                      });
                    }}
                    className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>

              <form onSubmit={handleDonationSubmit}>
                <CardContent className="space-y-5 p-6">
                  {/* Amount */}
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      Amount (PKR)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                        Rs
                      </span>
                      <Input
                        type="number"
                        required
                        min={donationData.paymentMethod !== 'Cash' ? 150 : 1}
                        placeholder={
                          donationData.paymentMethod !== 'Cash'
                            ? 'Minimum 150'
                            : 'Enter amount'
                        }
                        className="pl-10 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 transition-all text-lg font-semibold"
                        value={donationData.amount}
                        onChange={(e) =>
                          setDonationData({ ...donationData, amount: e.target.value })
                        }
                      />
                    </div>
                    <p className="text-xs text-gray-400 leading-tight flex items-start gap-1">
                      <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {donationData.paymentMethod !== 'Cash'
                        ? 'Minimum donation for Online/Bank is Rs 150'
                        : 'No minimum limit for cash donations'}
                    </p>
                  </div>

                  {/* Donation Type */}
                  <div className="space-y-2">
                    <Label className="text-white">Donation Type</Label>

                    <Select
                      value={donationData.type}
                      onChange={(e) =>
                        setDonationData({ ...donationData, type: e.target.value })
                      }
                      className="h-12 bg-white/5 border-white/20 text-white focus:border-emerald-400"
                    >
                      <option value="Zakat" className="bg-slate-900 text-white">Zakat</option>
                      <option value="Sadqah" className="bg-slate-900 text-white">Sadqah</option>
                      <option value="Fitra" className="bg-slate-900 text-white">Fitra</option>
                      <option value="General" className="bg-slate-900 text-white">General</option>
                    </Select>

                    <p className="text-xs text-gray-400 leading-tight">
                      Select the type of donation you want to give
                    </p>
                  </div>


                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-white">Category</Label>

                    <Select
                      value={donationData.category}
                      onChange={(e) =>
                        setDonationData({ ...donationData, category: e.target.value })
                      }
                      className="h-12 bg-white/5 border-white/20 text-white focus:border-emerald-400"
                    >
                      <option value="Food" className="bg-slate-900 text-white">Food</option>
                      <option value="Education" className="bg-slate-900 text-white">Education</option>
                      <option value="Medical" className="bg-slate-900 text-white">Medical</option>
                      <option value="Shoe Polish" className="bg-slate-900 text-white">Shoe Polish</option>
                    </Select>

                    <p className="text-xs text-gray-400 leading-tight">
                      Select donation category
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label className="text-white">Payment Method</Label>

                    <Select
                      value={donationData.paymentMethod}
                      onChange={(e) =>
                        setDonationData({ ...donationData, paymentMethod: e.target.value })
                      }
                      className="h-12 bg-white/5 border-white/20 text-white focus:border-emerald-400"
                    >
                      <option value="Cash" className="bg-slate-900 text-white">Cash</option>
                      <option value="Bank" className="bg-slate-900 text-white">Bank Transfer</option>
                      <option value="Online" className="bg-slate-900 text-white">
                        Online (Stripe)
                      </option>
                    </Select>

                    <p className="text-xs text-gray-400 leading-tight">
                      {donationData.paymentMethod === 'Cash'
                        ? 'Pay directly in cash'
                        : donationData.paymentMethod === 'Bank'
                          ? 'Bank transfer with receipt generation'
                          : 'Secure online payment via Stripe (min Rs 150)'}
                    </p>
                  </div>


                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 text-lg"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Confirm Donation
                      </>
                    )}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}