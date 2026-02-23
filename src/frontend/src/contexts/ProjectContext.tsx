import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface ProjectImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface ProjectData {
  storyText: string;
  title: string;
  selectedImages: ProjectImage[];
  lastSaved: number;
}

export interface FlipbookPage {
  textContent: string;
  imageUrl: string;
  pageNumber: number;
}

export interface FlipbookData {
  title: string;
  pages: FlipbookPage[];
  createdAt: number;
}

interface ProjectContextType {
  project: ProjectData;
  updateStoryText: (text: string) => void;
  updateTitle: (title: string) => void;
  addImage: (image: ProjectImage) => void;
  removeImage: (id: string) => void;
  saveProject: () => void;
  clearProject: () => void;
  saveFlipbook: () => void;
  getFlipbook: () => FlipbookData | null;
  hasFlipbook: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const defaultProject: ProjectData = {
  storyText: '',
  title: 'My Novella',
  selectedImages: [],
  lastSaved: Date.now(),
};

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { getItem, setItem } = useLocalStorage();
  const [project, setProject] = useState<ProjectData>(defaultProject);
  const [hasFlipbook, setHasFlipbook] = useState(false);
  const isInitialMount = useRef(true);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved project and flipbook data on mount
  useEffect(() => {
    const saved = getItem<ProjectData>('first-edition-project');
    if (saved) {
      setProject(saved);
    }
    
    const flipbook = getItem<FlipbookData>('first-edition-flipbook');
    setHasFlipbook(!!flipbook);
    
    isInitialMount.current = false;
  }, [getItem]);

  // Auto-save project data with debounce to prevent excessive writes
  useEffect(() => {
    // Skip the initial mount
    if (isInitialMount.current) {
      return;
    }

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Debounce auto-save by 500ms
    autoSaveTimeoutRef.current = setTimeout(() => {
      if (project.storyText || project.title !== defaultProject.title) {
        setItem('first-edition-project', project);
      }
    }, 500);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [project, setItem]);

  const updateStoryText = (text: string) => {
    setProject((prev) => ({ ...prev, storyText: text }));
  };

  const updateTitle = (title: string) => {
    setProject((prev) => ({ ...prev, title }));
  };

  const addImage = (image: ProjectImage) => {
    setProject((prev) => ({
      ...prev,
      selectedImages: [...prev.selectedImages, image],
    }));
  };

  const removeImage = (id: string) => {
    setProject((prev) => ({
      ...prev,
      selectedImages: prev.selectedImages.filter((img) => img.id !== id),
    }));
  };

  const saveProject = () => {
    const updatedProject = { ...project, lastSaved: Date.now() };
    setProject(updatedProject);
    setItem('first-edition-project', updatedProject);
  };

  const clearProject = () => {
    setProject(defaultProject);
    setItem('first-edition-project', defaultProject);
  };

  const saveFlipbook = () => {
    // First, save the current project state immediately
    const updatedProject = { ...project, lastSaved: Date.now() };
    setProject(updatedProject);
    setItem('first-edition-project', updatedProject);

    // Split story text into pages (approximately 300 words per page)
    const words = project.storyText.split(/\s+/).filter(word => word.length > 0);
    const wordsPerPage = 300;
    const pages: FlipbookPage[] = [];
    
    for (let i = 0; i < words.length; i += wordsPerPage) {
      const pageWords = words.slice(i, i + wordsPerPage);
      const textContent = pageWords.join(' ');
      
      // Assign images to pages in order
      const imageIndex = Math.floor(i / wordsPerPage);
      const imageUrl = project.selectedImages[imageIndex]?.url || '';
      
      pages.push({
        textContent,
        imageUrl,
        pageNumber: pages.length + 1,
      });
    }

    // If there are no pages from text but there are images, create pages with just images
    if (pages.length === 0 && project.selectedImages.length > 0) {
      project.selectedImages.forEach((img, idx) => {
        pages.push({
          textContent: '',
          imageUrl: img.url,
          pageNumber: idx + 1,
        });
      });
    }

    const flipbookData: FlipbookData = {
      title: project.title,
      pages,
      createdAt: Date.now(),
    };

    setItem('first-edition-flipbook', flipbookData);
    setHasFlipbook(true);
  };

  const getFlipbook = (): FlipbookData | null => {
    return getItem<FlipbookData>('first-edition-flipbook');
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        updateStoryText,
        updateTitle,
        addImage,
        removeImage,
        saveProject,
        clearProject,
        saveFlipbook,
        getFlipbook,
        hasFlipbook,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
}
