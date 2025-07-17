import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/bookmarks');
    }
  }, [user, navigate]);

  return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
};

export default Register;
