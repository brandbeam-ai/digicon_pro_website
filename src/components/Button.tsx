'use client';

interface ButtonProps {
  text: string;
  isPrimary?: boolean;
  onClick?: () => void;
}

export default function Button({ text, isPrimary = true, onClick }: ButtonProps) {
  const handleClick = () => {
    // Add click animation
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        bg-pink-accent hover:bg-pink-dark text-white font-bold
        py-4 px-8 rounded-full text-xl transition-all duration-300 hover-lift
        ${isPrimary ? 'pulse-pink' : ''}
      `}
    >
      {text}
    </button>
  );
}
