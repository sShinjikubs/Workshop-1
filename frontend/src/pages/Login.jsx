import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { api } from '../api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login(username, password);
      const data = await res.json();
      if (res.ok && data.success) {
        const userData = data.user || { username: data.username, role: data.role };
        login({ username: userData.username, role: userData.role });
        if (userData.role === 'admin') navigate('/admin');
        else if (userData.role === 'manager') navigate('/manager');
        else navigate('/');
      } else {
        setError(data.error || data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-split-layout">
      {/* Left Side: Brand Imagery */}
      <div 
        className="login-left-side"
        style={{ backgroundColor: '#080a0f', position: 'relative', overflow: 'hidden' }}
      >
        <div className="login-left-overlay"></div>

        {/* Product Image Collage */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          {/* Radial glow behind products */}
          <div style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(197,168,128,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
          }} />

          {/* Main center product - Sony WH-1000XM5 */}
          <img
            src="/images/audio/sony-wh1000xm5.png"
            alt="Sony WH-1000XM5"
            style={{
              position: 'absolute',
              width: '260px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -60%)',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
              animation: 'loginFloat 6s ease-in-out infinite',
            }}
          />

          {/* Left product - Marshall Stanmore */}
          <img
            src="/images/audio/marshall-stanmore.png"
            alt="Marshall"
            style={{
              position: 'absolute',
              width: '160px',
              bottom: '28%',
              left: '6%',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.7))',
              opacity: 0.85,
              animation: 'loginFloat 7s ease-in-out infinite 1s',
            }}
          />

          {/* Right product - Bose QC Ultra */}
          <img
            src="/images/audio/bose-quietcomfort.png"
            alt="Bose"
            style={{
              position: 'absolute',
              width: '150px',
              bottom: '26%',
              right: '6%',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.7))',
              opacity: 0.85,
              animation: 'loginFloat 5s ease-in-out infinite 0.5s',
            }}
          />

          {/* Top small product - Apple AirPods */}
          <img
            src="/images/audio/apple-airpods-pro2.png"
            alt="Apple AirPods"
            style={{
              position: 'absolute',
              width: '110px',
              top: '14%',
              right: '18%',
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.6))',
              opacity: 0.8,
              animation: 'loginFloat 8s ease-in-out infinite 2s',
            }}
          />
        </div>

        <div className="login-left-content">
          <div className="login-logo">
            Audio<span>Mart</span>
          </div>
        </div>
        <div className="login-slogan">
          <h1>Pure Sound Experience</h1>
          <p>Discover high-fidelity speakers and wireless headphones. Pristine audio engineering and immersive sound in every note.</p>
          <div className="login-brands-tags">
            <span>MARSHALL</span>
            <span>|</span>
            <span>SONY</span>
            <span>|</span>
            <span>BOSE</span>
            <span>|</span>
            <span>APPLE</span>
            <span>|</span>
            <span>JBL</span>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="login-right-side">
        <div className="login-form-container">
          <h2 className="login-title-minimal">Log in</h2>
          
          {error && <div className="error-message" style={{ marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="login-input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="login-btn-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            <button 
              type="button" 
              className="login-btn-guest" 
              onClick={() => navigate('/')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                color: 'var(--accent-gold, #c5a880)',
                border: '1px solid var(--accent-gold, #c5a880)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: "'Oswald', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '0.8rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              เข้าโดยไม่ต้องเข้าสู่ระบบ
            </button>
          </form>

          <div className="login-form-footer">
            Don't have an account?{' '}
            <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
