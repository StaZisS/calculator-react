import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme-toggle';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const calculators = [
  {
    title: 'Расчёт размера доли',
    href: '/residential-share',
    description: 'Расчёт доли в помещении, приобретённом за счёт средств МСК',
  },
  {
    title: 'Расчёт площади помещения',
    href: '/living-space',
    description: 'Площадь жилого помещения пропорционально доле собственника',
  },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto flex h-16 items-center px-4 gap-4">
        <Link to="/" className="flex items-center gap-3 mr-4 shrink-0">
          <img src="/logo.png" alt="Логотип" className="h-9 w-9 object-contain mix-blend-multiply dark:mix-blend-normal dark:bg-white dark:rounded-md dark:p-0.5" />
          <span className="font-bold text-lg text-primary hidden sm:block">
            Калькулятор
          </span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                to="/"
                className={cn(
                  'inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  location.pathname === '/' && 'bg-accent text-accent-foreground'
                )}
              >
                Главная
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Калькуляторы</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[340px] gap-1 p-2">
                  {calculators.map((calc) => (
                    <li key={calc.href}>
                      <Link
                        to={calc.href}
                        className={cn(
                          'block select-none rounded-lg p-3 no-underline transition-colors hover:bg-accent',
                          location.pathname === calc.href && 'bg-accent'
                        )}
                      >
                        <div className="text-sm font-semibold">{calc.title}</div>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          {calc.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Spacer for mobile */}
        <div className="flex-1 md:hidden" />

        <ThemeToggle />

        {/* Mobile burger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-card px-4 py-3 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent',
              location.pathname === '/' && 'bg-accent text-accent-foreground'
            )}
          >
            Главная
          </Link>
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              to={calc.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block rounded-lg px-3 py-2.5 transition-colors hover:bg-accent',
                location.pathname === calc.href && 'bg-accent text-accent-foreground'
              )}
            >
              <div className="text-sm font-medium">{calc.title}</div>
              <p className="text-xs text-muted-foreground">{calc.description}</p>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
