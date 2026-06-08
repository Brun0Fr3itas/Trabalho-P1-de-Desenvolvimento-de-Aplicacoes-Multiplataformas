import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import githubLogo from './assets/github-logo.png';

export default function GitHubLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const correctUser = "Bruno";
  const correctPass = "1234";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
  };

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      if (username === correctUser && password === correctPass) {
        setMessage({ type: 'success', text: 'Login realizado com sucesso!' });
        alert("Bem-vindo ao GitHub!");
      } else {
        setMessage({ type: 'error', text: 'Incorrect username or password. ❌' });
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading, username, password]);

  const handleSocialLogin = (provider) => {
    alert(`Continuing with ${provider}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img src={githubLogo} alt="GitHub" className={styles.logo} />
        
        <h1 className={styles.title}>Sign in to GitHub</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Username or email address</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              disabled={isLoading}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label>Password</label>
              <a href="#" className={styles.forgot}>Forgot password?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              disabled={isLoading}
              required
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          {message.text && (
            <p className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </p>
          )}
        </form>

        <div className={styles.divider}>or</div>

        <div className={styles.socialButtons}>
          <button onClick={() => handleSocialLogin('Google')} className={styles.socialButton}>
            <img src="src\assets\google-logo-search-new-svgrepo-com.svg" alt="Google" />
            Continue with Google
          </button>
          <button onClick={() => handleSocialLogin('Apple')} className={styles.socialButton}>
            <img src="src\assets\Apple_logo_white.svg.png" alt="Apple" />
            Continue with Apple
          </button>
        </div>

        <div className={styles.signup}>
          New to GitHub? <a href="#">Create an account</a>
        </div>

        <div className={styles.passkey}>
          <a href="#">Sign in with a passkey</a>
        </div>
      </div>

      <footer className={styles.footerBottom}>
        <div className={styles.footerLinks}>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Docs</a>
          <a href="#">Contact GitHub Support</a>
          <a href="#">Manage cookies</a>
          <a href="#">Do not share my personal information</a>
        </div>
      </footer>
    </div>
  );
}