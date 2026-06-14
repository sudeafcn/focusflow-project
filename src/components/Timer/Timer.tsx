import { useState, useEffect } from 'react';
import '../Button/Button.scss';

interface TimerProps {
  sessionsLeft: number; // Aktif görevin kalan seans sayısı
  onSessionComplete: () => void; // Süre bittiğinde tetiklenecek fonksiyon
}

export default function Timer({ sessionsLeft, onSessionComplete }: TimerProps) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Eğer kalan seans 0 ise veya görev silindiyse sayacı durdur ve sıfırla
  useEffect(() => {
    if (sessionsLeft === 0) {
      setIsActive(false);
      setSeconds(25 * 60);
    }
  }, [sessionsLeft]);

  useEffect(() => {
    let interval: any = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
      
      // App.tsx'teki görevin seans sayısını 1 düşürmesi için tetikliyoruz
      onSessionComplete();

      if (sessionsLeft <= 1) {
        alert("Tebrikler! Bu görevin tüm odaklanma seanslarını tamamladın. 🎉");
      } else {
        alert("Süre doldu! Bir seansı başarıyla tamamladın. Kısa bir mola ver.");
        setSeconds(25 * 60); // Yeni seans için süreyi yenile
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, sessionsLeft, onSessionComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(25 * 60);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="timer-container" style={{ textAlign: 'center', padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: '12px' }}>
      
      {/* Görev yoksa uyarı ver, varsa o görevin seans sayısını göster */}
      {sessionsLeft === 0 ? (
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem', opacity: 0.8, color: '#ef4444', fontWeight: '500' }}>
          ⏳ Süreyi başlatmak için aşağıdan bir görev ekleyin
        </h3>
      ) : (
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', opacity: 0.8, fontWeight: '500' }}>
          Kalan Seans: {sessionsLeft}
        </h3>
      )}

      <h2 style={{ fontSize: '3rem', margin: '0 0 20px 0', fontWeight: 'bold', opacity: sessionsLeft === 0 ? 0.4 : 1 }}>
        {formatTime(seconds)}
      </h2>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          className="btn"
          onClick={toggleTimer}
          disabled={sessionsLeft === 0}
          style={{ opacity: sessionsLeft === 0 ? 0.5 : 1, cursor: sessionsLeft === 0 ? 'not-allowed' : 'pointer' }}
        >
          {isActive ? 'Durdur' : 'Başlat'}
        </button>

        <button
          className="btn btn-danger"
          onClick={resetTimer}
          disabled={sessionsLeft === 0}
          style={{ opacity: sessionsLeft === 0 ? 0.5 : 1, cursor: sessionsLeft === 0 ? 'not-allowed' : 'pointer' }}
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}