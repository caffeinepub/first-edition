import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import WritingPage from './pages/WritingPage';
import AboutPage from './pages/AboutPage';
import WritingPromptsPage from './pages/WritingPromptsPage';
import CharacterDevelopmentPage from './pages/CharacterDevelopmentPage';
import PreviewPage from './pages/PreviewPage';
import GrammarCheckPage from './pages/GrammarCheckPage';
import WritersBlockPage from './pages/WritersBlockPage';
import ImageCreationPage from './pages/ImageCreationPage';
import FlipbookPage from './pages/FlipbookPage';
import { ProjectProvider } from './contexts/ProjectContext';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WritingPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const writingPromptsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/writing-prompts',
  component: WritingPromptsPage,
});

const characterDevelopmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character-development',
  component: CharacterDevelopmentPage,
});

const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview',
  component: PreviewPage,
});

const grammarCheckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/grammar-check',
  component: GrammarCheckPage,
});

const writersBlockRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/writers-block',
  component: WritersBlockPage,
});

const imageCreationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/image-creation',
  component: ImageCreationPage,
});

const flipbookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/flipbook',
  component: FlipbookPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  writingPromptsRoute,
  characterDevelopmentRoute,
  previewRoute,
  grammarCheckRoute,
  writersBlockRoute,
  imageCreationRoute,
  flipbookRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ProjectProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;
