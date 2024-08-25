import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Import your Supabase client
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle logout
    const handleLogout = async () => {
      // Invalidate the Supabase session
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error);
      }

      // Remove the token from cookies
      Cookies.remove('token');

      // Redirect the user to the login page
      navigate('/login');
    };

    handleLogout();
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;

