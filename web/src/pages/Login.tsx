import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useAuthReducer } from '../hooks/useAuthReducer';
const Login = () => {
  const { user } = useAuthReducer(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      navigate('/bookmarks');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
};

export default Login;
