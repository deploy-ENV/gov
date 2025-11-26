import api from './api';
import Cookies from 'js-cookie';

// Create Project (PM)
export const createProject = async (projectData, pmId, departmentId, pmName) => {
  try {
    console.log("prjct data", projectData);

    const response = await api.post(
      `/projects/pm/${pmId}/dept/${departmentId}/name/${pmName}`,
      projectData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

// Get My Projects (PM)
export const getMyProjects = async (pmId) => {
  try {
    const response = await api.get(`/projects/pm/${pmId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error.response?.data || error.message;
  }
};

// Get Project by ID
export const getProjectById = async (projectId) => {
  try {
    console.log(Cookies.get("token"));
    
    const response = await api.get(`/projects/${projectId}`, {
      
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch Nearest Supervisor by Project Location
export const getNearestSupervisor = async (zone) => {
  console.log(zone);
  
  try {
    const response = await api.get('/projects/supervisors/nearest', {zone},{
      
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching nearest supervisor:", error);
    throw error.response?.data || error.message;
  }
};

// Move Project to Execution / Finalize Contractor & Supervisor
export const finalizeProjectTeam = async (projectId, contractorId, supervisorId) => {
  try {
    const response = await api.post(
      `/projects/${projectId}/finalize/contractor/${contractorId}/supervisor/${supervisorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error finalizing project team:", error);
    throw error.response?.data || error.message;
  }
};

// Get All Projects
export const getAllProjects = async () => {
  try {
    const response = await api.get("/projects/all", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Delete Project by ID (PM)
export const deleteProjectById = async (projectId) => {
  try {
    const response = await api.delete(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error.response?.data || error.message;
  }
};

// Delete All Projects (PM)
export const deleteAllProjects = async () => {
  try {
    const response = await api.delete(`/projects/all`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting all projects:", error);
    throw error.response?.data || error.message;
  }
};

// Update Project Progress (status + index)
export const updateProjectProgress = async (projectId, status, index) => {
  try {
    const response = await api.put(
      `/projects/${projectId}/status/${status}/${index}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project progress:", error);
    throw error.response?.data || error.message;
  }
};

// Update Project (full update)
export const updateProject = async (projectId, updatedProject) => {
  try {
    const response = await api.put(
      `/projects/${projectId}`,
      updatedProject,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error.response?.data || error.message;
  }
};
