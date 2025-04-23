'use client';

import { useState, useEffect } from 'react';
import { addCamera, Camera } from '../lib/camera-service';
import { USERS, User } from '../lib/auth'; // Assuming USERS is now exported from auth

interface AddCameraFormProps {
  onCameraAdded: (newCamera: Camera) => void;
  onCancel: () => void;
}

export function AddCameraForm({ onCameraAdded, onCancel }: AddCameraFormProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [clients, setClients] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Filter users to get only clients
    const clientUsers = USERS.filter(user => user.role === 'client');
    setClients(clientUsers);
    // Pre-select the first client if available
    if (clientUsers.length > 0) {
      setSelectedClientId(clientUsers[0].id);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !location || !streamUrl || !selectedClientId) {
      setError('Tous les champs sont requis.');
      setIsLoading(false);
      return;
    }

    try {
      const newCameraData = { name, location, streamUrl, clientId: selectedClientId };
      const addedCamera = await addCamera(newCameraData);
      
      if (addedCamera) {
        onCameraAdded(addedCamera);
        // Optionally reset form fields here
        setName('');
        setLocation('');
        setStreamUrl('');
        // Keep selected client or reset based on preference
      } else {
        setError('Impossible d\'ajouter la caméra. Vérifiez les permissions ou l\'ID client.');
      }
    } catch (err) {
      console.error("Error adding camera:", err);
      setError('Une erreur est survenue lors de l\'ajout de la caméra.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Using a simple form structure. Consider using a modal component from a library like Shadcn/ui or Material UI for better UX.
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle caméra</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="cameraName" className="block text-sm font-medium text-gray-700 mb-1">Nom de la caméra</label>
        <input
          id="cameraName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cameraLocation" className="block text-sm font-medium text-gray-700 mb-1">Emplacement (ex: Bâtiment A)</label>
        <input
          id="cameraLocation"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="streamUrl" className="block text-sm font-medium text-gray-700 mb-1">URL du flux (ex: https://...)</label>
        <input
          id="streamUrl"
          type="url" 
          value={streamUrl}
          onChange={(e) => setStreamUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com/stream" // Placeholder added
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="clientSelect" className="block text-sm font-medium text-gray-700 mb-1">Associer au client</label>
        <select
          id="clientSelect"
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="" disabled>Sélectionner un client</option>
          {clients.length === 0 && <option disabled>Aucun client trouvé</option>}
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name} ({client.email})
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          disabled={isLoading}
        >
          Annuler
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Ajout en cours...' : 'Ajouter la caméra'}
        </button>
      </div>
    </form>
  );
} 