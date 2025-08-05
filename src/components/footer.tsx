'use client';

import { BrainCircuit } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            AI for NextGen. © {year} Daily AI News. All rights reserved.
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          News sourced from public APIs.
        </p>
      </div>
    </footer>
  );
}
