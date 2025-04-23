import { CameraAssignment } from '../components/camera-assignment';
import { getCurrentUser } from '../lib/auth';

export default function Home() {
  const currentUser = getCurrentUser();

  return (
    <main className="min-h-screen p-8">
      {currentUser?.role === 'admin' && (
        <div className="mt-8">
          <CameraAssignment />
        </div>
      )}
    </main>
  );
} 