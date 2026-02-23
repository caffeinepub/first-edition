import { Link, useRouterState } from '@tanstack/react-router';
import { BookOpen, Lightbulb, Users, Eye, CheckCircle, Sparkles, Image, Info, Book } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SaveButton from './SaveButton';
import ExportPdfButton from './ExportPdfButton';
import SaveFlipbookButton from './SaveFlipbookButton';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', label: 'Write', icon: BookOpen },
    { path: '/about', label: 'About', icon: Info },
    { path: '/writing-prompts', label: 'Prompts', icon: Lightbulb },
    { path: '/character-development', label: 'Characters', icon: Users },
    { path: '/image-creation', label: 'Images', icon: Image },
    { path: '/preview', label: 'Preview', icon: Eye },
    { path: '/grammar-check', label: 'Grammar', icon: CheckCircle },
    { path: '/writers-block', label: "Writer's Block", icon: Sparkles },
    { path: '/flipbook', label: 'Flipbook', icon: Book },
  ];

  return (
    <nav className="bg-sidebar border-b border-sidebar-border sticky top-[73px] z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto py-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <SaveButton />
            <SaveFlipbookButton />
            <ExportPdfButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
