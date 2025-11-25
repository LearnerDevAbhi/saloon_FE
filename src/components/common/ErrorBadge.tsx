interface ErrorBadgeProps {
    message: string;
    onClose?: () => void;
  }
  
  export const ErrorBadge = ({ message, onClose }: ErrorBadgeProps) => {
    if (!message) return null;
  
    return (
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[320px] z-50">
        <div className="rounded-xl bg-white shadow-xl border border-red-300 p-4 flex justify-between items-start">
          <div className="text-red-700 text-sm font-medium">{message}</div>
  
          {onClose && (
            <button
              onClick={onClose}
              className="ml-3 text-red-600 hover:text-red-800 text-xl leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>
    );
  };
  