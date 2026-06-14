// src/components/Timer/Timer.tsx

import { useState, useEffect } from 'react';
import '../Button/Button.scss'; // Buton stillerini içeri aktarıyoruz

export default function Timer() {
  const [seconds, setSeconds] = useState(25 * 60); // 25 Dakika
  const [isActive, setIsActive] = useState(false);
  const [sessionsLeft, setSessionsLeft] = useState(4); // Başlangıç seans sayısı

  useEffect(() => {
    let interval: any = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      // Süre bittiğinde çalışacak işlemler:
      setIsActive(false);
      clearInterval(interval);
      setSessionsLeft((prev) => (prev > 0 ? prev - 1 : 0)); // Seansı 1 düşür (0'dan aşağı inmesin)
      
      // Eğer seans 0 olduysa farklı, olmadıysa farklı mesaj ver:
      if (sessionsLeft === 1) {
        alert("Tebrikler! Tüm odaklanma seanslarını tamamladın.");
      } else {
        alert("Süre doldu! Bir odaklanma seansını başarıyla tamamladın. Lütfen mola ver.");
        setSeconds(25 * 60); // Bir sonraki seans için süreyi otomatik 25 dakikaya kur
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, sessionsLeft]);

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
      
      {/* Kalan Seans Sayısını Gösteren Başlık */}
      <h3 style={{ margin: '0', fontSize: '1.2rem', opacity: 0.8, fontWeight: '500' }}>
        Kalan Seans: {sessionsLeft}
      </h3>
      
      <h2 style={{ fontSize: '3rem', margin: '15px 0', fontWeight: 'bold' }}>
        {formatTime(seconds)}
      </h2>
      
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button 
          className="btn" 
          onClick={toggleTimer} 
          disabled={sessionsLeft === 0} // Eğer seans bittiyse Başlat butonunu devre dışı bırak
        >
          {isActive ? 'Durdur' : 'Başlat'}
        </button>
        
        <button 
          className="btn" 
          style={{ backgroundColor: '#ef4444' }} 
          onClick={resetTimer}
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}