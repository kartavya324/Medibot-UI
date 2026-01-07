
import React from 'react';
import { 
  Heart, 
  Droplets, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  Activity,
  Smartphone
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const heartRateData = [
  { time: '08:00', bpm: 70 },
  { time: '10:00', bpm: 75 },
  { time: '12:00', bpm: 82 },
  { time: '14:00', bpm: 78 },
  { time: '16:00', bpm: 72 },
  { time: '18:00', bpm: 85 },
  { time: '20:00', bpm: 71 },
];

const activityData = [
  { day: 'Mon', steps: 4200 },
  { day: 'Tue', steps: 5100 },
  { day: 'Wed', steps: 6800 },
  { day: 'Thu', steps: 3500 },
  { day: 'Fri', steps: 7200 },
  { day: 'Sat', steps: 9000 },
  { day: 'Sun', steps: 4500 },
];

const StatCard = ({ icon: Icon, label, value, unit, color, trend }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color.bg}`}>
        <Icon className={color.text} size={24} />
      </div>
      <div className="flex items-center space-x-1 text-emerald-500 font-medium text-sm">
        <TrendingUp size={16} />
        <span>{trend}%</span>
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <div className="flex items-baseline space-x-1">
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        <span className="text-slate-400 text-sm">{unit}</span>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Health Overview</h2>
          <p className="text-slate-500 mt-1 flex items-center">
            <Smartphone size={16} className="mr-2" />
            Connected to Apple Watch Series 8
          </p>
        </div>
        <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
          Live Tracking Active
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={Heart} 
          label="Heart Rate" 
          value="72" 
          unit="bpm" 
          color={{ bg: 'bg-rose-50', text: 'text-rose-500' }}
          trend="2.4"
        />
        <StatCard 
          icon={Droplets} 
          label="SpO2 Level" 
          value="98" 
          unit="%" 
          color={{ bg: 'bg-blue-50', text: 'text-blue-500' }}
          trend="0.5"
        />
        <StatCard 
          icon={Zap} 
          label="Steps Today" 
          value="4,500" 
          unit="steps" 
          color={{ bg: 'bg-amber-50', text: 'text-amber-500' }}
          trend="12.3"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Heart Rate Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Heart Rate Trend</h3>
              <p className="text-sm text-slate-500">Continuous monitoring data</p>
            </div>
            <select className="bg-slate-50 text-slate-600 border-none rounded-xl px-3 py-2 text-sm outline-none">
              <option>Last 12 hours</option>
              <option>Last 24 hours</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heartRateData}>
                <defs>
                  <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="bpm" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorBpm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Weekly Activity</h3>
              <p className="text-sm text-slate-500">Step count progress</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <ArrowUpRight size={20} />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Line type="monotone" dataKey="steps" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
