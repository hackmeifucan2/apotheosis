
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...rest }) => {
  return (
    <div
      className={`bg-white dark:bg-black p-4 sm:p-6 rounded-2xl border border-black/10 dark:border-white/10 transition-all duration-300 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode, icon?: React.ReactNode, className?: string }> = ({ children, icon, className }) => {
    return (
        <div className={`flex items-center mb-4 ${className}`}>
            {icon && <span className="mr-3 text-black dark:text-white">{icon}</span>}
            <h2 className="text-lg font-bold text-black dark:text-white">{children}</h2>
        </div>
    )
}

export default Card;
