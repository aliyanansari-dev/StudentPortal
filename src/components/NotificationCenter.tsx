import { useState } from 'react';
import { PortalNotification, NotificationType } from '../types';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Clock, 
  Coffee, 
  AlertCircle, 
  Calendar, 
  Radio, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: PortalNotification[];
  onMarkAllAsRead: () => void;
  onTriggerNotification: (type: NotificationType, title?: string, message?: string) => void;
  activeToast: PortalNotification | null;
  onDismissToast: () => void;
}

export default function NotificationCenter({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onTriggerNotification,
  activeToast,
  onDismissToast
}: NotificationCenterProps) {
  const [customTitle, setCustomTitle] = useState('');
  const [customMsg, setCustomMsg] = useState('');
  const [customType, setCustomType] = useState<NotificationType>('reminder');

  const getNotifIcon = (type: NotificationType) => {
    switch (type) {
      case 'class_shift':
        return <Radio className="w-4 h-4 text-amber-600" />;
      case 'class_end':
        return <CheckCheck className="w-4 h-4 text-slate-600" />;
      case 'next_class':
        return <Clock className="w-4 h-4 text-emerald-600" />;
      case 'break_time':
        return <Coffee className="w-4 h-4 text-cyan-600" />;
      case 'reminder':
        return <AlertCircle className="w-4 h-4 text-pink-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const getNotifBadgeColor = (type: NotificationType) => {
    switch (type) {
      case 'class_shift': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'class_end': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'next_class': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'break_time': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'reminder': return 'bg-pink-100 text-pink-800 border-pink-200';
    }
  };

  const getNotifLabel = (type: NotificationType) => {
    switch (type) {
      case 'class_shift': return 'Class Shift';
      case 'class_end': return 'Class End';
      case 'next_class': return 'Next Class';
      case 'break_time': return 'Break Time';
      case 'reminder': return 'Reminder';
    }
  };

  const handleCustomBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;
    onTriggerNotification(customType, customTitle, customMsg || undefined);
    setCustomTitle('');
    setCustomMsg('');
  };

  return (
    <>
      {/* Floating Active Toast Alert (Appears on top right corner for immediate feedback) */}
      {activeToast && (
        <div 
          id="active-floating-toast"
          className="fixed top-20 right-4 z-50 max-w-md w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 animate-in slide-in-from-top duration-200 flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
            {getNotifIcon(activeToast.type)}
          </div>
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getNotifBadgeColor(activeToast.type)}`}>
                {getNotifLabel(activeToast.type)}
              </span>
              <span className="text-[10px] text-slate-400">Live Campus Broadcast</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">{activeToast.title}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeToast.message}</p>
          </div>
          <button
            onClick={onDismissToast}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          id="notification-center-overlay"
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        >
          {/* Drawer Sidebar */}
          <div 
            id="notification-center-drawer"
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Campus Notification Center</h3>
                  <p className="text-xs text-slate-400">Class Shift • End • Next • Break • Reminders</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Trigger Simulator Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Test Specific Pop-up Triggers (Requirement #9)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs font-semibold">
                <button
                  id="btn-drawer-shift"
                  onClick={() => onTriggerNotification('class_shift')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-amber-800 text-left transition-colors"
                >
                  🔄 Class Shift
                </button>
                <button
                  id="btn-drawer-end"
                  onClick={() => onTriggerNotification('class_end')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-slate-800 text-left transition-colors"
                >
                  🔔 Class End
                </button>
                <button
                  id="btn-drawer-next"
                  onClick={() => onTriggerNotification('next_class')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-800 text-left transition-colors"
                >
                  ⏰ Next Class
                </button>
                <button
                  id="btn-drawer-break"
                  onClick={() => onTriggerNotification('break_time')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50 text-cyan-800 text-left transition-colors"
                >
                  ☕ Break Time
                </button>
                <button
                  id="btn-drawer-reminder"
                  onClick={() => onTriggerNotification('reminder')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-pink-400 hover:bg-pink-50 text-pink-800 text-left transition-colors col-span-2 sm:col-span-1"
                >
                  📌 Reminder
                </button>
              </div>
            </div>

            {/* Notification List Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                <span>Recent Broadcasts ({notifications.length})</span>
                <button
                  onClick={onMarkAllAsRead}
                  className="text-emerald-700 hover:underline font-semibold"
                >
                  Mark all as read
                </button>
              </div>

              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    notif.read 
                      ? 'bg-white border-slate-200 text-slate-600' 
                      : 'bg-emerald-50/40 border-emerald-300 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getNotifBadgeColor(notif.type)}`}>
                      {getNotifLabel(notif.type)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{notif.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                </div>
              ))}
            </div>

            {/* Faculty Broadcast Custom Sender */}
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <div className="text-xs font-bold text-slate-700 mb-2">Broadcast Custom Notification</div>
              <form onSubmit={handleCustomBroadcast} className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as NotificationType)}
                    className="p-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="class_shift">Class Shift</option>
                    <option value="class_end">Class End</option>
                    <option value="next_class">Next Class</option>
                    <option value="break_time">Break Time</option>
                    <option value="reminder">Reminder</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Alert Title..."
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="flex-1 p-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Alert message details..."
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    className="flex-1 p-1.5 text-xs rounded-lg border border-slate-300"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
