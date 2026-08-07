import React, { useState } from 'react';
import { Shield, Key, Lock, CheckCircle, Smartphone, Laptop, Tv, Sparkles, RefreshCw, X } from 'lucide-react';

interface KeycloakAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeycloakAuthModal: React.FC<KeycloakAuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'mfa' | 'jwt' | 'sessions'>('jwt');
  const [mfaCode, setMfaCode] = useState('');
  const [mfaVerified, setMfaVerified] = useState(true);

  if (!isOpen) return null;

  const mockJWT = {
    header: {
      alg: "RS256",
      typ: "JWT",
      kid: "keycloak-aether-rsa-2026"
    },
    payload: {
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      iss: "https://auth.aetherstream.io/realms/enterprise",
      sub: "usr_99814-faang-eng",
      preferred_username: "alexandre.dev@aetherstream.io",
      email_verified: true,
      realm_access: {
        roles: ["TENANT_ADMIN", "STREAMER_4K_ULTRA", "MODERATOR"]
      },
      tenant_id: "tenant-enterprise-google-netflix",
      mfa_verified: true
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/50 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 pb-6 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Keycloak IAM Security & OAuth2 Framework</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              OpenID Connect (OIDC) • JWS RS256 • MFA TOTP Enforcement
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 mt-6 pb-3">
          {[
            { id: 'jwt', label: 'Décodeur Token JWT RS256', icon: Key },
            { id: 'mfa', label: 'Vérification MFA (TOTP)', icon: Lock },
            { id: 'sessions', label: 'Sessions & Appareils Actifs', icon: Laptop },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl font-semibold text-xs transition-all flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/40 shadow-glow-purple'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          
          {/* JWT Token Decoder */}
          {activeTab === 'jwt' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Algorithme: <strong className="text-emerald-400">RS256 (Clé Publique Keycloak)</strong></span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Token Valide (1 heure restante)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Header */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-brand-500 font-bold text-xs uppercase tracking-wider block">1. Header (Algorithme & Key ID)</span>
                  <pre className="text-slate-300 text-[11px] overflow-x-auto p-2 bg-slate-900 rounded-xl border border-slate-850">
                    {JSON.stringify(mockJWT.header, null, 2)}
                  </pre>
                </div>

                {/* Payload */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-purple-400 font-bold text-xs uppercase tracking-wider block">2. Payload (Claims Keycloak & RBAC)</span>
                  <pre className="text-slate-300 text-[11px] overflow-x-auto p-2 bg-slate-900 rounded-xl border border-slate-850 max-h-60">
                    {JSON.stringify(mockJWT.payload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* MFA Verification */}
          {activeTab === 'mfa' && (
            <div className="max-w-md mx-auto py-6 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Authentification Forte à Deux Facteurs (MFA)</h3>
              <p className="text-xs text-slate-400">
                Saisissez le code à 6 chiffres généré par votre application Google Authenticator ou YubiKey TOTP.
              </p>

              <div className="flex justify-center space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="849201"
                  className="w-48 text-center text-2xl tracking-widest font-mono py-3 rounded-xl bg-slate-950 border border-purple-500 text-white focus:outline-none"
                />
              </div>

              {mfaVerified && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> MFA Vérifié avec Succès pour Alexandre (Staff Eng)
                </div>
              )}
            </div>
          )}

          {/* Active Sessions */}
          {activeTab === 'sessions' && (
            <div className="space-y-3 font-mono text-xs">
              <h4 className="font-bold text-white text-sm">Sessions OAuth2 Actives (Gestion à distance Keycloak)</h4>
              
              <div className="space-y-2">
                {[
                  { device: 'MacBook Pro 16" M3 Max (Chrome 128)', loc: 'Paris, France', ip: '194.254.12.98', icon: Laptop, isCurrent: true },
                  { device: 'Apple TV 4K (Aether Native App)', loc: 'Frankfurt, Allemagne', ip: '82.165.44.12', icon: Tv, isCurrent: false },
                  { device: 'iPhone 15 Pro (iOS 18)', loc: 'Paris, France', ip: '194.254.12.99', icon: Smartphone, isCurrent: false }
                ].map((sess, idx) => {
                  const Icon = sess.icon;
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="font-bold text-white flex items-center gap-2">
                            {sess.device}
                            {sess.isCurrent && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                                Appareil Actuel
                              </span>
                            )}
                          </p>
                          <span className="text-[10px] text-slate-500">{sess.loc} • IP: {sess.ip}</span>
                        </div>
                      </div>
                      {!sess.isCurrent && (
                        <button className="px-3 py-1 rounded bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-[10px] font-bold">
                          Révoquer Session
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
