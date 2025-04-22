
// Mock authentication service for demo purposes
// In a real application, this would connect to a backend service

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  assignedCameras?: string[];
};

// Mock users for demonstration
const USERS: User[] = [
  { 
    id: '1', 
    name: 'Admin User', 
    email: 'admin@guardian-eye.com', 
    role: 'admin' 
  },
  { 
    id: '2', 
    name: 'Client Demo', 
    email: 'client@example.com', 
    role: 'client',
    assignedCameras: ['camera-1', 'camera-2'] 
  },
];

export function loginUser(email: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    // Simulate API request delay
    setTimeout(() => {
      const user = USERS.find(u => u.email === email);
      
      // In this demo, any password works for existing users
      if (user) {
        // Store user in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        resolve(user);
      } else {
        resolve(null);
      }
    }, 800);
  });
}

export function getCurrentUser(): User | null {
  const userJson = sessionStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
}

export function logoutUser(): void {
  sessionStorage.removeItem('currentUser');
}

export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === 'admin';
}
