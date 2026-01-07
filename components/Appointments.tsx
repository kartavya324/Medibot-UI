
import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  QrCode, 
  Pill, 
  CheckCircle,
  Plus,
  ChevronRight,
  Stethoscope
} from 'lucide-react';

const Appointments: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      {/* Appointments Column */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Appointments</h2>
            <p className="text-slate-500">Scheduled medical consultations</p>
          </div>
          <button className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm border-l-8 border-l-blue-600">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://picsum.photos/seed/doc1/100/100" 
                  alt="Doctor" 
                  className="w-14 h-14 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-800">Dr. Sarah Jenkins</h4>
                  <p className="text-sm text-slate-500">Senior Cardiologist</p>
                </div>
              </div>
              <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider">
                Confirmed
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg"><Calendar size={18} /></div>
                <span className="text-sm font-medium">Sept 28, 2024</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg"><Clock size={18} /></div>
                <span className="text-sm font-medium">10:30 AM</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 col-span-2">
                <div className="p-2 bg-slate-50 rounded-lg"><Video size={18} /></div>
                <span className="text-sm font-medium">Telehealth Video Consultation</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
                Join Meeting
              </button>
              <button className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
                Reschedule
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <Stethoscope size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Routine Physical Exam</h4>
                  <p className="text-xs text-slate-400">General Practice Clinic</p>
                </div>
              </div>
              <div className="text-xs text-slate-400 font-medium">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Column */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Prescriptions</h2>
          <p className="text-slate-500">Active medications & digital pharmacy</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
            <QrCode className="text-slate-200 group-hover:text-blue-500 transition-colors" size={64} />
          </div>
          
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-rose-50 p-3 rounded-2xl text-rose-500">
              <Pill size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800">Lisinopril 10mg</h4>
              <p className="text-sm text-slate-500">For Hypertension</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
              <span className="text-slate-500">Dosage</span>
              <span className="font-bold text-slate-800">Once daily (Morning)</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
              <span className="text-slate-500">Duration</span>
              <span className="font-bold text-slate-800">30 Days Supply</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
              <span className="text-slate-500">Pharmacy</span>
              <span className="font-bold text-slate-800">CVS Caremark #2934</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MEDIBOT-PRESCRIPTION-123456" 
                alt="QR Code" 
                className="w-16 h-16 rounded-lg border border-white"
              />
              <div>
                <p className="text-xs font-bold text-slate-800 uppercase">Pharmacy Pass</p>
                <p className="text-[10px] text-slate-500">Show this at pickup</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              View Digital Copy
            </button>
          </div>
        </div>

        <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <h4 className="text-xl font-bold mb-2">Smart Reminders</h4>
          <p className="text-emerald-50 text-sm mb-6">MediBOT can automatically alert you when it's time to take your medication.</p>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <span className="font-bold text-sm">Notifications Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
