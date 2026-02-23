import { Link, useRouterState } from '@tanstack/react-router';
import SaveButton from './SaveButton';
import ExportPdfButton from './ExportPdfButton';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', label: 'About' },
    { path: '/write', label: 'Write' },
    { path: '/prompts', label: 'Prompts' },
    { path: '/characters', label: 'Characters' },
    { path: '/preview', label: 'Preview' },
    { path: '/grammar', label: 'Grammar' },
    { path: '/writers-block', label: 'Inspiration' },
    { path: '/images', label: 'Images' },
    { path: '/flipbook', label: 'Flipbook' },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-1 flex-wrap">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentPath === item.path
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SaveButton />
            <ExportPdfButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
