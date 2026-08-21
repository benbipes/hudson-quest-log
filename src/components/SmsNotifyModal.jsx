import React, { useState } from 'react';
import { X, Send, Phone, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { DAD_PHONE_NUMBER, generateSmsUrl, createProgressSmsMessage, sendTwilioSms } from '../utils/sms.js';

export default function SmsNotifyModal({ 
  isOpen, 
  onClose, 
  dateStr, 
  completedCount, 
  totalCount, 
  completedTitles, 
  streak,
  twilioConfig,
  onSaveTwilioConfig
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('direct'); // 'direct' or 'twilio'
  const [sid, setSid] = useState(twilioConfig?.accountSid || '');
  const [token, setToken] = useState(twilioConfig?.authToken || '');
  const [fromNum, setFromNum] = useState(twilioConfig?.fromNumber || '');
  
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const smsText = createProgressSmsMessage(dateStr, completedCount, totalCount, completedTitles, streak);
  const smsUrl = generateSmsUrl(DAD_PHONE_NUMBER, smsText);

  const handleSendTwilio = async () => {
    setSending(true);
    setStatusMsg({ type: '', text: '' });
    try {
      await sendTwilioSms({
        accountSid: sid,
        authToken: token,
        fromNumber: fromNum,
        toNumber: DAD_PHONE_NUMBER,
        body: smsText
      });
      setStatusMsg({ type: 'success', text: '✅ SMS alert successfully sent to Dad at ' + DAD_PHONE_NUMBER + '!' });
      onSaveTwilioConfig({ accountSid: sid, authToken: token, fromNumber: fromNum });
    } catch (err) {
      setStatusMsg({ type: 'error', text: '❌ Failed to send SMS: ' + err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-4 border-yellow-400 rounded-3xl max-w-lg w-full p-6 shadow-[10px_10px_0px_0px_rgba(250,204,21,1)] relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 border-2 border-black text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-600 rounded-2xl border-2 border-black text-white">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-yellow-400 uppercase tracking-wide">
              NOTIFY DAD (SMS ALERT)
            </h3>
            <p className="text-slate-300 text-xs font-bold">
              Target Phone Number: <span className="text-white underline">{DAD_PHONE_NUMBER}</span>
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b-2 border-slate-800 mb-5">
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-2 font-black text-xs sm:text-sm text-center border-b-4 transition-colors ${
              activeTab === 'direct' 
                ? 'border-yellow-400 text-yellow-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📱 1-Click Phone SMS
          </button>
          <button
            onClick={() => setActiveTab('twilio')}
            className={`flex-1 py-2 font-black text-xs sm:text-sm text-center border-b-4 transition-colors ${
              activeTab === 'twilio' 
                ? 'border-yellow-400 text-yellow-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Automated Twilio API
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-yellow-500/40 mb-5">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> SMS Preview
            </span>
            <span>Target: {DAD_PHONE_NUMBER}</span>
          </div>
          <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
            {smsText}
          </pre>
        </div>

        {/* Tab 1: Direct Phone SMS */}
        {activeTab === 'direct' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Clicking below will open your device's Messages app with the pre-filled progress update ready to send to <strong>{DAD_PHONE_NUMBER}</strong>.
            </p>
            <a
              href={smsUrl}
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-center rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-transform active:translate-y-0.5"
            >
              <Send className="w-5 h-5 fill-black" />
              <span>OPEN MESSAGES & SEND TO DAD</span>
            </a>
          </div>
        )}

        {/* Tab 2: Twilio Integration */}
        {activeTab === 'twilio' && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Twilio Account SID:</label>
              <input
                type="text"
                value={sid}
                onChange={e => setSid(e.target.value)}
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Auth Token:</label>
              <input
                type="password"
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder="Your Twilio Auth Token"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Twilio From Phone Number:</label>
              <input
                type="text"
                value={fromNum}
                onChange={e => setFromNum(e.target.value)}
                placeholder="+15005550006"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            {statusMsg.text && (
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                statusMsg.type === 'success' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-red-950 border-red-500 text-red-300'
              }`}>
                {statusMsg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <button
              onClick={handleSendTwilio}
              disabled={sending || !sid || !token || !fromNum}
              className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{sending ? 'SENDING SMS...' : 'DISPATCH SMS VIA TWILIO API'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
