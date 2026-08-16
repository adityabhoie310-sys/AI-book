import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { BookOpen, User, Mail, Lock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please complete all required fields');
      return;
    }

    setLoading(true);
    const result = await signup(formData.name, formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/50 via-white to-purple-50/30 font-display flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-purple-100 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create Creator Account</h2>
          <p className="text-xs text-gray-500">Start writing AI eBooks in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            type="text"
            name="name"
            icon={User}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alex Rivera"
            required
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            icon={Mail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="author@example.com"
            required
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            icon={Lock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Min 6 characters"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Sparkles}
            isLoading={loading}
            className="w-full text-sm font-semibold shadow-purple-500/25"
          >
            Create Free Account
          </Button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
