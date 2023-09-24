import React, { useState } from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleOnError = () => {
    setHasError(true);
  };

  return (
    <div onError={handleOnError}>
      {hasError ? (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={reloadPage}>Reload</button>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ErrorBoundary;
