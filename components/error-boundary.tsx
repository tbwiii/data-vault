"use client";
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: (...args: any[]) => void;
}) {
  return (
    <div className="container m-auto">
      <div role="alert" className="bg-red-950 text-red-300 rounded p-8">
        <p>Something went wong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  );
}

export default function ErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ComponentType<any>;
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback || ErrorFallback}
      onError={(error, info) => {
        console.error(error, info.componentStack);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
