
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  ScanLine, 
  CalendarCheck,
  User,
  Stethoscope,
  Bell,
  Search,
  Settings,
  LogOut
} from 'lucide-react';
import { TabType, UserRole } from './types';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Records from './components/Records';
import XRayAnalysis from './components/XRayAnalysis';
import Appointments from './components/Appointments';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.PATIENT);

  const NavItem = ({ tab, icon: Icon, label }: { tab: TabType, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === tab 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const renderContent = () => {
    switch (activeTab) {
      case TabType.DASHBOARD: return <Dashboard />;
      case TabType.CHATBOT: return <Chatbot />;
      case TabType.RECORDS: return <Records />;
      case TabType.XRAY: return <XRayAnalysis />;
      case TabType.APPOINTMENTS: return <Appointments />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Stethoscope className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">MediBOT</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem tab={TabType.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
          <NavItem tab={TabType.CHATBOT} icon={MessageSquare} label="AI Medical Chat" />
          <NavItem tab={TabType.RECORDS} icon={FileText} label="Health Records" />
          <NavItem tab={TabType.XRAY} icon={ScanLine} label="X-Ray Analysis" />
          <NavItem tab={TabType.APPOINTMENTS} icon={CalendarCheck} label="Appointments" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {userRole === UserRole.PATIENT ? 'JD' : 'Dr'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {userRole === UserRole.PATIENT ? 'John Doe' : 'Dr. Smith'}
                </p>
                <p className="text-xs text-slate-500 truncate capitalize">{userRole}</p>
              </div>
            </div>
            <button 
              onClick={() => setUserRole(userRole === UserRole.PATIENT ? UserRole.DOCTOR : UserRole.PATIENT)}
              className="w-full text-xs bg-white border border-slate-200 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Switch to {userRole === UserRole.PATIENT ? 'Doctor' : 'Patient'}
            </button>
          </div>
          <button className="flex items-center space-x-2 text-slate-400 hover:text-red-500 transition-colors mt-4 px-2 text-sm font-medium">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center bg-slate-50 px-4 py-2 rounded-xl w-96 max-w-full">
            <Search className="text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search records, appointments..." 
              className="bg-transparent border-none outline-none ml-3 text-sm w-full text-slate-600 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <Settings size={22} />
            </button>
            <div className="md:hidden flex items-center bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="text-white" size={20} />
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2">
          <button onClick={() => setActiveTab(TabType.DASHBOARD)} className={`p-2 rounded-lg ${activeTab === TabType.DASHBOARD ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
            <LayoutDashboard size={20} />
          </button>
          <button onClick={() => setActiveTab(TabType.CHATBOT)} className={`p-2 rounded-lg ${activeTab === TabType.CHATBOT ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
            <MessageSquare size={20} />
          </button>
          <button onClick={() => setActiveTab(TabType.XRAY)} className={`p-2 rounded-lg ${activeTab === TabType.XRAY ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
            <ScanLine size={20} />
          </button>
          <button onClick={() => setActiveTab(TabType.RECORDS)} className={`p-2 rounded-lg ${activeTab === TabType.RECORDS ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
            <FileText size={20} />
          </button>
          <button onClick={() => setActiveTab(TabType.APPOINTMENTS)} className={`p-2 rounded-lg ${activeTab === TabType.APPOINTMENTS ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
            <CalendarCheck size={20} />
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;
