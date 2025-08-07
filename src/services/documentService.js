import api from './api';

// Upload Document
export const uploadDocument = async (file, entityType, entityId, purpose, userId, role) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('entityType', entityType);
    formData.append('entityId', entityId);
    formData.append('purpose', purpose);
    formData.append('userId', userId);
    formData.append('role', role);

    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Download Document
export const downloadDocument = async (fileId) => {
  try {
    const response = await api.get(`/documents/download/${fileId}`, {
      responseType: 'blob',
    });
    
    // Create a blob URL for the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Extract filename from content-disposition header
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'document';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch.length === 2) {
        filename = filenameMatch[1];
      }
    }
    
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
    window.URL.revokeObjectURL(url);
    
    return { success: true, filename };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// List Documents by Entity
export const listDocumentsByEntity = async (entityType, entityId) => {
  try {
    const response = await api.get(`/documents/${entityType}/${entityId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete Document
export const deleteDocument = async (fileId) => {
  try {
    const response = await api.delete(`/documents/${fileId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
