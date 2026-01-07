
import React, { useState } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  File, 
  Download, 
  Eye, 
  MoreVertical, 
  Plus, 
  Filter,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { MedicalFile } from '../types';

const initialFiles: MedicalFile[] = [
  { id: '1', name: 'Prescription_Sep12.pdf', type: 'pdf', date: '2 weeks ago', size: '1.2 MB' },
  { id: '2', name: 'Chest_XRay_Aug28.jpg', type: 'jpg', date: 'Aug 28, 2024', size: '4.5 MB' },
  { id: '3', name: 'Blood_Report_Aug15.pdf', type: 'pdf', date: 'Aug 15, 2024', size: '2.1 MB' },
  { id: '4', name: 'Vaccination_Record.pdf', type: 'pdf', date: 'Jan 10, 2024', size: '840 KB' },
];

const Records: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<MedicalFile[]>(initialFiles);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            const newFile: MedicalFile = {
              id: Date.now().toString(),
              name: 'Scan_Result_New.pdf',
              type: 'pdf',
              date: 'Just now',
              size: '1.5 MB'
            };
            setFiles(prevFiles => [newFile, ...prevFiles]);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Medical Records</h2>
          <p className="text-slate-500">Secure electronic health records (EHR)</p>
        </div>
        <button 
          onClick={simulateUpload}
          disabled={isUploading}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-70"
        >
          {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
          <span>{isUploading ? 'Uploading...' : 'Upload New File'}</span>
        </button>
      </div>

      {isUploading && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileText size={20} />
              </div>
              <span className="font-medium text-slate-700">Scan_Result_New.pdf</span>
            </div>
            <span className="text-sm font-bold text-blue-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All Records', 'Prescriptions', 'Lab Reports', 'Scans', 'Others'].map((tab, i) => (
          <button 
            key={tab} 
            className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0 ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
        <button className="p-2.5 bg-white text-slate-500 border border-slate-100 rounded-xl hover:bg-slate-50">
          <Filter size={18} />
        </button>
      </div>

      {/* Files List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map((file) => (
          <div key={file.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
            <div className="flex items-center space-x-4 overflow-hidden">
              <div className={`p-4 rounded-2xl shrink-0 ${file.type === 'pdf' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
                {file.type === 'pdf' ? <FileText size={24} /> : <ImageIcon size={24} />}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-slate-800 truncate">{file.name}</h4>
                <div className="flex items-center text-xs text-slate-400 mt-1 space-x-3">
                  <span>{file.date}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span>{file.size}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Eye size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Info */}
      <div className="bg-blue-50 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm shrink-0">
          <CheckCircle2 className="text-blue-600" size={32} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-lg">Blockchain Secured</h4>
          <p className="text-slate-600 text-sm mt-1">
            All your records are encrypted and stored using blockchain technology, ensuring privacy and preventing unauthorized access. Only you and authorized doctors can view these files.
          </p>
        </div>
        <button className="md:ml-auto bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap">
          Manage Permissions
        </button>
      </div>
    </div>
  );
};

export default Records;
