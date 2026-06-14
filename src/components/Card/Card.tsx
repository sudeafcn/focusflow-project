import React from 'react';
import './Card.scss';

interface CardProps {
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, icon, badge, children }) => {
  return (
    <div className="ff-card">
      {badge && <span className="ff-card-badge">{badge}</span>}
      {icon && <div className="ff-card-icon">{icon}</div>}
      <h3 className="ff-card-title">{title}</h3>
      <p className="ff-card-description">{description}</p>
      {children && <div className="ff-card-actions">{children}</div>}
    </div>
  );
};