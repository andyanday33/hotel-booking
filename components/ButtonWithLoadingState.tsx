import React, { useEffect, useState } from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  error?: unknown;
};

const ButtonWithLoadingState: React.FC<ButtonProps> = ({
  onClick,
  text,
  className,
  error,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return (
    <button
      className={`btn btn-gray-700 ${loading && "loading"} ${className}`}
      onClick={() => {
        setLoading(true);
        onClick && onClick();
      }}
    >
      {text}
    </button>
  );
};

export default ButtonWithLoadingState;
