import * as React from 'react';
import { Button } from '../ui/button';

interface ICustomButtonProps {
  label: string;
  variant?: 'take' | 'add' | 'remove' | 'edit';
  onClick?: () => void;
}

const CustomButton: React.FunctionComponent<ICustomButtonProps> = ({ label, variant = 'take', onClick }) => {
  const className = {
    take: 'bg-background text-foreground hover:bg-primary font-medium text-base p-2 rounded-md',
    add: 'bg-background text-foreground hover:bg-primary font-medium text-base p-2 rounded-md',
    remove: 'bg-red-700 text-foreground hover:bg-primary font-medium text-base p-2 rounded-md',
    edit: 'bg-yellow-500 text-foreground hover:bg-primary font-medium text-base p-2 rounded-md',
  }

  return (
    <Button className={className[variant]} onClick={onClick}>
      {label}
    </Button>
  )
};

export default CustomButton;
