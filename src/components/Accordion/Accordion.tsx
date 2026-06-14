import React, { useState } from 'react';
import './Accordion.scss';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="ff-accordion">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div key={index} className={`ff-accordion-item ${isOpen ? 'is-open' : ''}`}>
            <button
              className="ff-accordion-header"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
              type="button"
            >
              <span className="ff-accordion-title">{item.title}</span>
              <span className="ff-accordion-icon" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              className="ff-accordion-content"
              id={`accordion-content-${index}`}
              aria-labelledby={`accordion-header-${index}`}
              role="region"
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};