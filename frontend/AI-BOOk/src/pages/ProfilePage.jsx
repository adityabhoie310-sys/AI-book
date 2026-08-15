import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { Key, Save, ShieldCheck, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateApiKey } = useAuth();
  const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || '');
  const [loading, setLoading] = useState(false);

  const handleSaveKey = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateApiKey(geminiApiKey);
    setLoading(false);
    toast.success('Gemini API Key updated successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user?.name || 'Author'}</h1>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <span className="inline-block mt-1 bg-orange-50 text-orange-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-orange-100">
              eBook Creator Pro Member
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Google Gemini API Settings</h2>
              <p className="text-xs text-gray-500">Configure your personal Gemini API Key for unlimited outline and chapter generation.</p>
            </div>
          </div>

          <form onSubmit={handleSaveKey} className="space-y-4">
            <InputField
              label="Google Gemini API Key"
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy..."
            />

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                How to get a free Google Gemini API Key:
              </div>
              <ol className="list-decimal list-inside space-y-1 pl-1">
                <li>Visit Google AI Studio key portal at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-orange-600 underline font-medium">aistudio.google.com <ExternalLink className="inline w-3 h-3" /></a></li>
                <li>Click <strong>"Create API Key"</strong></li>
                <li>Copy and paste your key above to enable real-time AI chapter generation!</li>
              </ol>
            </div>

            <Button
              type="submit"
              variant="primary"
              icon={Save}
              isLoading={loading}
            >
              Save API Settings
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
