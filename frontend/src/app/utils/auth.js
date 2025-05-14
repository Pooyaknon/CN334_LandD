export const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ refresh: refresh_token }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('access_token', data.access);
    return data.access;
  } else {
    alert("Token หมดอายุ กรุณาเข้าสู่ระบบใหม่");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = '/login';
  }
};

export const fetchWithAuth = async (url, options = {}) => {
  let access_token = localStorage.getItem('access_token');
  if (!access_token) {
    access_token = await refreshToken();
  }

  if (access_token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${access_token}`,
    };

    const response = await fetch(url, options);
    if (response.status === 401) {
      access_token = await refreshToken();
      if (access_token) {
        options.headers['Authorization'] = `Bearer ${access_token}`;
        return fetch(url, options);
      }
    }
    return response;
  }

  return null;
};