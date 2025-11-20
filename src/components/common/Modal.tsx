import type { ReactNode } from 'react';
import { Button } from './Button';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  widthClass?: string;
}

export const Modal = ({ title, isOpen, onClose, children, footer, widthClass = 'max-w-lg' }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className={`w-full rounded-2xl bg-white p-6 shadow-card ${widthClass}`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="space-y-4">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};

