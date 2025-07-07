import { ComponentProps } from 'react';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Tooltip } from '@/components/ui/tooltip';

import { SidebarLeftIcon } from './icons';
import { Button } from '../ui/button';

export function SidebarToggle({
  className,
}: ComponentProps<typeof SidebarTrigger>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <Button
        onClick={toggleSidebar}
        variant="outline"
        className="md:px-2 md:h-fit"
      >
        <SidebarLeftIcon size={16} />
      </Button>
    </Tooltip>
  );
}
