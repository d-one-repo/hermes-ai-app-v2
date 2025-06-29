import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  Users,
  TrendingUp,
  Target,
  MessageSquare,
  Brain,
  ChevronRight,
  Star,
  Heart,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Zap,
  Eye,
  Clock,
  Filter,
  Search,
  Bell,
  Settings,
  User,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Globe,
  Briefcase,
  Diamond
} from 'lucide-react';

// Types
interface Customer {
  id: string;
  name: string;
  email: string;
  segment: string;
  totalSpent: number;
  lastPurchase: string;
  preferences: string[];
  sentimentScore: number;
  engagementLevel: number;
  luxuryAffinity: number;
  demographics: {
    age: number;
    location: string;
    income: string;
  };
}

interface Segment {
  id: string;
  name: string;
  count: number;
  avgSpent: number;
  characteristics: string[];
  color: string;
  growthRate: number;
}

interface Campaign {
  id: string;
  name: string;
  type: string;
  targetSegment: string;
  performance: number;
  reach: number;
  engagement: number;
  roi: number;
  status: 'active' | 'draft' | 'completed';
}

interface Insight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  recommendations: string[];
}

interface Message {
  id: string;
  template: string;
  personalization: string[];
  effectiveness: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  channel: string;
}

// Mock Data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sophia Chen',
    email: 'sophia.chen@email.com',
    segment: 'Luxury Enthusiast',
    totalSpent: 25000,
    lastPurchase: '2024-01-15',
    preferences: ['Handbags', 'Watches', 'Scarves'],
    sentimentScore: 0.85,
    engagementLevel: 92,
    luxuryAffinity: 0.95,
    demographics: { age: 34, location: 'New York', income: '$150K+' }
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    email: 'marcus.thompson@email.com',
    segment: 'Occasional Buyer',
    totalSpent: 8500,
    lastPurchase: '2023-12-20',
    preferences: ['Ties', 'Belts', 'Fragrance'],
    sentimentScore: 0.72,
    engagementLevel: 68,
    luxuryAffinity: 0.78,
    demographics: { age: 42, location: 'London', income: '$100K+' }
  },
  {
    id: '3',
    name: 'Isabella Rodriguez',
    email: 'isabella.rodriguez@email.com',
    segment: 'VIP Collector',
    totalSpent: 45000,
    lastPurchase: '2024-01-20',
    preferences: ['Limited Editions', 'Jewelry', 'Handbags'],
    sentimentScore: 0.92,
    engagementLevel: 98,
    luxuryAffinity: 0.98,
    demographics: { age: 38, location: 'Paris', income: '$250K+' }
  }
];

const mockSegments: Segment[] = [
  {
    id: '1',
    name: 'VIP Collectors',
    count: 1250,
    avgSpent: 42000,
    characteristics: ['High-value purchases', 'Brand loyalty', 'Exclusive preferences'],
    color: '#FFD700',
    growthRate: 15
  },
  {
    id: '2',
    name: 'Luxury Enthusiasts',
    count: 3200,
    avgSpent: 18000,
    characteristics: ['Trend-conscious', 'Social media active', 'Quality-focused'],
    color: '#FF6B35',
    growthRate: 22
  },
  {
    id: '3',
    name: 'Occasional Buyers',
    count: 5800,
    avgSpent: 6500,
    characteristics: ['Price-sensitive', 'Special occasions', 'Gift purchases'],
    color: '#4ECDC4',
    growthRate: 8
  },
  {
    id: '4',
    name: 'Emerging Luxury',
    count: 2100,
    avgSpent: 12000,
    characteristics: ['Young professionals', 'Aspirational', 'Digital-first'],
    color: '#95E1D3',
    growthRate: 35
  }
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Spring Collection Launch',
    type: 'Product Launch',
    targetSegment: 'Luxury Enthusiasts',
    performance: 87,
    reach: 125000,
    engagement: 8.4,
    roi: 320,
    status: 'active'
  },
  {
    id: '2',
    name: 'VIP Exclusive Preview',
    type: 'Exclusive Event',
    targetSegment: 'VIP Collectors',
    performance: 94,
    reach: 3200,
    engagement: 15.7,
    roi: 450,
    status: 'completed'
  },
  {
    id: '3',
    name: 'Holiday Gift Guide',
    type: 'Seasonal',
    targetSegment: 'Occasional Buyers',
    performance: 76,
    reach: 85000,
    engagement: 6.2,
    roi: 180,
    status: 'draft'
  }
];

const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Emerging Luxury segment shows 35% growth',
    description: 'Young professionals aged 25-35 are increasingly investing in luxury items, particularly accessories.',
    confidence: 92,
    impact: 'high',
    category: 'Market Trends',
    recommendations: ['Target digital marketing', 'Develop entry-level luxury line', 'Partner with influencers']
  },
  {
    id: '2',
    title: 'Sentiment analysis reveals brand perception shift',
    description: 'Customer sentiment towards sustainability initiatives has increased by 18% in the past quarter.',
    confidence: 87,
    impact: 'medium',
    category: 'Brand Perception',
    recommendations: ['Highlight sustainability efforts', 'Create eco-friendly product line', 'Partner with environmental causes']
  },
  {
    id: '3',
    title: 'Personalized messaging increases engagement by 45%',
    description: 'Customers respond significantly better to personalized communications based on purchase history.',
    confidence: 95,
    impact: 'high',
    category: 'Marketing Optimization',
    recommendations: ['Implement dynamic personalization', 'Segment email campaigns', 'Use AI-driven content']
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    template: 'Dear {name}, discover our exclusive {category} collection curated just for you.',
    personalization: ['name', 'category', 'preferences'],
    effectiveness: 89,
    sentiment: 'positive',
    channel: 'email'
  },
  {
    id: '2',
    template: '{name}, your VIP status grants you early access to our limited edition {product}.',
    personalization: ['name', 'product', 'vip_status'],
    effectiveness: 94,
    sentiment: 'positive',
    channel: 'sms'
  },
  {
    id: '3',
    template: 'Celebrating your journey with HERMÈS. Explore pieces that reflect your unique style.',
    personalization: ['purchase_history', 'style_preferences'],
    effectiveness: 86,
    sentiment: 'positive',
    channel: 'push'
  }
];

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const getGrowthIcon = (rate: number) => {
  return rate > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
};

// Custom Hooks
const useCustomerData = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCustomers(mockCustomers);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { customers, loading };
};

const useAnalytics = () => {
  const [analytics] = useState({
    totalRevenue: 2450000,
    totalCustomers: 12350,
    avgOrderValue: 1850,
    conversionRate: 3.2,
    customerSatisfaction: 4.7,
    brandSentiment: 0.85
  });

  return { analytics };
};

const useAIInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setInsights(mockInsights);
      setLoading(false);
    };
    fetchInsights();
  }, []);

  return { insights, loading };
};

const useCampaignRecommendations = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setCampaigns(mockCampaigns);
      setLoading(false);
    };
    fetchCampaigns();
  }, []);

  return { campaigns, loading };
};

// Components
const MetricsCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{change}</p>
      </div>
    </div>
    <h3 className="mt-4 text-lg font-semibold text-gray-700">{title}</h3>
  </div>
);

const CustomerSegmentCard: React.FC<{ segment: Segment }> = ({ segment }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full mr-3`} style={{ backgroundColor: segment.color }}></div>
        <h3 className="text-lg font-semibold text-gray-900">{segment.name}</h3>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        {getGrowthIcon(segment.growthRate)}
        <span className="ml-1">{segment.growthRate}%</span>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600">Customers</span>
        <span className="font-medium">{formatNumber(segment.count)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Avg. Spent</span>
        <span className="font-medium">{formatCurrency(segment.avgSpent)}</span>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-500 mb-2">Characteristics:</p>
      {segment.characteristics.map((char, index) => (
        <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mr-2 mb-1">
          {char}
        </span>
      ))}
    </div>
  </div>
);

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
        campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {campaign.status}
      </span>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600">Performance</span>
        <span className="font-medium">{campaign.performance}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Reach</span>
        <span className="font-medium">{formatNumber(campaign.reach)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Engagement</span>
        <span className="font-medium">{campaign.engagement}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">ROI</span>
        <span className="font-medium text-green-600">{campaign.roi}%</span>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Target: {campaign.targetSegment}</span>
        <span className="text-sm text-gray-500">{campaign.type}</span>
      </div>
    </div>
  </div>
);

const InsightCard: React.FC<{ insight: Insight }> = ({ insight }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center">
        <Brain className="w-5 h-5 text-blue-500 mr-2" />
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          insight.impact === 'high' ? 'bg-red-100 text-red-800' :
          insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {insight.impact} impact
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-500 mr-2">Confidence:</span>
        <span className="font-medium text-blue-600">{insight.confidence}%</span>
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
    <p className="text-gray-600 mb-4">{insight.description}</p>
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Recommendations:</p>
      {insight.recommendations.map((rec, index) => (
        <div key={index} className="flex items-center text-sm text-gray-600">
          <ChevronRight className="w-4 h-4 mr-2" />
          {rec}
        </div>
      ))}
    </div>
  </div>
);

const MessageCard: React.FC<{ message: Message }> = ({ message }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <MessageSquare className="w-5 h-5 text-purple-500 mr-2" />
        <span className="text-sm font-medium text-gray-700">{message.channel}</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-500 mr-2">Effectiveness:</span>
        <span className="font-medium text-green-600">{message.effectiveness}%</span>
      </div>
    </div>
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <p className="text-gray-800 italic">{message.template}</p>
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Personalization Fields:</p>
      <div className="flex flex-wrap gap-2">
        {message.personalization.map((field, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            {field}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Main Dashboard Component
const HermesCustomerInsightsAI: React.FC = () => {
  const { customers, loading: customersLoading } = useCustomerData();
  const { analytics } = useAnalytics();
  const { insights, loading: insightsLoading } = useAIInsights();
  const { campaigns, loading: campaignsLoading } = useCampaignRecommendations();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'segments' | 'campaigns' | 'insights' | 'messages'>('dashboard');

  const chartData = useMemo(() => {
    return mockSegments.map(segment => ({
      name: segment.name,
      customers: segment.count,
      avgSpent: segment.avgSpent,
      growth: segment.growthRate
    }));
  }, []);

  const pieData = useMemo(() => {
    return mockSegments.map(segment => ({
      name: segment.name,
      value: segment.count,
      color: segment.color
    }));
  }, []);

  if (customersLoading || insightsLoading || campaignsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading HERMÈS Customer Insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Diamond className="w-8 h-8 text-orange-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">HERMÈS Customer Insights AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-500" />
              <Settings className="w-6 h-6 text-gray-500" />
              <User className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'segments', label: 'Customer Segments', icon: Users },
              { id: 'campaigns', label: 'Campaigns', icon: Target },
              { id: 'insights', label: 'AI Insights', icon: Brain },
              { id: 'messages', label: 'Message Optimizer', icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricsCard
                title="Total Revenue"
                value={formatCurrency(analytics.totalRevenue)}
                change="+12.5% vs last month"
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                color="bg-green-500"
              />
              <MetricsCard
                title="Total Customers"
                value={formatNumber(analytics.totalCustomers)}
                change="+8.3% vs last month"
                icon={<Users className="w-6 h-6 text-white" />}
                color="bg-blue-500"
              />
              <MetricsCard
                title="Avg. Order Value"
                value={formatCurrency(analytics.avgOrderValue)}
                change="+5.2% vs last month"
                icon={<ShoppingBag className="w-6 h-6 text-white" />}
                color="bg-purple-500"
              />
              <MetricsCard
                title="Conversion Rate"
                value={`${analytics.conversionRate}%`}
                change="+0.8% vs last month"
                icon={<Target className="w-6 h-6 text-white" />}
                color="bg-orange-500"
              />
              <MetricsCard
                title="Customer Satisfaction"
                value={`${analytics.customerSatisfaction}/5`}
                change="+0.2 vs last month"
                icon={<Star className="w-6 h-6 text-white" />}
                color="bg-yellow-500"
              />
              <MetricsCard
                title="Brand Sentiment"
                value={`${Math.round(analytics.brandSentiment * 100)}%`}
                change="+3.1% vs last month"
                icon={<Heart className="w-6 h-6 text-white" />}
                color="bg-red-500"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="customers" fill="#FF6B35" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Segment Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'segments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Customer Segments</h2>
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-500" />
                <Filter className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockSegments.map((segment) => (
                <CustomerSegmentCard key={segment.id} segment={segment} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Campaign Recommendations</h2>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Create Campaign
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">AI-Powered Insights</h2>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">Powered by AI</span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Message Optimizer</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Create Message
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockMessages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HermesCustomerInsightsAI;