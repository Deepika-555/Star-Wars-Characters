import { useState, FormEvent } from 'react';
import { Rocket, Menu, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Discover', href: '#hero' },
  { label: 'Filters', href: '#filters' },
  { label: 'Characters', href: '#characters' },
];

export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { toast } = useToast();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get('email') as string;

    setIsLoginOpen(false);
    toast({
      title: 'Welcome back!',
      description: email ? `May the Force be with you, ${email}.` : 'You are now signed in.',
    });
  };

  const renderLinks = (itemClassName?: string) =>
    navLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className={cn(
          'text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition hover:text-primary',
          itemClassName,
        )}
      >
        {link.label}
      </a>
    ));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[rgba(5,10,20,0.75)] backdrop-blur-xl animate-slide-down">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#hero" className="group flex items-center gap-3 rounded-full border border-transparent px-3 py-2 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:scale-105">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(247,223,80,0.35)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_15px_40px_rgba(247,223,80,0.5)] group-hover:rotate-12 animate-glow-pulse">
              <Rocket className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="text-base font-bold tracking-[0.3em] text-primary transition-all duration-300 group-hover:tracking-[0.4em]">
              STAR WARS HUB
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex animate-fade-in">
            {renderLinks()}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setIsLoginOpen(true)}
              className="group hidden min-w-[110px] items-center gap-2 bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(247,223,80,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_12px_40px_rgba(247,223,80,0.5)] hover:scale-105 active:scale-95 md:inline-flex animate-fade-in-right"
            >
              <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              Login
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-white/15 bg-white/10 text-foreground hover:bg-white/20 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[rgba(7,12,25,0.95)] text-foreground backdrop-blur">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-primary">
                    <Rocket className="h-5 w-5" />
                    Star Wars Hub
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  {renderLinks('text-base')}
                  <Button
                    onClick={() => {
                      setIsLoginOpen(true);
                    }}
                    className="mt-4 flex items-center justify-center gap-2 bg-primary text-primary-foreground"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="max-w-md border border-white/10 bg-[rgba(7,12,25,0.95)] text-foreground backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">Login</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Sign in to sync your favorite characters across the galaxy.
            </DialogDescription>
          </DialogHeader>
          <form className="mt-4 space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@rebellion.org"
                required
                className="border border-white/15 bg-background/70 backdrop-blur"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="border border-white/15 bg-background/70 backdrop-blur"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground shadow-[0_10px_35px_rgba(247,223,80,0.35)] hover:bg-primary/90">
              Continue
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By continuing you agree to follow the Jedi Code.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;

