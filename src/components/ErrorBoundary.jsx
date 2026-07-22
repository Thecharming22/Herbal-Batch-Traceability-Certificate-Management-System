import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "React Error Boundary caught an error:",
      error,
      errorInfo
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
          <div className="text-center max-w-md">

            <div className="text-6xl mb-4">
              🌿
            </div>

            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              Something went wrong
            </h1>

            <p className="text-gray-300 mb-6">
              The application encountered an unexpected error.
              Please try again.
            </p>

            <button
              onClick={this.handleReload}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg"
            >
              Try Again
            </button>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;