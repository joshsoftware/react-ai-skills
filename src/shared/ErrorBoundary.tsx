import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Safe telemetry: never log PII, stack traces, or SQL to external services
    console.error('ErrorBoundary caught:', error.message, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
            <h1 className="text-2xl font-semibold text-gray-900">Something went wrong</h1>
            <p className="text-gray-600">Please refresh the page or try again later.</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
