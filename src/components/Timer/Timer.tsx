import { useState, useEffect, useRef } from 'react';
import '../Button/Button.scss';

interface TimerProps {
  sessionsLeft: number;
  onSessionComplete: () => void;
}

export default function Timer({ sessionsLeft, onSessionComplete }: TimerProps) {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // --- YENİ: ARKA PLAN UYKU SORUNUNU ÇÖZEN ZAMAN HAFIZASI ---
  const lastTickRef = useRef<number | null>(null);

  // Görev bittiğinde sıfırlama
  useEffect(() => {
    if (sessionsLeft === 0) {
      setIsActive(false);
      setMode('work');
      setSeconds(25 * 60);
    }
  }, [sessionsLeft]);

  // Sayaç ve Gerçek Zaman Hesaplaması
  useEffect(() => {
    let interval: any = null;

    if (isActive && seconds > 0) {
      // Sayacı başlattığımızda o anki gerçek saati hafızaya alıyoruz
      if (!lastTickRef.current) {
        lastTickRef.current = Date.now();
      }

      interval = setInterval(() => {
        const now = Date.now();
        // Sadece 1 çıkarmak yerine, geçen GERÇEK saniyeyi (Delta Time) hesaplıyoruz
        const deltaSeconds = Math.round((now - (lastTickRef.current || now)) / 1000);

        if (deltaSeconds >= 1) {
          setSeconds((prev) => {
            const nextSeconds = prev - deltaSeconds;
            return nextSeconds > 0 ? nextSeconds : 0; // Süre eksiye düşerse 0'a sabitle
          });
          lastTickRef.current = now; // Hafızayı son sayım zamanı ile güncelle
        }
      }, 1000);
    } else {
      // Duraklatılırsa hafızayı temizle
      lastTickRef.current = null;
    }

    // Süre Sıfırlandığında Mod Geçişleri
    if (seconds === 0 && isActive) {
      setIsActive(false);
      lastTickRef.current = null;
      
      if (mode === 'work') {
        onSessionComplete();
        if (sessionsLeft > 1) {
          alert("Harika! Bir odaklanma seansını tamamladın. Şimdi 5 dakikalık mola zamanı! ☕");
          setMode('break');
          setSeconds(5 * 60);
        } else {
          alert("Tebrikler! Bu görevin tüm seanslarını başarıyla bitirdin! 🎉");
          setMode('work');
          setSeconds(25 * 60);
        }
      } else {
        alert("Mola bitti! Yeni bir odaklanma seansına hazır mısın? 🚀");
        setMode('work');
        setSeconds(25 * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, sessionsLeft, mode, onSessionComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (isActive) lastTickRef.current = null; // Duraklatılınca zamanı dondur
  };
  
  const resetTimer = () => {
    setIsActive(false);
    lastTickRef.current = null;
    setMode('work');
    setSeconds(25 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    lastTickRef.current = null;
    setSeconds(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="timer-container" style={{ textAlign: 'center', padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: '12px' }}>
      
      {sessionsLeft === 0 ? (
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem', opacity: 0.8, color: '#ef4444', fontWeight: '500' }}>
          ⏳ Süreyi başlatmak için aşağıdan bir görev ekleyin
        </h3>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
          <h3 style={{ margin: '0', fontSize: '1.2rem', opacity: 0.8, fontWeight: '500' }}>
            Kalan Seans: {sessionsLeft}
          </h3>
          
          <div style={{ display: 'flex', gap: '5px', backgroundColor: '#e5e7eb', padding: '4px', borderRadius: '8px' }}>
            <button 
              onClick={() => switchMode('work')}
              style={{ 
                padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem',
                backgroundColor: mode === 'work' ? '#3b82f6' : 'transparent',
                color: mode === 'work' ? 'white' : '#4b5563',
                transition: 'all 0.2s'
              }}
            >
              Çalışma
            </button>
            <button 
              onClick={() => switchMode('break')}
              style={{ 
                padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem',
                backgroundColor: mode === 'break' ? '#10b981' : 'transparent',
                color: mode === 'break' ? 'white' : '#4b5563',
                transition: 'all 0.2s'
              }}
            >
              Mola
            </button>
          </div>
        </div>
      )}

      <h2 style={{ 
        fontSize: '3.5rem', 
        margin: '0 0 20px 0', 
        fontWeight: 'bold', 
        opacity: sessionsLeft === 0 ? 0.4 : 1, 
        color: mode === 'break' ? '#10b981' : 'inherit',
        transition: 'color 0.3s'
      }}>
        {formatTime(seconds)}
      </h2>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          className="btn"
          onClick={toggleTimer}
          disabled={sessionsLeft === 0}
          style={{ 
            opacity: sessionsLeft === 0 ? 0.5 : 1, 
            cursor: sessionsLeft === 0 ? 'not-allowed' : 'pointer', 
            backgroundColor: mode === 'break' ? '#10b981' : '#3b82f6',
            color: 'white'
          }}
        >
          {isActive ? 'Durdur' : 'Başlat'}
        </button>

        <button
          className="btn"
          onClick={resetTimer}
          disabled={sessionsLeft === 0}
          style={{ 
            opacity: sessionsLeft === 0 ? 0.5 : 1, 
            cursor: sessionsLeft === 0 ? 'not-allowed' : 'pointer',
            backgroundColor: '#ef4444',
            color: 'white'
          }}
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}