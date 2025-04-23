import { useState } from 'react';
import { assignCameraToUser } from '../lib/camera-service';
import { USERS } from '../lib/auth';
import { CAMERAS } from '../lib/camera-service';

export function CameraAssignment() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [message, setMessage] = useState('');

  const handleAssign = async () => {
    if (!selectedUserId || !selectedCameraId) {
      setMessage('Veuillez sélectionner un utilisateur et une caméra');
      return;
    }

    const success = await assignCameraToUser(selectedCameraId, selectedUserId);
    if (success) {
      setMessage('Caméra assignée avec succès');
    } else {
      setMessage('Erreur lors de l\'assignation de la caméra');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Assigner une caméra</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Utilisateur :</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionner un utilisateur</option>
          {USERS.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Caméra :</label>
        <select
          value={selectedCameraId}
          onChange={(e) => setSelectedCameraId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionner une caméra</option>
          {CAMERAS.map(camera => (
            <option key={camera.id} value={camera.id}>
              {camera.name} - {camera.location}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Assigner
      </button>

      {message && (
        <p className={`mt-4 ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
} 