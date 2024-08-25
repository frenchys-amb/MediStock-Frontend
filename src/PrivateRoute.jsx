import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Import your Supabase client

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check if user is authenticated
  const session = supabase.auth.session(); // Adjust based on your authentication logic

  return (
    <Route
      {...rest}
      element={session ? Component : <Navigate to="/" />} // Redirect to login if not authenticated
    />
  );
};

export default PrivateRoute;
