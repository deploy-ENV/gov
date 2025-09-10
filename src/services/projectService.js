import api from './api';
import Cookies from 'js-cookie';
// Create Project (PM)
export const createProject = async (projectData, pmId, departmentId, pmName) => {
  try {
    console.log("prjct data",projectData);
    
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

    const response = await api.get(`/projects/pm/${ pmId }`, {
      
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


export const getAllProjects = async () => {
  try {
    
    const response = await api.get("/projects/all",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }
    );
    console.log(`Bearer ${Cookies.get("token")}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};