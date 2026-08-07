import React, { useState, useEffect } from 'react';
import { Search, Bell, Shield, Cloud, Upload, ChevronDown, Sparkles, Film } from 'lucide-react';
import { UserProfile } from '../../types';

interface NavbarProps {
  activeProfile: UserProfile;
  onOpenProfileSelector: () => void;
  onOpenSearch: () => void;
  onOpenUpload: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeProfile,
  onOpenProfileSelector,
  onOpenSearch,
  onOpenUpload,
  onOpenAdmin,
  onOpenAuth,
  activeTab,
  setActiveTab
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
      isScrolled ? 'bg-[#141414] border-b border-white/5 shadow-2xl' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
    }`}>
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-16 sm:h-20">
        
        {/* Left Section: Netflix Red Brand Logo & Navigation */}
        <div className="flex items-center space-x-6 sm:space-x-10">
          
          <button 
            onClick={() => setActiveTab('accueil')}
            className="flex items-center space-x-2 focus:outline-none group"
          >
            {/* Iconic Netflix Red Typography Logo */}
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-[#E50914] font-sans drop-shadow-md uppercase">
                NETFLIX
              </span>
              <span className="ml-1.5 text-[9px] font-mono bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/40 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest hidden sm:inline">
                PRO SAAS
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-5 text-sm font-normal">
            {[
              { id: 'accueil', label: 'Accueil' },
              { id: 'series', label: 'Séries' },
              { id: 'films', label: 'Films' },
              { id: 'tech', label: 'Nouveautés les plus populaires' },
              { id: 'favoris', label: 'Ma liste' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`transition-colors duration-200 ${
                  activeTab === link.id
                    ? 'text-white font-bold'
                    : 'text-[#e5e5e5]/70 hover:text-[#e5e5e5]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section: Action Controls */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          
          {/* Netflix Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-[#e5e5e5] hover:text-white transition-colors flex items-center gap-2 group"
            title="Rechercher sur Netflix (⌘K)"
          >
            <Search className="w-5 h-5 text-[#e5e5e5] group-hover:text-white transition-colors" />
            <span className="hidden xl:inline text-xs text-[#e5e5e5]/70 font-medium">Rechercher</span>
          </button>

          {/* SaaS Studio Ingestion */}
          <button
            onClick={onOpenUpload}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#2f2f2f]/80 hover:bg-[#333] text-xs font-semibold text-white border border-white/10 transition-colors"
            title="Studio d'Ingestion & Transcodage HLS"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ingestion SaaS</span>
          </button>

          {/* K8s Monitoring */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#2f2f2f]/80 hover:bg-[#333] text-xs font-semibold text-white border border-white/10 transition-colors"
            title="Monitoring Kubernetes Cluster"
          >
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>K8s Stats</span>
          </button>

          {/* Keycloak Security */}
          <button
            onClick={onOpenAuth}
            className="p-2 rounded hover:bg-white/10 text-[#e5e5e5] hover:text-white transition-colors"
            title="Keycloak IAM Security"
          >
            <Shield className="w-4 h-4 text-purple-400" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 text-[#e5e5e5] hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E50914]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-[#181818] border border-white/10 rounded-md shadow-2xl p-4 z-50 text-xs text-[#e5e5e5] animate-in fade-in">
                <div className="font-bold text-white pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                  <span>Notifications Netflix</span>
                  <span className="text-[10px] font-mono text-emerald-400">Temps Réel</span>
                </div>
                <div className="space-y-3">
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <p className="font-semibold text-white">Nouveau Contenu Disponible</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Cyberpulse 4K Ultra HD est désormais disponible dans votre région.</p>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <p className="font-semibold text-white">Transcodage ABR Terminé</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Le master 8K ProRes a été encodé avec succès en 5 profils HLS.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-1.5 focus:outline-none group"
            >
              <img
                src={activeProfile.avatar}
                alt={activeProfile.name}
                className="w-8 h-8 rounded object-cover border border-white/20 group-hover:border-white transition-colors"
              />
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${
                showProfileMenu ? 'rotate-180' : ''
              }`} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-[#181818] border border-white/10 rounded shadow-2xl py-2 z-50 text-xs text-[#e5e5e5]">
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="font-bold text-white truncate">{activeProfile.name}</p>
                  <p className="text-[10px] text-gray-400">{activeProfile.isKids ? 'Profil Enfant' : 'Membre Premium 4K'}</p>
                </div>
                
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenProfileSelector();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#2f2f2f] hover:text-white flex items-center space-x-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#E50914]" />
                  <span>Changer de profil</span>
                </button>

                <div className="border-t border-white/10 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenProfileSelector();
                    }}
                    className="w-full text-center py-2 text-gray-400 hover:text-white transition-colors font-semibold"
                  >
                    Se déconnecter de Netflix
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
