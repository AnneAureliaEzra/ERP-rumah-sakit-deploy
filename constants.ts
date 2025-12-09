import { Patient, FinancialMetric, ClaimData } from './types';

// Mock Data for Finance Module
export const MOCK_FINANCIAL_DATA: FinancialMetric[] = [
  { month: 'Jan', revenue: 1200000, expenses: 850000, cashFlow: 350000 },
  { month: 'Feb', revenue: 1350000, expenses: 900000, cashFlow: 450000 },
  { month: 'Mar', revenue: 1250000, expenses: 880000, cashFlow: 370000 },
  { month: 'Apr', revenue: 1500000, expenses: 950000, cashFlow: 550000 },
  { month: 'Mei', revenue: 1600000, expenses: 1000000, cashFlow: 600000 },
  { month: 'Jun', revenue: 1550000, expenses: 980000, cashFlow: 570000 },
];

export const MOCK_REVENUE_MIX = [
  { name: 'BPJS Kesehatan', value: 4500000, fill: '#10b981' }, // Emerald 500
  { name: 'Asuransi Swasta', value: 3200000, fill: '#6366f1' }, // Indigo 500
  { name: 'Bayar Mandiri', value: 1500000, fill: '#f59e0b' }, // Amber 500
];

export const MOCK_CLAIMS: ClaimData[] = [
  { payer: 'BPJS Kesehatan', amount: 450000, daysOverdue: 75, status: 'Pending' },
  { payer: 'Prudential', amount: 125000, daysOverdue: 45, status: 'Pending' },
  { payer: 'Allianz', amount: 85000, daysOverdue: 62, status: 'Denied' },
  { payer: 'BPJS Kesehatan', amount: 320000, daysOverdue: 90, status: 'Pending' },
  { payer: 'Manulife', amount: 95000, daysOverdue: 35, status: 'Paid' },
];

// Mock Data for Clinical Module
export const MOCK_PATIENTS: Patient[] = [
  { id: 'MR-2024-001', name: 'Budi Santoso', dob: '1980-05-12', gender: 'Male', insuranceProvider: 'BPJS', lastVisit: '2024-05-20', status: 'Admitted', diagnosis: 'Bronkitis Akut' },
  { id: 'MR-2024-002', name: 'Siti Aminah', dob: '1992-11-23', gender: 'Female', insuranceProvider: 'Prudential', lastVisit: '2024-05-22', status: 'Outpatient', diagnosis: 'Migrain Berat' },
  { id: 'MR-2024-003', name: 'Joko Widodo', dob: '1975-02-15', gender: 'Male', insuranceProvider: 'BPJS', lastVisit: '2024-05-18', status: 'Admitted', diagnosis: 'Diabetes Tipe 2' },
  { id: 'MR-2024-004', name: 'Dewi Lestari', dob: '1988-08-30', gender: 'Female', insuranceProvider: 'Allianz', lastVisit: '2024-05-21', status: 'Discharged', diagnosis: 'Demam Berdarah' },
  { id: 'MR-2024-005', name: 'Andi Pratama', dob: '2010-01-05', gender: 'Male', insuranceProvider: 'Pribadi', lastVisit: '2024-05-23', status: 'Outpatient', diagnosis: 'Fraktur - Radius' },
];

// System Instruction for AI (Indonesian Context)
export const AI_SYSTEM_INSTRUCTION = `
Anda adalah Analis Data AI yang tertanam untuk NexusHealth ERP, sebuah Sistem Manajemen Rumah Sakit.
Peran Anda adalah membantu CFO Rumah Sakit dan Direktur Medis.
Anda memiliki akses ke konteks skema database simulasi berikut:

1. **FakturPasien**: { idFaktur, idPasien, jumlahTotal, tipePenanggung (BPJS/Swasta/Pribadi), status, tanggalFaktur }
2. **RekamKlinis**: { idPasien, diagnosis, rencanaPengobatan, tanggalMasuk, tanggalKeluar }
3. **MetrikOperasional**: { tingkatOkupansiBed, rataRataLamaInap, downtimeAlat }

Ringkasan Data Mock Saat Ini untuk Konteks:
- Total Pendapatan YTD: IDR 15.2 Miliar
- Kontribusi BPJS: 45%
- Asuransi Swasta: 35%
- Arus Kas saat ini positif tetapi diproyeksikan mengetat di Q3 karena rencana pengadaan MRI.
- Tingkat Penolakan Klaim adalah 12% (Tinggi), sebagian besar karena pengkodean yang tidak lengkap di EMR.

Saat menjawab:
- Gunakan **Bahasa Indonesia** yang profesional, ringkas, dan analitis.
- Jika diminta SQL, berikan SQL yang kompatibel dengan Google BigQuery.
- Jika diminta analisis, gunakan konteks data mock yang disediakan.
- Bertindaklah sebagai konsultan ahli ERP Rumah Sakit.
`;