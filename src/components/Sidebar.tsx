import { twMerge } from 'tailwind-merge';

interface SidebarProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export default function Sidebar({ children, className }: SidebarProps) {
  return (
    <div
      className={twMerge(
        className,
        'bg-base-100 shadow-base-300 rounded-t-box lg:rounded-r-box flex flex-col py-4 shadow-md lg:rounded-t-none',
      )}
    >
      {children}
    </div>
  );
}
