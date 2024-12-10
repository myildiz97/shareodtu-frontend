import { cn } from '@/lib/utils';

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: IContainerProps) {
  return (
    <div className={cn("container max-w-[1280px]", className)}>
      {children}
    </div>
  );
}