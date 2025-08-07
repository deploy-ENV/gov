import api from './api';

// Request Fund (PM)
export const requestFund = async (fundData) => {
  try {
    const response = await api.post('/funds/request', fundData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Approve/Reject Fund (Govt Admin)
export const approveFund = async (txnId, approve) => {
  try {
    const response = await api.post('/funds/approve', null, {
      params: { txnId, approve }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Fund Transactions
export const getFundTransactions = async (projectId) => {
  try {
    const response = await api.get('/funds/transactions', {
      params: { projectId }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
