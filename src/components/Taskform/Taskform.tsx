import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../select/Select';
import './TaskForm.scss';

interface TaskFormProps {
  onAddTask: (title: string, category: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('is');

  const kategoriSeçenekleri = [
    { value: 'is', label: '💻 İş / Yazılım' },
    { value: 'kisisel', label: '🏠 Kişisel' },
    { value: 'saglik', label: '🍏 Sağlık / Spor' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    
    onAddTask(taskTitle, category);
    setTaskTitle(''); // Formu temizle
  };

  return (
    <form className="ff-task-form" onSubmit={handleSubmit}>
      <h3 className="ff-form-title">🚀 Yeni Görev Akışı Başlat</h3>
      
      <Input 
        label="Görev Başlığı" 
        placeholder="Örn: TypeScript Refactor Yap" 
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        required
      />

      <Select 
        label="Görev Kategorisi" 
        options={kategoriSeçenekleri} 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <div className="ff-form-actions">
        <Button variant="primary" size="md" type="submit">Akışa Ekle</Button>
      </div>
    </form>
  );
};