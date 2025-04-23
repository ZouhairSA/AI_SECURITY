import { getCurrentUser, isAdmin, USERS } from "./auth";

export type Camera = {
  id: string;
  name: string;
  location: string;
  streamUrl: string;
  status: "online" | "offline" | "warning";
  clientId: string;
  lastAlert?: {
    type: "fire" | "crowd" | "weapon" | "violence";
    timestamp: string;
    confidence: number;
  };
};

export type AlertType = "fire" | "crowd" | "weapon" | "violence";

export type Alert = {
  id: string;
  cameraId: string;
  cameraName: string;
  type: AlertType;
  timestamp: string;
  confidence: number;
  status: "new" | "acknowledged" | "resolved";
  thumbnail: string;
};

// Mock cameras data
const CAMERAS: Camera[] = [
  {
    id: "camera-1",
    name: "Main Entrance",
    location: "Building A",
    streamUrl: "https://picsum.photos/800/450", // Mock image for demo
    status: "online",
    clientId: "2",
    lastAlert: {
      type: "crowd",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      confidence: 0.92,
    },
  },
  {
    id: "camera-2",
    name: "Parking Lot",
    location: "Building A",
    streamUrl: "https://picsum.photos/800/450?random=1", // Different random image
    status: "online",
    clientId: "2",
  },
  {
    id: "camera-3",
    name: "Server Room",
    location: "Building B",
    streamUrl: "https://picsum.photos/800/450?random=2",
    status: "warning",
    clientId: "3",
    lastAlert: {
      type: "fire",
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      confidence: 0.87,
    },
  },
  {
    id: "camera-4",
    name: "Main Entrance",
    location: "Building B",
    streamUrl: "https://picsum.photos/800/450?random=3",
    status: "offline",
    clientId: "3",
  },
  {
    id: "camera-5",
    name: "Conference Room",
    location: "Building C",
    streamUrl: "https://picsum.photos/800/450?random=4",
    status: "online",
    clientId: "4",
  }
];

// Mock alerts data
const ALERTS: Alert[] = [
  {
    id: "alert-1",
    cameraId: "camera-1",
    cameraName: "Main Entrance",
    type: "crowd",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    confidence: 0.92,
    status: "new",
    thumbnail: "https://picsum.photos/200/150?random=1",
  },
  {
    id: "alert-2",
    cameraId: "camera-3",
    cameraName: "Server Room",
    type: "fire",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    confidence: 0.87,
    status: "acknowledged",
    thumbnail: "https://picsum.photos/200/150?random=2",
  },
  {
    id: "alert-3",
    cameraId: "camera-2",
    cameraName: "Parking Lot",
    type: "weapon",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    confidence: 0.75,
    status: "resolved",
    thumbnail: "https://picsum.photos/200/150?random=3",
  },
  {
    id: "alert-4",
    cameraId: "camera-1",
    cameraName: "Main Entrance",
    type: "violence",
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
    confidence: 0.83,
    status: "resolved",
    thumbnail: "https://picsum.photos/200/150?random=4",
  },
];

// Get cameras based on user access
export function getCameras(): Promise<Camera[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        resolve([]);
        return;
      }
      
      // Admin sees all cameras
      if (isAdmin()) {
        resolve(CAMERAS);
        return;
      }
      
      // Clients only see their assigned cameras
      const userCameras = CAMERAS.filter(
        camera => currentUser.assignedCameras?.includes(camera.id)
      );
      
      resolve(userCameras);
    }, 500);
  });
}

// Get a specific camera by ID
export function getCamera(cameraId: string): Promise<Camera | null> {
  return new Promise((resolve) => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      resolve(null);
      return;
    }
    
    setTimeout(() => {
      const camera = CAMERAS.find(c => c.id === cameraId);
      
      if (!camera) {
        resolve(null);
        return;
      }
      
      // Check if user has access to this camera
      if (isAdmin() || currentUser.assignedCameras?.includes(camera.id)) {
        resolve(camera);
      } else {
        resolve(null);
      }
    }, 300);
  });
}

// Get alerts based on user access
export function getAlerts(): Promise<Alert[]> {
  return new Promise((resolve) => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      resolve([]);
      return;
    }
    
    setTimeout(() => {
      // Admin sees all alerts
      if (isAdmin()) {
        resolve(ALERTS);
        return;
      }
      
      // Clients only see alerts for their cameras
      const userCameraIds = currentUser.assignedCameras || [];
      const userAlerts = ALERTS.filter(
        alert => userCameraIds.includes(alert.cameraId)
      );
      
      resolve(userAlerts);
    }, 500);
  });
}

// Update alert status
export function updateAlertStatus(alertId: string, status: "acknowledged" | "resolved"): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const alertIndex = ALERTS.findIndex(a => a.id === alertId);
      
      if (alertIndex >= 0) {
        ALERTS[alertIndex].status = status;
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
}

// Assign a camera to a user
export function assignCameraToUser(cameraId: string, userId: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      
      if (!currentUser || !isAdmin()) {
        resolve(false);
        return;
      }
      
      // Find the user
      const user = USERS.find(u => u.id === userId);
      if (!user) {
        resolve(false);
        return;
      }
      
      // Find the camera
      const camera = CAMERAS.find(c => c.id === cameraId);
      if (!camera) {
        resolve(false);
        return;
      }
      
      // Add camera to user's assigned cameras
      if (!user.assignedCameras) {
        user.assignedCameras = [];
      }
      
      if (!user.assignedCameras.includes(cameraId)) {
        user.assignedCameras.push(cameraId);
      }
      
      resolve(true);
    }, 300);
  });
}

// Add a new camera
export function addCamera(cameraData: Omit<Camera, 'id' | 'status'>): Promise<Camera | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      
      // Only admins can add cameras
      if (!currentUser || !isAdmin()) {
        console.error("Permission denied: Only admins can add cameras.");
        resolve(null);
        return;
      }

      // Check if the specified client exists
      const clientExists = USERS.some(user => user.id === cameraData.clientId && user.role === 'client');
      if (!clientExists) {
        console.error(`Client with ID ${cameraData.clientId} not found or is not a client.`);
        resolve(null);
        return;
      }

      const newCamera: Camera = {
        ...cameraData,
        id: `camera-${Date.now()}`, // Simple unique ID generation
        status: "offline", // Default status for new cameras
      };

      CAMERAS.push(newCamera);
      console.log("New camera added:", newCamera);
      resolve(newCamera);
    }, 400); // Simulate network delay
  });
}
