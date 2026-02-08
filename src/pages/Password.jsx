import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Password.css';

function Password() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const correctCode = '0719'; // July 19 (MMDD)

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }

    // Check if all digits are filled
    if (index === 3 && value) {
      const enteredCode = newCode.join('');
      if (enteredCode === correctCode) {
        // Correct code!
        setTimeout(() => {
          navigate('/timeline');
        }, 500);
      } else {
        // Wrong code
        setError(true);
        setShaking(true);
        setTimeout(() => {
          setCode(['', '', '', '']);
          setShaking(false);
          document.getElementById('code-0').focus();
        }, 500);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
    setCode(newCode);

    if (pastedData.length === 4) {
      if (pastedData === correctCode) {
        setTimeout(() => {
          navigate('/timeline');
        }, 500);
      } else {
        setError(true);
        setShaking(true);
        setTimeout(() => {
          setCode(['', '', '', '']);
          setShaking(false);
          document.getElementById('code-0').focus();
        }, 500);
      }
    } else {
      document.getElementById(`code-${pastedData.length}`).focus();
    }
  };

  return (
    <div className="password-page">
      <div className="pixel-bg"></div>
      
      <div className="password-content">
        <div className="lock-icon">🔒</div>
        
        <h1 className="pixel-title">Enter Passcode</h1>
        
        <p className="password-hint">Hint: Our Monthsary (MMDD)</p>
        
        <div className={`code-input-container ${shaking ? 'shake' : ''} ${error ? 'error' : ''}`}>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="tel"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="code-digit"
              autoFocus={index === 0}
              inputMode="numeric"
              pattern="\d*"
            />
          ))}
        </div>

        {error && (
          <p className="error-message pixel-text">❌ Wrong Code! Try Again</p>
        )}

        <div className="hearts-decoration">
          <span>💕</span>
          <span>💖</span>
          <span>💕</span>
        </div>
      </div>
    </div>
  );
}

export default Password;
