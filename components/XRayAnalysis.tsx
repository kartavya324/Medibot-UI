
import React, { useState } from 'react';
import { 
  Upload, 
  Scan, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Info,
  Loader2,
  Maximize2
} from 'lucide-react';

const XRayAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate complex AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Hardcoded response for prototype
      setResult("Analysis Complete: No fractures or significant abnormalities detected in the provided thoracic region. Lung clarity is normal. Recommended follow-up in 6 months for routine screening.");
    }, 3500);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">X-Ray Analysis</h2>
        <p className="text-slate-500">Advanced AI Diagnostic Tool (Experimental)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload & Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-4 h-[450px] relative overflow-hidden flex flex-col items-center justify-center group">
            {preview ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={preview} 
                  alt="X-ray preview" 
                  className="max-h-full max-w-full rounded-xl object-contain"
                />
                
                {/* Analyzing Overlay */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                    <div className="text-center">
                      <div className="bg-white/20 p-4 rounded-full backdrop-blur-md mb-4 inline-block">
                        <Loader2 className="text-white animate-spin" size={40} />
                      </div>
                      <p className="text-white font-bold text-xl tracking-wider uppercase drop-shadow-md">AI Analyzing Image...</p>
                      <p className="text-blue-100 text-sm mt-2">Checking 50+ medical markers</p>
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-600 p-2 rounded-full shadow-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer text-center p-12">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">Drop X-ray here</h4>
                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Upload high-resolution PNG or JPG file. Max size 15MB.</p>
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                <span className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all inline-block">
                  Browse Files
                </span>
              </label>
            )}
          </div>

          <div className="flex items-center justify-center mt-8">
            <button 
              onClick={startAnalysis}
              disabled={!file || isAnalyzing}
              className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold flex items-center space-x-3 hover:bg-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-200"
            >
              <Scan size={20} />
              <span>{isAnalyzing ? 'Processing AI Models...' : 'Run Diagnostics'}</span>
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Search className="mr-3 text-blue-600" size={24} />
              Analysis Result
            </h3>

            {!result && !isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <Info size={48} className="text-slate-200 mb-4" />
                <p className="text-slate-400 text-sm italic">Upload an image and run diagnostics to see results here.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2 animate-pulse">
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-5/6" />
                  </div>
                ))}
              </div>
            )}

            {result && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-start space-x-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h5 className="font-bold text-emerald-900 text-sm">Low Risk Detected</h5>
                    <p className="text-emerald-700 text-xs mt-1">Confidence Score: 98.4%</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    {result}
                  </p>
                </div>

                <div className="space-y-3">
                  <h6 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Steps</h6>
                  <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-400 transition-all text-sm group">
                    <span className="text-slate-700 font-medium">Download Full Report</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-400 transition-all text-sm group">
                    <span className="text-slate-700 font-medium">Send to My Doctor</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500" />
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-auto pt-8 border-t border-slate-100 text-[10px] text-slate-400 italic">
              AI analysis is an assistive tool and must be verified by a board-certified radiologist.
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0%, 100% { top: 5%; }
          50% { top: 95%; }
        }
      `}</style>
    </div>
  );
};

export default XRayAnalysis;
