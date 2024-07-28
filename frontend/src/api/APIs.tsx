import axiosInstance from './AxiosInstance';


export const fetchAllCafes = async (location: any = '') => {
  try {
    return await axiosInstance.get('/all-cafes',{});
  } catch (error) {
    console.error('Error fetching allcafes:', error);
    throw error;
  }
};

export const fetchCafes = async (location: any = '') => {
  try {
    return await axiosInstance.get('/cafes', { params: { location } });
  } catch (error) {
    console.error('Error fetching cafes:', error);
    throw error;
  }
};

export const addCafe = async (cafeData: any) => {
  try {
    return await axiosInstance.post('/cafe', cafeData);
  } catch (error) {
    console.error('Error adding cafe:', error);
    throw error;
  }
};

export const updateCafe = async (cafeId: any, cafeData: any) => {
  try {
    return await axiosInstance.put(`/cafe`, { id: cafeId, ...cafeData });
  } catch (error) {
    console.error('Error updating cafe:', error);
    throw error;
  }
};

export const deleteCafe = async (cafeId: any) => {
  try {
    return await axiosInstance.delete(`/cafe`, { params: { id: cafeId } });
  } catch (error) {
    console.error('Error deleting cafe:', error);
    throw error;
  }
};

export const fetchEmployees = async (cafe: any = '') => {
  try {
    return await axiosInstance.get('/employees', { params: { cafe } });
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const addEmployee = async (employeeData: any) => {
  try {
    return await axiosInstance.post('/employee', employeeData);
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const updateEmployee = async (employeeId: any, employeeData: any) => {
  try {
    return await axiosInstance.put(`/employee`, { id: employeeId, ...employeeData });
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId: any) => {
  try {
    return await axiosInstance.delete(`/employee`, { params: { id: employeeId } });
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};
