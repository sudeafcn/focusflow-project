import { useState, useEffect } from 'react';
import '../Button/Button.scss';

interface TimerProps {
  taskCount?: number;
}

export default function Timer({ taskCount = 0 }: TimerProps) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsLeft, setSessionsLeft] = useState(0);

  // Görev eklendiğinde veya silindiğinde Timer'ı güncelle
  useEffect(() => {
    if (taskCount > 0 && sessionsLeft === 0) {
      setSessionsLeft(4); // İlk görev eklendiğinde varsayılan 4 seansı tanımla
    } else if (taskCount === 0) {
      setSessionsLeft(0);
      setIsActive(false);
      setSeconds(25 * 60);
    }
  }, [taskCount]);

  useEffect(() => {
    let interval: any = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
      setSessionsLeft((prev) => (prev > 0 ? prev - 1 : 0));

      if (sessionsLeft <= 1) {
        alert("Tebrikler! Tüm odaklanma seanslarını tamamladın.");
      } else {
        alert("Süre doldu! Bir odaklanma seansını başarıyla tamamladın. Lütfen mola ver.");
        setSeconds(25 * 60);
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

      {/* Görev Yoksa Uyarı, Varsa Seans Sayısı Göster */}
      {taskCount === 0 ? (
         <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem', opacity: 0.8, color: '#ef4444', fontWeight: '500' }}>
            ⏳ Süreyi başlatmak için aşağıdan görev ekleyin
         </h3>
      ) : (
         <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', opacity: 0.8, fontWeight: '500' }}>
            Kalan Seans: {sessionsLeft}
         </h3>
      )}

      {/* Sayaç Görünümü (Görev yoksa soluklaşır) */}
      <h2 style={{ fontSize: '3rem', margin: '0 0 20px 0', fontWeight: 'bold', opacity: taskCount === 0 ? 0.4 : 1 }}>
        {formatTime(seconds)}
      </h2>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          className="btn"
          onClick={toggleTimer}
          disabled={taskCount === 0 || sessionsLeft === 0}
          style={{ opacity: taskCount === 0 ? 0.5 : 1, cursor: taskCount === 0 ? 'not-allowed' : 'pointer' }}
        >
          {isActive ? 'Durdur' : 'Başlat'}
        </button>

        <button
          className="btn btn-danger"
          onClick={resetTimer}
          disabled={taskCount === 0}
          style={{ opacity: taskCount === 0 ? 0.5 : 1, cursor: taskCount === 0 ? 'not-allowed' : 'pointer' }}
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}