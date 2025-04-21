import React, { useState } from "react";
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let result;
      if (isLogin) {
        result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) {
          setError(result.error.message);
        } else {
          navigate('/');
        }
      } else {
        result = await supabase.auth.signUp({ email, password });
        if (result.error) {
          setError(result.error.message);
        } else {
          setShowSignupModal(true);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) setError(error.message);
      // Supabase will redirect on success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center pt-10 pb-10 px-2">
      {/* Signup confirmation modal */}
      {showSignupModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-accent2/30 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-2">Check your inbox for a login link!</h3>
            <button
              className="mt-2 bg-accent2 text-white font-semibold py-2 px-6 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setShowSignupModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form
        className="w-full max-w-md md:max-w-lg sm:max-w-full bg-card rounded-2xl shadow-card p-8 sm:p-4 flex flex-col gap-6 border border-accent2/20 mx-auto items-stretch"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-extrabold mb-6 mt-8 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg bg-background border border-accent2/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent2"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg bg-background border border-accent2/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent2"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-accent2 text-white font-semibold py-3 rounded-lg hover:bg-accent transition-colors shadow-md"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 mt-4 bg-white text-blue-600 font-semibold py-3 rounded-lg border border-accent2/30 shadow-sm hover:bg-accent2/10 transition-colors"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_17_40)">
              <path d="M47.532 24.552c0-1.64-.148-3.2-.424-4.68H24.48v9.12h12.928c-.56 3.04-2.24 5.6-4.768 7.36v6.08h7.712c4.56-4.2 7.184-10.4 7.184-17.88z" fill="#4285F4"/>
              <path d="M24.48 48c6.48 0 11.92-2.16 15.888-5.88l-7.712-6.08c-2.16 1.44-4.96 2.32-8.176 2.32-6.32 0-11.68-4.28-13.6-10.04h-7.92v6.32C7.48 43.52 15.28 48 24.48 48z" fill="#34A853"/>
              <path d="M10.88 28.4a13.8 13.8 0 0 1 0-8.8v-6.32h-7.92a24.06 24.06 0 0 0 0 21.44l7.92-6.32z" fill="#FBBC05"/>
              <path d="M24.48 9.52c3.52 0 6.64 1.2 9.12 3.52l6.8-6.8C36.4 2.08 30.96 0 24.48 0 15.28 0 7.48 4.48 2.96 11.28l7.92 6.32c1.92-5.76 7.28-10.04 13.6-10.04z" fill="#EA4335"/>
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <path fill="#fff" d="M0 0h48v48H0z"/>
              </clipPath>
            </defs>
          </svg>
          Continue with Google
        </button>
        {error && <div className="text-red-500 text-center text-sm mb-2">{error}</div>}
        <div className="text-center mt-2">
          {isLogin ? (
            <span className="text-muted text-sm">Don't have an account?{' '}
              <button type="button" className="text-accent2 underline" onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
            </span>
          ) : (
            <span className="text-muted text-sm">Already have an account?{' '}
              <button type="button" className="text-accent2 underline" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
