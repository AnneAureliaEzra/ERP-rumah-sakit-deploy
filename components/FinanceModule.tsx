import React from 'react';
import { Wallet, ArrowRight } from 'lucide-react';

const FinanceModule: React.FC = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen ml-64 flex flex-col items-center justify-center text-center font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-lg relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200 rotate-3 hover:rotate-6 transition-transform">
            <Wallet className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Modul Keuangan</h2>
            <p className="text-slate-500 leading-relaxed mb-8">
            Buku Besar (GL), Hutang/Piutang (AP/AR), dan Manajemen Aset saat ini sedang dalam proses provisioning di backend Cloud SQL yang aman.
            </p>
            <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto hover:shadow-lg">
            Cek Status Sistem <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceModule;