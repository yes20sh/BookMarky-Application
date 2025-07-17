import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useAuthReducer } from '../hooks/useAuthReducer'; 

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuthReducer(); 

  useEffect(() => {
    if (user?.userId) {
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
