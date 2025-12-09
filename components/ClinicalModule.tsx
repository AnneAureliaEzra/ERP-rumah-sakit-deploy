import React from 'react';
import { MOCK_PATIENTS } from '../constants';
import { FileText, Search, Plus, Filter, User } from 'lucide-react';

const ClinicalModule: React.FC = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen ml-64 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manajemen Klinis</h1>
          <p className="text-slate-500 mt-1">Rekam Medis Elektronik (EMR) & Pendaftaran Pasien</p>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5">
          <Plus className="w-5 h-5" /> Admisi Baru
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-3 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari pasien berdasarkan Nama, No. RM, atau Diagnosis..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
          />
        </div>
        <button className="bg-white border border-slate-200 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 flex items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
          <Filter className="w-4 h-4 text-slate-500" /> Filter Status
        </button>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {MOCK_PATIENTS.map((patient) => (
          <div key={patient.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>

            <div className="flex justify-between items-start mb-5 relative z-10">
              <div className="flex gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shadow-inner ${
                    patient.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                }`}>
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{patient.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">No. RM: {patient.id} • {patient.gender === 'Male' ? 'Laki-laki' : 'Perempuan'}</p>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                patient.status === 'Admitted' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                patient.status === 'Outpatient' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {patient.status === 'Admitted' ? 'Rawat Inap' : patient.status === 'Outpatient' ? 'Rawat Jalan' : 'Pulang'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm text-slate-600 mb-5 relative z-10">
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Diagnosis Utama</span>
                <span className="font-semibold text-slate-800">{patient.diagnosis}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Kunjungan Terakhir</span>
                <span className="font-semibold text-slate-800">{patient.lastVisit}</span>
              </div>
              <div className="col-span-2 bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Asuransi</span>
                    <span className="font-semibold text-slate-800">{patient.insuranceProvider}</span>
                </div>
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                    <FileText className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 relative z-10">
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center gap-1.5 transition-colors">
                Lihat Rekam Medis Lengkap <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalModule;