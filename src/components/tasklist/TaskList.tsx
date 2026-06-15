import React from 'react';
import { Button } from '../Button/Button';
import './TaskList.scss';

export interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  pomodoros: number;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
  activeTaskId?: string | null;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onSelectActiveTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, activeTaskId, onDeleteTask, onToggleComplete, onSelectActiveTask }) => {
  const getPriorityInfo = (prio: string) => {
    switch (prio) {
      case 'high': return { label: '🔥 Yüksek', color: '#ef4444' };
      case 'medium': return { label: '⚡ Orta', color: '#f59e0b' };
      case 'low': return { label: '🧊 Düşük', color: '#3b82f6' };
      default: return { label: 'Belirsiz', color: '#64748b' };
    }
  };

  return (
    <div className="ff-task-list-card">
      
      {/* --- NÜKLEER ÇÖZÜM: BİLEŞEN İÇİ MOBİL CSS ENJEKSİYONU --- */}
      <style>
        {`
          @media screen and (max-width: 768px) {
            .ff-task-item {
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              gap: 16px !important;
              padding: 16px !important;
            }
            .ff-task-info {
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              width: 100% !important;
              gap: 10px !important;
            }
            .ff-task-meta {
              justify-content: center !important;
              flex-wrap: wrap !important;
              width: 100% !important;
            }
            .ff-task-actions {
              display: flex !important;
              flex-direction: column !important;
              width: 100% !important;
              gap: 10px !important;
              margin-top: 5px !important;
            }
            .ff-task-actions button {
              width: 100% !important;
              margin: 0 !important;
              padding: 12px !important;
              font-size: 15px !important;
              white-space: normal !important;
              border-radius: 8px !important;
            }
          }
        `}
      </style>

      <h3 className="ff-list-title">📋 Yapay Zeka Akışındaki Görevler ({tasks.length})</h3>
      
      {tasks.length === 0 ? (
        <p className="ff-empty-message">Şu an akışta aktif görev yok. Yukarıdaki AI motoruna bir görev yazın! ✨</p>
      ) : (
        <div className="ff-tasks-container">
          {tasks.map((task) => {
            const prioInfo = getPriorityInfo(task.priority);
            const isActive = activeTaskId === task.id;

            return (
              <div key={task.id} className={`ff-task-item ${task.isCompleted ? 'is-completed' : ''} ${isActive ? 'is-active-task' : ''}`}>
                <div className="ff-task-info">
                  <span className="ff-task-item-title">{task.title}</span>
                  <div className="ff-task-meta">
                    <span className="ff-task-item-category" style={{ color: prioInfo.color, fontWeight: 'bold' }}>
                      {prioInfo.label}
                    </span>
                    <span className="ff-task-pomodoro-badge">
                      {task.pomodoros > 0 ? `⏳ Kalan: ${task.pomodoros} Seans` : '✅ Görev Bitti'}
                    </span>
                  </div>
                </div>
                <div className="ff-task-actions">
                  {!task.isCompleted && (
                    <Button 
                      variant={isActive ? 'primary' : 'secondary'} 
                      size="sm" 
                      onClick={() => onSelectActiveTask(task.id)}
                    >
                      {isActive ? '🎯 Odaklanılıyor' : 'Buna Odaklan'}
                    </Button>
                  )}
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => onToggleComplete(task.id)}
                    style={{ borderColor: task.isCompleted ? '#94a3b8' : '#10b981', color: task.isCompleted ? '#94a3b8' : '#10b981' }}
                  >
                    {task.isCompleted ? 'Geri Al' : 'Tamamla ✓'}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => onDeleteTask(task.id)} style={{ color: '#ef4444' }}>Sil</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};