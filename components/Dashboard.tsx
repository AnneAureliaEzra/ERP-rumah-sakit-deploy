import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar 
} from 'recharts';
import { TrendingUp, AlertTriangle, DollarSign, Users, ArrowUpRight, Activity } from 'lucide-react';
import { MOCK_FINANCIAL_DATA, MOCK_REVENUE_MIX, MOCK_CLAIMS } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in p-8 bg-slate-50 min-h-screen ml-64 font-sans">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Ikhtisar Eksekutif</h1>
          <p className="text-slate-500 mt-1">Kinerja Keuangan & Risiko Operasional (Real-time)</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 text-slate-700 shadow-sm transition-all hover:shadow-md">
            Ekspor Laporan
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105">
            Perbarui Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Pendapatan Pasien (YTD)', value: 'Rp 15.2 M', change: '+12%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' },
          { label: 'Perputaran AR (Piutang)', value: '45 Hari', change: '-2 Hari', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-200' },
          { label: 'Tingkat Penolakan Klaim', value: '12.4%', change: '+1.2%', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-200' },
          { label: 'Okupansi Tempat Tidur', value: '82%', change: '+5%', icon: Users, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' },
        ].map((kpi, idx) => (
          <div key={idx} className={`bg-white p-6 rounded-2xl border ${kpi.border} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{kpi.value}</h3>
              </div>
              <div className={`p-3.5 rounded-xl ${kpi.bg} shadow-inner`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center bg-slate-50 w-fit px-2 py-1 rounded-lg">
              <span className={`text-xs font-bold ${kpi.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.change}
              </span>
              <span className="text-xs text-slate-400 ml-2 font-medium">vs bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Projection */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Proyeksi Arus Kas (90 Hari)</h3>
              <p className="text-xs text-slate-400">Analisis tren pendapatan vs pengeluaran operasional</p>
            </div>
            <span className="px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 flex items-center gap-1.5 shadow-sm">
              <TrendingUp className="w-3.5 h-3.5" /> Prediksi AI Vertex
            </span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_FINANCIAL_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/> 
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  formatter={(value: number) => [`Rp ${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Pendapatan" activeDot={{r: 6, strokeWidth: 0}} />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" name="Pengeluaran" activeDot={{r: 6, strokeWidth: 0}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Mix */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Komposisi Pendapatan</h3>
          <p className="text-xs text-slate-400 mb-6">Distribusi berdasarkan penanggung biaya</p>
          <div className="flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_REVENUE_MIX}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {MOCK_REVENUE_MIX.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString()}`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
             <p className="text-xs text-emerald-600 font-medium mb-1">Kontributor Utama</p>
             <p className="text-sm font-bold text-emerald-800">BPJS Kesehatan (45%)</p>
          </div>
        </div>
      </div>

      {/* Claims Aging Analysis Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Analisis Umur Klaim (Aging)</h3>
            <p className="text-xs text-slate-500">Status pembayaran asuransi dan klaim tertunda</p>
          </div>
          <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
            Lihat Semua <ArrowUpRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Penanggung / Asuransi</th>
                <th className="px-6 py-4 font-bold tracking-wider">Nilai Tagihan</th>
                <th className="px-6 py-4 font-bold tracking-wider">Keterlambatan</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CLAIMS.map((claim, idx) => (
                <tr key={idx} className="bg-white border-b border-slate-50 hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{claim.payer}</td>
                  <td className="px-6 py-4 font-mono font-medium text-slate-700">Rp {claim.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      claim.daysOverdue > 60 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {claim.daysOverdue} Hari
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      claim.status === 'Denied' 
                        ? 'bg-rose-100 text-rose-700 border-rose-200' 
                        : claim.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        : 'bg-indigo-100 text-indigo-700 border-indigo-200'
                    }`}>
                      {claim.status === 'Denied' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {claim.status === 'Denied' ? 'Ditolak' : claim.status === 'Pending' ? 'Tertunda' : 'Lunas'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 font-bold transition-colors">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;