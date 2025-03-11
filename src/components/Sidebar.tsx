import { twMerge } from 'tailwind-merge';

interface SidebarProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export default function Sidebar({ children, className }: SidebarProps) {
  return (
    <div
      className={twMerge(
        className,
        'bg-base-100 shadow-base-300 rounded-t-box flex flex-col shadow-md lg:rounded-t-none lg:rounded-r-3xl',
      )}
    >
      {children}
    </div>
  );
}
