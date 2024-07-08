import React from 'react';

const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="flex items-center justify-center bg-white rounded-lg p-8">
                <svg className="animate-spin h-8 w-8 text-gray-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c3.042 0 5.824-1.135 7.938-3l-2.647-3A7.962 7.962 0 0112 16v4zm5.291-7H20c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.962 7.962 0 0116 12h4zM12 4c-3.042 0-5.824 1.135-7.938 3l2.647 3A7.962 7.962 0 0112 8V4zm-2.291 7H4c0 3.042 1.135 5.824 3 7.938l3-2.647A7.962 7.962 0 018 12h1.709z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default LoadingOverlay;
