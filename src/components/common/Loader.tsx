interface LoaderProps {
  label?: string;
  fullScreen?: boolean;
}

export const Loader = ({ label = 'Loading...', fullScreen }: LoaderProps) => {
  const content = (
    <div className="flex flex-col items-center gap-3 text-slate-600">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

