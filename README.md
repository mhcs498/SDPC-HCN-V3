# SDPC-HCN — Sistema Digital do Processo Clínico
### Hospital Central de Nampula · República de Moçambique · Ministério da Saúde (SNS)

O **SDPC-HCN** é uma plataforma hospitalar e prontuário médico eletrónico concebida para digitalizar a gestão clínica, internamento, acompanhamento intensivo e estatísticas do Hospital Central de Nampula (HCN), a maior unidade sanitária de referência da região norte de Moçambique.

---

## 📌 Sumário
1. [Visão Geral & Módulos](#-visão-geral--módulos)
2. [Estrutura do Sistema & Formulários Clínicos](#-estrutura-do-sistema--formulários-clínicos)
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4. [Configuração do Ambiente Local (Passo a Passo)](#-configuração-do-ambiente-local-passo-a-passo)
   - [Opção 1: Execução Direta (Sem Node.js)](#opção-1-execução-direta-sem-nodejs)
   - [Opção 2: Servidor de Desenvolvimento Vite + Node.js](#opção-2-servidor-de-desenvolvimento-vite--nodejs)
   - [Opção 3: Servidor Local com Python ou PHP](#opção-3-servidor-local-com-python-ou-php)
   - [Opção 4: Docker & Nginx](#opção-4-docker--nginx)
5. [Credenciais Padrão & Segurança](#-credenciais-padrão--segurança)
6. [Armazenamento & Persistência de Dados](#-armazenamento--persistência-de-dados)
7. [Relatórios Estatísticos & Indicadores de Gestão (TOC)](#-relatórios-estatísticos--indicadores-de-gestão-toc)
8. [Estrutura de Ficheiros do Projeto](#-estrutura-de-ficheiros-do-projeto)
9. [Solução de Problemas (Troubleshooting)](#-solução-de-problemas-troubleshooting)

---

## 🏥 Visão Geral & Módulos

O sistema divide-se em dois fluxos principais com acesso segmentado:

### 1. Portal Público (Cidadãos)
- **Marcação Online de Consultas**: Formulário com validação de Nome, Contacto Telefónico, Bilhete de Identidade (BI), Seleção de Proveniência (Distritos da Província de Nampula: Cidade, Nacala, Ilha de Moçambique, Ribáuè, Moma, etc.) e Motivo da Consulta.
- **Protocolo Único**: Geração automática de comprovativo (`APT-XXXXXX`) armazenado em fila de agendamento.

### 2. Portal dos Profissionais de Saúde
Acesso direcionado para os 10 departamentos clínicos do HCN:
1. `BS` — Banco de Socorros
2. `CE` — Consulta Externa
3. `Ped` — Pediatria
4. `G.Obs` — Ginecologia e Obstetrícia
5. `Cir` — Cirurgia Geral
6. `Orto` — Ortopedia e Traumatologia
7. `Neuroc` — Neurocirurgia
8. `Med.I` — Medicina Interna
9. `SRA` — Serviço de Reanimação Adulto (Cuidados Intensivos/Urgência)
10. `Onco` — Oncologia

---

## 📋 Estrutura do Sistema & Formulários Clínicos

O SDPC-HCN padroniza a documentação hospitalar através de 8 formulários e um Painel Geral (Dashboard):

- **🏠 Painel Principal (Dashboard)**: Resumo em tempo real com estatísticas (Doentes registados, atualizados no dia, formulários preenchidos, taxa de preenchimento global), atalhos de ações rápidas, e lista dos doentes mais recentes.
- **F1 — Internamento Geral**: Dados demográficos, registo de admissão, acompanhantes de referência e emergência, atribuição de cama/serviço, tipo de admissão (1 a 9) e motivo de admissão (1 a 6).
- **F2 — História Clínica (Anamnese)**: Queixas principais, história da doença atual, antecedentes médicos e patologias pregressas (HTA, DM, Asma, TB, etc.), história familiar, histórico psicossocial e Revisão por Sistemas (ROS em 16 sistemas).
- **F3 — Exame Físico**: Estado geral, Escala de Coma de Glasgow, constantes vitais (TA, FC, FR, Temp, SpO₂, Glicemia, IMC), cabeça e pescoço, auscultação cardiopulmonar, palpação abdominal, exames especiais e hipóteses de diagnóstico.
- **F4 — Registo Clínico de Saída**: Tipo de alta (Curado, Melhorado, Transferência, etc.), complicações, cálculo automático dos dias de hospitalização, Classificação Internacional/OMS e bloco de Registo de Óbito e Espólio.
- **F5 — Diário Clínico**: Evolução médica por turno, prescrição e tratamentos, registo de análises laboratoriais e exames imagiológicos (Rx, TAC, Ecografia) com upload de imagens médicas em Base64 e zoom modal.
- **F6 — Diário de Enfermagem**: Registo de evolução pelo corpo de enfermagem, horários de administração medicamentosa, monitorização de sinais vitais e procedimentos invasivos.
- **F7 — Diário Clínico SRA**: Módulo específico para Reanimação e Cuidados Intensivos com cálculo automático da Escala de Glasgow (AO + RV + RM = 3 a 15), dispositivos invasivos (SNG, CVP, Algalea), balanço de extremos de 24h e prognóstico.
- **F8 — Monitorização SRA & Curvas Vitais**:
  - **Curvas Gráficas Interativas (24h)**: Pontos clicáveis com desenho SVG contínuo para Tensão Arterial Sistólica (60-220 mmHg), Pulso (40-180 bpm) e Temperatura (34-42 °C).
  - **Grelha de Fluidoterapia (24h)**: Controlo rigoroso de Entradas (soros/medicação) vs. Saídas (urina e perdas/drenos) com cálculo dinâmico do Balanço Hídrico horariamente.

---

## 💻 Tecnologias Utilizadas

- **Frontend & Interface**: HTML5 semântico, CSS3 (CSS Grid, Flexbox, Variáveis CSS, Glassmorphism e estilos dedicados para impressão `@media print`).
- **Lógica & Interatividade**: JavaScript Vanilla (ES6+) moderno com tipagem flexível e manipulação nativa de DOM.
- **Criptografia**: Web Cryptography API (`crypto.subtle.digest('SHA-256')`) com salt para armazenamento seguro de credenciais.
- **Armazenamento**: LocalStorage API estruturado para funcionamento 100% autônomo e sem falhas de conexão de rede.
- **Gráficos & Imagiologia**: SVG dinâmico gerado em tempo real e FileReader API para imagens médicas.
- **Exportação & Relatórios**: Geração em Blob de ficheiros compatíveis com Microsoft Word (`.doc`) e Microsoft Excel (`.xls`), e folha de estilo A4 para impressoras físicas.

---

## 🛠️ Configuração do Ambiente Local (Passo a Passo)

### Pré-requisitos Recomendados
- **Navegador Web**: Qualquer navegador moderno com suporte a ES6 e Web Cryptography (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari ou Brave).
- **Node.js (Opcional, para execução com Vite)**: Versão 18.x ou 20.x LTS (caso opte pelo ambiente Vite/NPM).

---

### Opção 1: Execução Direta (Sem Node.js — Mais Rápida)

Como o arquivo original é autocontido (Single File Component):

1. **Baixar ou clonar o projeto**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <PASTA_DO_PROJETO>
   ```
2. **Abrir diretamente o arquivo no navegador**:
   - Dê um duplo clique no arquivo `sdpc-hcn.html` ou
   - Clique com o botão direito -> **Abrir com** -> **Google Chrome** (ou seu navegador de preferência).
3. **Ou através do terminal**:
   - **Linux**: `xdg-open sdpc-hcn.html`
   - **macOS**: `open sdpc-hcn.html`
   - **Windows**: `start sdpc-hcn.html`

> 💡 *Dica*: Esta opção não requer instalação de pacotes ou servidores, ideal para computadores de enfermarias ou locais com internet limitada.

---

### Opção 2: Servidor de Desenvolvimento Vite + Node.js (Ambiente Completo)

Se estiver utilizando a estrutura de workspace com React, Vite e Tailwind CSS:

1. **Verificar a versão do Node.js e NPM**:
   ```bash
   node -v
   npm -v
   ```
   *(Recomenda-se Node.js >= 18.0.0)*

2. **Instalar as dependências do projeto**:
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente**:
   Copie o arquivo de exemplo para criar o `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Se for utilizar rotas de IA opcionais, configure a sua `GEMINI_API_KEY`, caso contrário deixe com o valor padrão)*

4. **Iniciar o Servidor Local**:
   ```bash
   npm run dev
   ```
   O terminal exibirá o endereço local:
   ```text
   VITE v6.x / v8.x ready in 250 ms

   ➜  Local:   http://localhost:3000/
   ➜  Network: http://<seu-ip>:3000/
   ```

5. **Acessar a aplicação**:
   Abra `http://localhost:3000` no seu navegador. O aplicativo carregará o portal integrado com a documentação interativa e o sistema SDPC-HCN em tempo real.

6. **Para compilar a versão final para produção**:
   ```bash
   npm run build
   ```
   Os arquivos otimizados serão gerados na pasta `dist/`.

---

### Opção 3: Servidor Local Leve (Python ou PHP)

Se você não tiver Node.js instalado mas deseja servir via protocolo HTTP (evitando restrições do protocolo `file://`):

- **Com Python 3**:
  ```bash
  python3 -m http.server 8080
  ```
  Acesse no navegador: `http://localhost:8080/sdpc-hcn.html`

- **Com PHP**:
  ```bash
  php -S localhost:8080
  ```
  Acesse no navegador: `http://localhost:8080/sdpc-hcn.html`

- **Com a extensão "Live Server" do VS Code**:
  1. Abra o arquivo no VS Code.
  2. Clique no botão **"Go Live"** na barra inferior.

---

### Opção 4: Docker & Nginx (Para Implantação em Rede Local Hospitalar)

Para instalar num servidor local da intranet hospitalar usando Docker:

1. Crie um arquivo `Dockerfile`:
   ```dockerfile
   FROM nginx:alpine
   COPY sdpc-hcn.html /usr/share/nginx/html/index.html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```
2. Construa a imagem e inicie o contentor:
   ```bash
   docker build -t sdpc-hcn .
   docker run -d -p 80:80 --name hospital-central sdpc-hcn
   ```
3. O sistema estará acessível em qualquer computador da rede local hospitalar pelo IP do servidor: `http://<IP_DO_SERVIDOR>/`.

---

## 🔐 Credenciais Padrão & Segurança

1. **Primeiro Acesso (Bootstrap Admin)**:
   - Ao iniciar pela primeira vez sem dados cadastrados, selecione qualquer departamento (ex: `Med.I` ou `BS`) e clique em **"Criar conta"**.
   - **O primeiro utilizador registado assume automaticamente o papel de Administrador (`admin`)**.
2. **Novos Utilizadores Criados pelo Admin**:
   - No painel de **Gestão de Utilizadores** (botão `👥 Utilizadores` visível apenas para administradores), o gestor pode criar novas contas definindo nome, username, departamento e permissão (`user` ou `admin`).
   - A senha inicial padrão para contas adicionadas via painel é: **`1234`**.
3. **Criptografia**:
   - As senhas nunca são guardadas em texto plano. São hasheadas com SHA-256 e uma chave de salt antes de serem salvas.

---

## 💾 Armazenamento & Persistência de Dados

Todos os registos são armazenados no `localStorage` do navegador do cliente:

| Chave | Descrição |
|---|---|
| `sdpc_hcn_users` | Cadastro de utilizadores do hospital, departamentos e hashes de senha. |
| `sdpc_hcn_session` | Sessão ativa do profissional conectado. |
| `sdpc_hcn_patients` | Prontuários completos, doentes, formulários F1 a F8, curvas vitais e imagens. |
| `sdpc_appointments` | Fila de marcações efetuadas pelo portal público de cidadãos. |

> ⚠️ **Backup Recomendado**: Use periodicamente a função de exportação de dados (botão de backup JSON) para salvaguardar os dados dos doentes num dispositivo de armazenamento externo seguro.

---

## 📊 Relatórios Estatísticos & Indicadores de Gestão (TOC)

O sistema inclui um módulo de inteligência hospitalar com cálculo oficial da **Taxa de Ocupação de Camas (TOC)** do Ministério da Saúde:

$$\text{TOC (\%)} = \frac{\text{Total de Dias de Internamento do Período}}{\text{Camas Disponíveis} \times \text{Dias do Período}} \times 100$$

- **Classificação**: Baixa (<50%), Moderada (50-74%), Alta (75-89%) e Crítica (≥90%).
- **Exportações Disponíveis**:
  - 📄 **Microsoft Word (.doc)**: Relatório formatado com cabeçalho institucional do SNS, tabelas e síntese clínica.
  - 📊 **Microsoft Excel (.xls)**: Planilha detalhada com listagem nominal de doentes, tempo de internamento e desfechos.
  - 🖨️ **Impressão / PDF**: Layout A4 em alta resolução.

---

## 📁 Estrutura de Ficheiros do Projeto

```text
├── README.md               # Documentação detalhada e guia de desenvolvimento local
├── sdpc-hcn.html           # Arquivo autónomo completo do sistema SDPC-HCN
├── metadata.json           # Metadados da aplicação para o ambiente de execução
├── package.json            # Configuração de dependências e scripts de execução
├── tsconfig.json           # Configurações do compilador TypeScript
├── vite.config.ts          # Configuração do empacotador Vite e Tailwind CSS
├── index.html              # Ponto de entrada web
├── public/
│   └── sdpc-hcn.html       # Cópia estática servida diretamente pelo servidor web
└── src/
    ├── App.tsx             # Aplicação interativa com visualizador do sistema e guia local
    ├── main.tsx            # Inicialização do React 19
    └── index.css           # Estilos globais Tailwind
```

---

## ❓ Solução de Problemas (Troubleshooting)

- **Os gráficos de sinais vitais não aparecem**:
  - Verifique se clicou nas células correspondentes à hora e ao valor de TA, pulso ou temperatura. Ao selecionar ao menos 2 pontos horários, as linhas de evolução são traçadas automaticamente.
- **As imagens de Rx e TAC não estão a ser salvas**:
  - Como o armazenamento é no `localStorage` do navegador (limite usual de ~5MB a 10MB por origem), utilize imagens radiográficas comprimidas ou reduza a resolução antes de anexar.
- **Esqueci a senha do Administrador**:
  - No console do navegador (pressionando `F12` -> aba *Console*), digite:
    ```javascript
    localStorage.removeItem('sdpc_hcn_users');
    localStorage.removeItem('sdpc_hcn_session');
    location.reload();
    ```
    Isso reiniciará os utilizadores e o próximo cadastro será o novo administrador.
- **Porta 3000 já em uso (no Vite)**:
  - Altere a porta no comando: `npx vite --port 3001` ou encerre o processo anterior.
