import React from 'react';
import { ShieldCheck, Cpu, HardDrive, Server, Zap, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-1000 border-t border-slate-900 pt-12 pb-8 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architecture Badges & Tech Stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-slate-900">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Keycloak Security</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">OIDC, OAuth2, JWT RS256 & MFA natif</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-slate-900 text-brand-500 border border-slate-800">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Transcodage HLS / DASH</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">5 profils ABR (240p à 4K UHD)</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-slate-900 text-accent-purple border border-slate-800">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Kafka & Redis Engine</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Events streaming & Cache sub-millisecond</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-slate-900 text-accent-cyan border border-slate-800">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Spring Boot 3 + Java 21</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Architecture Hexagonale & DDD</p>
            </div>
          </div>
        </div>

        {/* Global Cluster Status & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Région europe-west3 (Frankfurt Edge): 100% Fonctionnel
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-[11px] text-slate-500">
              SLA 99.999% • Latence 12ms
            </span>
          </div>

          <div className="flex items-center space-x-6 text-slate-500 text-[11px]">
            <a href="#" className="hover:text-slate-300 transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Conditions Générales Enterprise</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Documentation API (OpenAPI 3.0)</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Matrice de Sécurité OWASP</a>
          </div>
        </div>

        <div className="mt-6 text-center text-slate-600 text-[11px]">
          © {new Date().getFullYear()} AETHER STREAM SaaS Enterprise Inc. Développé aux normes des équipes d'ingénierie Google, Netflix, Amazon, Apple & Microsoft.
        </div>

      </div>
    </footer>
  );
};
