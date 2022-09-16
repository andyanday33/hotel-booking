import React, { useState } from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const ButtonWithLoadingState: React.FC<ButtonProps> = ({
  onClick,
  text,
  className,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className={`btn btn-gray-700 ${loading && "loading"} ${className}`}
      onClick={() => {
        setLoading(true);
        onClick && onClick();
      }}
    >
      Sign in with {text}
    </button>
  );
};

export default ButtonWithLoadingState;
