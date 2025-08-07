import { createContext } from 'react';

export const ProjectContext = createContext({
  addProject: () => {},
  hardcodedProjects:[],
  dynamicProjects:[],

}); 