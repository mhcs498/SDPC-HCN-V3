import React, { useState } from 'react';
import {
  BookOpen,
  Terminal,
  Play,
  Copy,
  Check,
  Download,
  Hospital,
  ShieldCheck,
  Server,
  Layers,
  FileText,
  Activity,
  ExternalLink,
  Laptop,
  CheckCircle2,
  HardDrive,
  AlertTriangle
} from 'lucide-react';
import Troubleshooting404 from './components/Troubleshooting404.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<'app' | '404' | 'guide' | 'readme'>('app');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadFile = (filename: string, path: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
              <Hospital className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-wide">SDPC-HCN</span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">
                  v1.0 Produção
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hospital Central de Nampula · República de Moçambique (SNS)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 text-xs font-medium gap-1">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'app'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              Sistema Clínico (SDPC-HCN)
            </button>
            <button
              onClick={() => setActiveTab('404')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === '404'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-amber-300 hover:text-amber-100 hover:bg-amber-950/40'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Solução do Erro 404
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'guide'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Guia Local
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'readme'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              README.md
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        {/* TAB: Sistema Clínico (SDPC-HCN) */}
        {activeTab === 'app' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-white">SDPC-HCN em Execução Direta</span>
                <span className="text-slate-500 hidden md:inline">· Pronto para Marcações, Internamento e SRA</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="./sdpc-hcn.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                >
                  Ecrã Completo <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Iframe with relative path './sdpc-hcn.html' so it resolves on any host */}
            <div className="w-full h-[820px] rounded-2xl overflow-hidden border border-slate-800 bg-white shadow-2xl">
              <iframe
                src="./sdpc-hcn.html"
                title="SDPC-HCN Sistema Digital do Processo Clínico"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

        {/* TAB: Diagnóstico e Solução 404 */}
        {activeTab === '404' && <Troubleshooting404 />}

        {/* TAB: Guia de Configuração Local */}
        {activeTab === 'guide' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-950 border border-emerald-500/20 p-6 lg:p-8">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <Laptop className="w-3.5 h-3.5" />
                  Instalação e Execução Local
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Configurar o SDPC-HCN no seu ambiente local
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  O SDPC-HCN foi projetado para funcionar com 100% de autonomia e resiliência. Você pode executá-lo diretamente
                  em qualquer computador ou enfermaria com 0 dependências ou usar o ambiente completo Node.js + Vite.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => downloadFile('README.md', './README.md')}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    Baixar README.md
                  </button>
                  <button
                    onClick={() => downloadFile('sdpc-hcn.html', './sdpc-hcn.html')}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    Baixar sdpc-hcn.html
                  </button>
                </div>
              </div>
            </div>

            {/* Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Method 1 */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-0.5 rounded">
                    Método 1 · Mais Rápido
                  </span>
                  <span className="text-xs text-slate-400">0 Dependências</span>
                </div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Abrir Diretamente no Navegador
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Basta clicar duas vezes em <code className="text-emerald-400">sdpc-hcn.html</code> ou abrir com Chrome/Firefox/Edge.
                </p>
                <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center justify-between bg-slate-900 px-2 py-1.5 rounded">
                    <span className="truncate">xdg-open sdpc-hcn.html # Linux</span>
                    <button
                      onClick={() => copyToClipboard('xdg-open sdpc-hcn.html', 'opt1-linux')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedKey === 'opt1-linux' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Method 2 */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2.5 py-0.5 rounded">
                    Método 2 · Vite + Node.js
                  </span>
                  <span className="text-xs text-slate-400">Node ≥ 18</span>
                </div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  Ambiente de Desenvolvimento Vite
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Com servidor local na porta 3000.
                </p>
                <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center justify-between bg-slate-900 px-2 py-1.5 rounded">
                    <span>npm install && npm run dev</span>
                    <button
                      onClick={() => copyToClipboard('npm install && npm run dev', 'opt2')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedKey === 'opt2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: README Viewer */}
        {activeTab === 'readme' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">Visualizador do Documento README.md</span>
              </div>
              <button
                onClick={() => downloadFile('README.md', './README.md')}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Descarregar README.md
              </button>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6 text-slate-300 text-sm leading-relaxed">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-extrabold text-white">SDPC-HCN — Hospital Central de Nampula</h1>
                <p className="text-emerald-400 text-xs mt-1">Ministério da Saúde de Moçambique (SNS)</p>
              </div>
              <p>
                Consulte o ficheiro <code className="text-emerald-300">README.md</code> completo na raiz do repositório
                com todas as instruções de deployment, fórmulas da Taxa de Ocupação de Cama (TOC), módulo SRA e segurança com hashing SHA-256.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        SDPC-HCN · Hospital Central de Nampula · Ministério da Saúde de Moçambique
      </footer>
    </div>
  );
}
