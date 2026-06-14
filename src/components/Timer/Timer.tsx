import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import type { Task } from '../tasklist/TaskList';
import './Timer.scss';

interface TimerProps {
  activeTask?: Task | null;
  onSessionComplete?: (taskId: string) => void;
}

export const Timer: React.FC<TimerProps> = ({ activeTask, onSessionComplete }) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      
      if (mode === 'work') {
        // Çalışma bitti, görevden 1 seans düş ve Molaya geç
        if (activeTask && onSessionComplete) {
          onSessionComplete(activeTask.id);
        }
        setMode('break');
        setTimeLeft(5 * 60);
        alert('🎉 Harika! 1 Seans bitti. Şimdi 5 dakika mola zamanı ☕');
      } else {
        // Mola bitti, Çalışmaya geri dön
        setMode('work');
        setTimeLeft(25 * 60);
        alert('🔔 Mola bitti! Yeni bir odaklanma seansına hazır mısın? 🚀');
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, activeTask, onSessionComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="ff-timer-container">
      <div className="ff-timer-header">
        <span className="ff-timer-icon">{mode === 'work' ? '⏱️' : '☕'}</span>
        <h4>{mode === 'work' ? 'Odaklanma Modu' : 'Mola Zamanı'}</h4>
      </div>

      {/* AKTİF GÖREV GÖSTERGESİ */}
      <div className="ff-active-task-display">
        {activeTask ? (
          <p>Şu an odaklanılan görev:<br/><strong>{activeTask.title}</strong></p>
        ) : (
          <p><em>Önce listeden bir göreve odaklanın.</em></p>
        )}
      </div>

      <div className="ff-timer-modes">
        <button className={`ff-mode-btn ${mode === 'work' ? 'active' : ''}`} onClick={() => switchMode('work')}>Çalışma (25m)</button>
        <button className={`ff-mode-btn ${mode === 'break' ? 'active' : ''}`} onClick={() => switchMode('break')}>Mola (5m)</button>
      </div>

      <div className={`ff-timer-display ${isRunning ? 'is-running' : ''} ${mode === 'break' ? 'is-break' : ''}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <div className="ff-timer-actions">
        <Button variant={mode === 'work' ? 'primary' : 'secondary'} size="md" onClick={toggleTimer}>
          {isRunning ? 'Duraklat' : 'Başlat'}
        </Button>
        <Button variant="secondary" size="md" onClick={resetTimer}>Sıfırla</Button>
      </div>
    </div>
  );
};