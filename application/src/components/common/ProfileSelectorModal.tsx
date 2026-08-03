import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { X, Plus, Check, Edit2 } from 'lucide-react';

interface ProfileSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: UserProfile[];
  activeProfile: UserProfile;
  onSelectProfile: (profile: UserProfile) => void;
  onAddProfile: (newProfile: UserProfile) => void;
}

export const ProfileSelectorModal: React.FC<ProfileSelectorModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeProfile,
  onSelectProfile,
  onAddProfile
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [isKids, setIsKids] = useState(false);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newProf: UserProfile = {
      id: `p-${Date.now()}`,
      name: newName.trim(),
      avatar: isKids
        ? 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      isKids,
      language: 'Français',
      autoplayNext: true
    };
    onAddProfile(newProf);
    onSelectProfile(newProf);
    setNewName('');
    setIsAdding(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141414] animate-in fade-in select-none">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-2 text-gray-400 hover:text-white rounded-full bg-[#181818] transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-4xl text-center">
        
        {!isAdding ? (
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-12 font-sans">
              Qui visionne ?
            </h1>

            {/* Profile Tiles Grid */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-14">
              {profiles.map((profile) => {
                const isActive = profile.id === activeProfile.id;
                return (
                  <button
                    key={profile.id}
                    onClick={() => {
                      onSelectProfile(profile);
                      onClose();
                    }}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div className="relative mb-3">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className={`w-28 h-28 sm:w-36 sm:h-36 rounded-md object-cover transition-all duration-300 transform group-hover:scale-105 group-hover:border-4 group-hover:border-white ${
                          isActive
                            ? 'border-4 border-[#E50914] shadow-netflix-red'
                            : 'border-2 border-transparent opacity-80 group-hover:opacity-100'
                        }`}
                      />
                      {isActive && (
                        <div className="absolute -top-2 -right-2 bg-[#E50914] text-white p-1 rounded-full shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      {profile.isKids && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[9px] uppercase">
                          Kids
                        </span>
                      )}
                    </div>
                    <span className={`text-base font-medium transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {profile.name}
                    </span>
                  </button>
                );
              })}

              {/* Add Profile Tile */}
              <button
                onClick={() => setIsAdding(true)}
                className="flex flex-col items-center group focus:outline-none"
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-md border-2 border-dashed border-gray-600 group-hover:border-white flex items-center justify-center bg-[#181818] transition-all mb-3">
                  <Plus className="w-10 h-10 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-base font-medium text-gray-400 group-hover:text-white">
                  Ajouter un profil
                </span>
              </button>
            </div>

            {/* Manage Profiles Button */}
            <button
              onClick={onClose}
              className="px-8 py-2.5 border border-gray-500 text-gray-400 hover:border-white hover:text-white font-semibold text-xs tracking-widest uppercase transition-all duration-200"
            >
              Gérer les profils
            </button>

          </div>
        ) : (
          <form onSubmit={handleCreate} className="max-w-md mx-auto bg-[#181818] p-8 rounded-md border border-white/10 text-left">
            <h2 className="text-3xl font-bold text-white mb-6">Ajouter un profil</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Nom du profil
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="ex: Marie"
                  className="w-full px-4 py-3 bg-[#333] border border-transparent text-white text-sm focus:outline-none focus:border-[#E50914] rounded"
                  autoFocus
                  required
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#2f2f2f] rounded">
                <div>
                  <p className="text-sm font-bold text-white">Profil Enfant ?</p>
                  <p className="text-xs text-gray-400">Titres pour les -12 ans uniquement</p>
                </div>
                <input
                  type="checkbox"
                  checked={isKids}
                  onChange={(e) => setIsKids(e.target.checked)}
                  className="w-5 h-5 accent-[#E50914] cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="w-1/2 py-3 bg-[#333] text-white hover:bg-[#444] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-[#E50914] hover:bg-[#B9090B] text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
