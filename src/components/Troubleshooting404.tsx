import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  Server,
  FolderGit2,
  Terminal,
  FileCode,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

export default function Troubleshooting404() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Alert Header */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-amber-200 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Diagnóstico do Erro: "404 NOT_FOUND — This page doesn’t exist"
            </h2>
            <p className="text-xs text-amber-300/90">
              Erro comum ao publicar aplicações Vite na Vercel, Netlify, Cloud Run ou GitHub Pages.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Esse erro acontece quando o servidor de hospedagem procura os ficheiros na pasta errada (por exemplo, na raiz em vez da pasta <code className="bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded">dist</code>),
          quando falta a regra de reescrita SPA (<code className="bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded">vercel.json</code> / <code className="bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded">_redirects</code>),
          ou quando o caminho base não é relativo. Já aplicamos as correções nos arquivos do projeto!
        </p>
      </div>

      {/* 4 Soluções Práticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
        {/* Solução 1: Vercel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              1. Publicação na Vercel
            </span>
            <span className="text-[11px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded font-mono">
              vercel.json
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Configure as definições do projeto no painel da Vercel:
          </p>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
            <div><span className="text-slate-500">Framework Preset:</span> <strong className="text-emerald-400">Vite</strong></div>
            <div><span className="text-slate-500">Build Command:</span> <code className="text-cyan-300">npm run build</code></div>
            <div><span className="text-slate-500">Output Directory:</span> <code className="text-emerald-300">dist</code></div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 truncate">Adicionado vercel.json de rewrites</span>
            <button
              onClick={() => copy('{\n  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]\n}', 'vjson')}
              className="text-slate-400 hover:text-white ml-2"
            >
              {copiedKey === 'vjson' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Solução 2: Netlify */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              2. Publicação na Netlify
            </span>
            <span className="text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
              _redirects
            </span>
          </div>
          <p className="text-xs text-slate-400">
            No Netlify, defina a pasta de publicação como <code className="text-emerald-400">dist</code>:
          </p>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
            <div><span className="text-slate-500">Publish directory:</span> <strong className="text-emerald-400">dist</strong></div>
            <div><span className="text-slate-500">Build command:</span> <code className="text-cyan-300">npm run build</code></div>
          </div>
          <p className="text-xs text-slate-400">
            Criamos automaticamente o arquivo <code className="text-slate-300">public/_redirects</code> com <code className="text-emerald-400">/* /index.html 200</code>.
          </p>
        </div>

        {/* Solução 3: GitHub Pages */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-400" />
              3. GitHub Pages / Subdiretórios
            </span>
            <span className="text-[11px] bg-purple-950 text-purple-400 border border-purple-800 px-2 py-0.5 rounded font-mono">
              base: './'
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Se hospedar sob um repositório como <code className="text-slate-300">usuario.github.io/app/</code>, os caminhos absolutos <code className="text-rose-400">/assets/</code> dão 404.
          </p>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300">
            ✓ vite.config.ts configurado com base: './' (caminhos relativos automáticos)
          </div>
        </div>

        {/* Solução 4: Executar Pré-visualização Localmente */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              4. Testar o Build Antes de Publicar
            </span>
            <span className="text-[11px] bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded font-mono">
              npm run preview
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Para testar exatamente a versão compilada no seu computador antes de subir para a nuvem:
          </p>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
            <div className="flex items-center justify-between">
              <code>npm run build</code>
              <button onClick={() => copy('npm run build', 'bld')} className="text-slate-400 hover:text-white">
                {copiedKey === 'bld' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <code>npm run preview</code>
              <button onClick={() => copy('npm run preview', 'prv')} className="text-slate-400 hover:text-white">
                {copiedKey === 'prv' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist de Validação */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Checklist de Correções já Aplicadas no seu Projeto:
        </h3>
        <ul className="text-xs space-y-2 text-slate-300">
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><code className="text-emerald-300">vite.config.ts</code>: Corrigido com <code className="text-slate-400">base: './'</code> e porta 3000 vinculada a <code className="text-slate-400">0.0.0.0</code>.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><code className="text-emerald-300">vercel.json</code>: Criado com rota de reescrita para evitar 404 em navegações internas e recargas.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><code className="text-emerald-300">public/_redirects</code>: Criado para suporte a Netlify e Cloudflare Pages.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><code className="text-emerald-300">package.json</code>: Script <code className="text-cyan-300">"preview"</code> ajustado para rodar em <code className="text-slate-400">--port=3000 --host=0.0.0.0</code>.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
