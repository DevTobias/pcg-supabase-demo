'use client';

import type { PartialOptions } from 'overlayscrollbars';
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { type FC, type ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  overflow: PartialOptions['overflow'];
  overwrite?: PartialOptions;
  scrollDependencies?: unknown[];
  scrollToEnd?: boolean;
}

export const Scrollable: FC<Props> = ({
  children,
  className,
  overflow,
  overwrite,
  scrollDependencies,
  scrollToEnd,
}) => {
  const ref = useRef<OverlayScrollbarsComponentRef>(null);

  useEffect(() => {
    if (!scrollToEnd) return;

    const instance = ref.current?.osInstance();
    if (!instance) return;

    const { viewport } = instance.elements();
    viewport.scrollTo(0, viewport.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToEnd, ...(scrollDependencies ?? [])]);

  return (
    <OverlayScrollbarsComponent
      className={className}
      options={{
        overflow,
        ...overwrite,
        scrollbars: {
          autoHide: 'scroll',
          visibility: 'auto',
          ...overwrite?.scrollbars,
        },
      }}
      ref={ref}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
