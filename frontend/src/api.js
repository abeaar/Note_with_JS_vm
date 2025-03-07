const API_URL = "http://35.184.118.193:5000";

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
