import { ReactNode } from 'react';

export interface IModalProps {
  children: ReactNode;
  onClose: () => void;
}
