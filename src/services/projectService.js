import api from './api';

// Create Project (PM)
export const createProject = async (projectData, pmId, departmentId, pmName) => {
  try {
    const response = await api.post('/projects', projectData, {
      params: { pmId, departmentId, pmName }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get My Projects (PM)
export const getMyProjects = async (pmId) => {
  try {
    const response = await api.get('/projects/mine', {
      params: { pmId }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Finalize Contractor & Supervisor
export const finalizeProjectTeam = async (projectId, contractorId, supervisorId) => {
  try {
    const response = await api.post(`/projects/${projectId}/finalize`, {
      contractorId,
      supervisorId
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
