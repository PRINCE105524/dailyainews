'use client';

import Link from 'next/link';
import { BrainCircuit, Menu, Newspaper } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import React from 'react';

type HeaderProps = {
  activeCategory: string;
};

export function Header({ activeCategory }: HeaderProps) {
  const navLinks = (
    <>
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant="ghost"
          asChild
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            activeCategory === category
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          <Link
            href={category === CATEGORIES[0] ? '/' : `/?category=${category}`}
            scroll={false}
          >
            {category}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Daily AI News
            </span>
          </Link>
        </div>
        <div className="hidden md:flex flex-grow items-center space-x-2">
          {navLinks}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {CATEGORIES.map((category) => (
                    <SheetClose asChild key={category}>
                      <Link
                        href={
                          category === CATEGORIES[0]
                            ? '/'
                            : `/?category=${category}`
                        }
                        className={cn(
                          'flex items-center gap-2 rounded-md p-2 text-lg font-semibold',
                          activeCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        )}
                        scroll={false}
                      >
                        {category}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
