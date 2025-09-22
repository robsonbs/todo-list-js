/**
 * 📚 AULA 7: LocalStorage e Persistência de Dados
 *
 * Sistema educacional progressivo para ensinar LocalStorage, SessionStorage,
 * persistência de dados no navegador e técnicas avançadas de armazenamento.
 *
 * @author Curso JavaScript TODO List
 * @version 1.0.0
 * @license MIT
 */

// ============================================================================
// 🎯 DEMONSTRAÇÃO 1: Conceitos Básicos de Storage
// ============================================================================

class Demo1_ConceitosBasicos {
  constructor() {
    this.chave = "demo1_dados";
    this.inicializar();
  }

  inicializar() {
    this.criarInterface();
    this.verificarSuporteStorage();
    this.carregarDados();
  }

  criarInterface() {
    const container = document.getElementById("demo1");
    if (!container) return;

    container.innerHTML = `
            <div class="card border-primary">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">🔧 Conceitos Básicos de Storage</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>📝 Inserir Dados</h6>
                            <div class="mb-3">
                                <input type="text" id="input-chave" class="form-control mb-2" 
                                       placeholder="Digite uma chave">
                                <input type="text" id="input-valor" class="form-control mb-2" 
                                       placeholder="Digite um valor">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary" onclick="demo1.salvarLocalStorage()">
                                        💾 Salvar no LocalStorage
                                    </button>
                                    <button class="btn btn-secondary" onclick="demo1.salvarSessionStorage()">
                                        🕐 Salvar no SessionStorage
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h6>📊 Dados Salvos</h6>
                            <div id="lista-storage" class="border rounded p-3 bg-light min-height-200">
                                <small class="text-muted">Nenhum dado salvo ainda...</small>
                            </div>
                            <div class="d-grid gap-2 mt-2">
                                <button class="btn btn-info" onclick="demo1.listarTodosStorage()">
                                    📋 Listar Todos os Dados
                                </button>
                                <button class="btn btn-warning" onclick="demo1.limparStorage()">
                                    🗑️ Limpar Storage
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <h6>🔍 Informações do Storage</h6>
                        <div id="info-storage" class="alert alert-info">
                            <div class="row">
                                <div class="col-md-4">
                                    <strong>LocalStorage:</strong><br>
                                    <span id="local-count">0 itens</span><br>
                                    <span id="local-size">0 KB</span>
                                </div>
                                <div class="col-md-4">
                                    <strong>SessionStorage:</strong><br>
                                    <span id="session-count">0 itens</span><br>
                                    <span id="session-size">0 KB</span>
                                </div>
                                <div class="col-md-4">
                                    <strong>Suporte:</strong><br>
                                    <span id="suporte-status">Verificando...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  verificarSuporteStorage() {
    const status = document.getElementById("suporte-status");

    try {
      const testeLocal = window.localStorage;
      const testeSession = window.sessionStorage;

      // Teste de escrita
      localStorage.setItem("teste", "valor");
      localStorage.removeItem("teste");

      status.innerHTML = `
                <span class="text-success">✅ LocalStorage: Suportado</span><br>
                <span class="text-success">✅ SessionStorage: Suportado</span>
            `;
    } catch (error) {
      status.innerHTML = `
                <span class="text-danger">❌ Storage não suportado</span><br>
                <small>${error.message}</small>
            `;
    }
  }

  salvarLocalStorage() {
    const chave = document.getElementById("input-chave").value.trim();
    const valor = document.getElementById("input-valor").value.trim();

    if (!chave || !valor) {
      this.mostrarMensagem("Por favor, preencha chave e valor!", "warning");
      return;
    }

    try {
      localStorage.setItem(chave, valor);
      this.mostrarMensagem(
        `✅ Salvo no LocalStorage: ${chave} = ${valor}`,
        "success"
      );
      this.limparInputs();
      this.atualizarListaStorage();
      this.atualizarEstatisticas();
    } catch (error) {
      this.mostrarMensagem(`❌ Erro ao salvar: ${error.message}`, "danger");
    }
  }

  salvarSessionStorage() {
    const chave = document.getElementById("input-chave").value.trim();
    const valor = document.getElementById("input-valor").value.trim();

    if (!chave || !valor) {
      this.mostrarMensagem("Por favor, preencha chave e valor!", "warning");
      return;
    }

    try {
      sessionStorage.setItem(chave, valor);
      this.mostrarMensagem(
        `✅ Salvo no SessionStorage: ${chave} = ${valor}`,
        "success"
      );
      this.limparInputs();
      this.atualizarListaStorage();
      this.atualizarEstatisticas();
    } catch (error) {
      this.mostrarMensagem(`❌ Erro ao salvar: ${error.message}`, "danger");
    }
  }

  listarTodosStorage() {
    this.atualizarListaStorage();
  }

  atualizarListaStorage() {
    const lista = document.getElementById("lista-storage");
    let html = "";

    // LocalStorage
    html += '<div class="mb-3"><h6 class="text-primary">💾 LocalStorage</h6>';
    if (localStorage.length === 0) {
      html += '<small class="text-muted">Vazio</small>';
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        const valor = localStorage.getItem(chave);
        html += `
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span><strong>${chave}:</strong> ${valor}</span>
                        <button class="btn btn-sm btn-outline-danger" 
                                onclick="demo1.removerItem('local', '${chave}')">🗑️</button>
                    </div>
                `;
      }
    }
    html += "</div>";

    // SessionStorage
    html += '<div><h6 class="text-secondary">🕐 SessionStorage</h6>';
    if (sessionStorage.length === 0) {
      html += '<small class="text-muted">Vazio</small>';
    } else {
      for (let i = 0; i < sessionStorage.length; i++) {
        const chave = sessionStorage.key(i);
        const valor = sessionStorage.getItem(chave);
        html += `
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span><strong>${chave}:</strong> ${valor}</span>
                        <button class="btn btn-sm btn-outline-danger" 
                                onclick="demo1.removerItem('session', '${chave}')">🗑️</button>
                    </div>
                `;
      }
    }
    html += "</div>";

    lista.innerHTML = html;
  }

  removerItem(tipo, chave) {
    try {
      if (tipo === "local") {
        localStorage.removeItem(chave);
      } else {
        sessionStorage.removeItem(chave);
      }
      this.mostrarMensagem(`🗑️ Item removido: ${chave}`, "info");
      this.atualizarListaStorage();
      this.atualizarEstatisticas();
    } catch (error) {
      this.mostrarMensagem(`❌ Erro ao remover: ${error.message}`, "danger");
    }
  }

  limparStorage() {
    if (confirm("⚠️ Deseja limpar TODOS os dados do storage?")) {
      localStorage.clear();
      sessionStorage.clear();
      this.mostrarMensagem("🗑️ Storage limpo com sucesso!", "success");
      this.atualizarListaStorage();
      this.atualizarEstatisticas();
    }
  }

  atualizarEstatisticas() {
    // LocalStorage
    const localCount = localStorage.length;
    let localSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      const valor = localStorage.getItem(chave);
      localSize += (chave + valor).length;
    }

    // SessionStorage
    const sessionCount = sessionStorage.length;
    let sessionSize = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
      const chave = sessionStorage.key(i);
      const valor = sessionStorage.getItem(chave);
      sessionSize += (chave + valor).length;
    }

    document.getElementById("local-count").textContent = `${localCount} itens`;
    document.getElementById("local-size").textContent = `${(
      localSize / 1024
    ).toFixed(2)} KB`;
    document.getElementById(
      "session-count"
    ).textContent = `${sessionCount} itens`;
    document.getElementById("session-size").textContent = `${(
      sessionSize / 1024
    ).toFixed(2)} KB`;
  }

  carregarDados() {
    this.atualizarListaStorage();
    this.atualizarEstatisticas();
  }

  limparInputs() {
    document.getElementById("input-chave").value = "";
    document.getElementById("input-valor").value = "";
  }

  mostrarMensagem(mensagem, tipo) {
    // Criar elemento de mensagem temporária
    const div = document.createElement("div");
    div.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    div.style.cssText =
      "top: 20px; right: 20px; z-index: 1050; max-width: 300px;";
    div.innerHTML = `
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(div);

    // Remove após 3 segundos
    setTimeout(() => {
      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }, 3000);
  }
}

// ============================================================================
// 🎯 DEMONSTRAÇÃO 2: Trabalhando com Objetos JSON
// ============================================================================

class Demo2_ObjetosJSON {
  constructor() {
    this.chave = "demo2_objetos";
    this.dados = [];
    this.inicializar();
  }

  inicializar() {
    this.criarInterface();
    this.carregarDados();
  }

  criarInterface() {
    const container = document.getElementById("demo2");
    if (!container) return;

    container.innerHTML = `
            <div class="card border-success">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0">📊 Objetos JSON no Storage</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>👤 Adicionar Pessoa</h6>
                            <form id="form-pessoa" class="mb-3">
                                <div class="mb-2">
                                    <input type="text" id="nome" class="form-control" 
                                           placeholder="Nome completo" required>
                                </div>
                                <div class="mb-2">
                                    <input type="email" id="email" class="form-control" 
                                           placeholder="Email" required>
                                </div>
                                <div class="mb-2">
                                    <input type="number" id="idade" class="form-control" 
                                           placeholder="Idade" min="1" max="120" required>
                                </div>
                                <div class="mb-2">
                                    <select id="cidade" class="form-select" required>
                                        <option value="">Selecione a cidade</option>
                                        <option value="São Paulo">São Paulo</option>
                                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                                        <option value="Belo Horizonte">Belo Horizonte</option>
                                        <option value="Brasília">Brasília</option>
                                        <option value="Salvador">Salvador</option>
                                    </select>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-success">
                                        ➕ Adicionar Pessoa
                                    </button>
                                    <button type="button" class="btn btn-info" onclick="demo2.gerarDadosAleatorios()">
                                        🎲 Gerar Dados Aleatórios
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div class="col-md-6">
                            <h6>📋 Lista de Pessoas</h6>
                            <div id="lista-pessoas" class="border rounded p-3 bg-light min-height-300">
                                <small class="text-muted">Nenhuma pessoa cadastrada...</small>
                            </div>
                            <div class="d-grid gap-2 mt-2">
                                <button class="btn btn-warning" onclick="demo2.exportarDados()">
                                    📤 Exportar JSON
                                </button>
                                <button class="btn btn-danger" onclick="demo2.limparTodos()">
                                    🗑️ Limpar Todos
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <h6>📈 Estatísticas</h6>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary" id="total-pessoas">0</h5>
                                        <p class="card-text">Total de Pessoas</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title text-success" id="idade-media">0</h5>
                                        <p class="card-text">Idade Média</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title text-info" id="cidade-popular">-</h5>
                                        <p class="card-text">Cidade Mais Popular</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title text-warning" id="tamanho-dados">0 KB</h5>
                                        <p class="card-text">Tamanho dos Dados</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Adicionar event listener para o formulário
    document.getElementById("form-pessoa").addEventListener("submit", (e) => {
      e.preventDefault();
      this.adicionarPessoa();
    });
  }

  adicionarPessoa() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    const cidade = document.getElementById("cidade").value;

    if (!nome || !email || !idade || !cidade) {
      this.mostrarMensagem("Por favor, preencha todos os campos!", "warning");
      return;
    }

    const pessoa = {
      id: Date.now(),
      nome,
      email,
      idade,
      cidade,
      dataAdicionada: new Date().toISOString(),
    };

    this.dados.push(pessoa);
    this.salvarDados();
    this.renderizarLista();
    this.atualizarEstatisticas();
    this.limparFormulario();
    this.mostrarMensagem(`✅ ${nome} adicionado com sucesso!`, "success");
  }

  gerarDadosAleatorios() {
    const nomes = [
      "Ana Silva",
      "João Santos",
      "Maria Oliveira",
      "Carlos Lima",
      "Fernanda Costa",
      "Ricardo Souza",
      "Juliana Pereira",
      "Marcos Alves",
    ];
    const emails = [
      "ana@email.com",
      "joao@email.com",
      "maria@email.com",
      "carlos@email.com",
      "fernanda@email.com",
      "ricardo@email.com",
      "juliana@email.com",
      "marcos@email.com",
    ];
    const cidades = [
      "São Paulo",
      "Rio de Janeiro",
      "Belo Horizonte",
      "Brasília",
      "Salvador",
    ];

    for (let i = 0; i < 5; i++) {
      const pessoa = {
        id: Date.now() + i,
        nome: nomes[Math.floor(Math.random() * nomes.length)],
        email: emails[Math.floor(Math.random() * emails.length)],
        idade: Math.floor(Math.random() * 50) + 18,
        cidade: cidades[Math.floor(Math.random() * cidades.length)],
        dataAdicionada: new Date().toISOString(),
      };
      this.dados.push(pessoa);
    }

    this.salvarDados();
    this.renderizarLista();
    this.atualizarEstatisticas();
    this.mostrarMensagem("🎲 5 pessoas aleatórias adicionadas!", "info");
  }

  removerPessoa(id) {
    if (confirm("⚠️ Deseja remover esta pessoa?")) {
      this.dados = this.dados.filter((pessoa) => pessoa.id !== id);
      this.salvarDados();
      this.renderizarLista();
      this.atualizarEstatisticas();
      this.mostrarMensagem("🗑️ Pessoa removida!", "info");
    }
  }

  renderizarLista() {
    const lista = document.getElementById("lista-pessoas");

    if (this.dados.length === 0) {
      lista.innerHTML =
        '<small class="text-muted">Nenhuma pessoa cadastrada...</small>';
      return;
    }

    let html = "";
    this.dados.forEach((pessoa) => {
      html += `
                <div class="card mb-2">
                    <div class="card-body py-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${pessoa.nome}</strong><br>
                                <small class="text-muted">
                                    📧 ${pessoa.email} | 📍 ${pessoa.cidade} | 🎂 ${pessoa.idade} anos
                                </small>
                            </div>
                            <button class="btn btn-sm btn-outline-danger" 
                                    onclick="demo2.removerPessoa(${pessoa.id})">🗑️</button>
                        </div>
                    </div>
                </div>
            `;
    });

    lista.innerHTML = html;
  }

  atualizarEstatisticas() {
    const total = this.dados.length;
    const idadeMedia =
      total > 0
        ? (this.dados.reduce((sum, p) => sum + p.idade, 0) / total).toFixed(1)
        : 0;

    // Cidade mais popular
    const cidadeCount = {};
    this.dados.forEach((p) => {
      cidadeCount[p.cidade] = (cidadeCount[p.cidade] || 0) + 1;
    });
    const cidadePopular = Object.keys(cidadeCount).reduce(
      (a, b) => (cidadeCount[a] > cidadeCount[b] ? a : b),
      "-"
    );

    // Tamanho dos dados
    const tamanho = JSON.stringify(this.dados).length;

    document.getElementById("total-pessoas").textContent = total;
    document.getElementById("idade-media").textContent = idadeMedia;
    document.getElementById("cidade-popular").textContent = cidadePopular;
    document.getElementById("tamanho-dados").textContent = `${(
      tamanho / 1024
    ).toFixed(2)} KB`;
  }

  salvarDados() {
    try {
      localStorage.setItem(this.chave, JSON.stringify(this.dados));
    } catch (error) {
      this.mostrarMensagem(`❌ Erro ao salvar: ${error.message}`, "danger");
    }
  }

  carregarDados() {
    try {
      const dadosSalvos = localStorage.getItem(this.chave);
      if (dadosSalvos) {
        this.dados = JSON.parse(dadosSalvos);
      }
      this.renderizarLista();
      this.atualizarEstatisticas();
    } catch (error) {
      this.mostrarMensagem(
        `❌ Erro ao carregar dados: ${error.message}`,
        "danger"
      );
      this.dados = [];
    }
  }

  exportarDados() {
    if (this.dados.length === 0) {
      this.mostrarMensagem("⚠️ Nenhum dado para exportar!", "warning");
      return;
    }

    const dadosFormatados = JSON.stringify(this.dados, null, 2);
    const blob = new Blob([dadosFormatados], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "pessoas_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    this.mostrarMensagem("📤 Dados exportados com sucesso!", "success");
  }

  limparTodos() {
    if (confirm("⚠️ Deseja remover TODAS as pessoas?")) {
      this.dados = [];
      this.salvarDados();
      this.renderizarLista();
      this.atualizarEstatisticas();
      this.mostrarMensagem("🗑️ Todos os dados removidos!", "success");
    }
  }

  limparFormulario() {
    document.getElementById("form-pessoa").reset();
  }

  mostrarMensagem(mensagem, tipo) {
    // Reutilizar função da Demo1
    const div = document.createElement("div");
    div.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    div.style.cssText =
      "top: 20px; right: 20px; z-index: 1050; max-width: 300px;";
    div.innerHTML = `
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(div);

    setTimeout(() => {
      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }, 3000);
  }
}

// ============================================================================
// 🎯 DEMONSTRAÇÃO 3: Sistema de Configurações e Preferências
// ============================================================================

class Demo3_Configuracoes {
  constructor() {
    this.chaveConfig = "demo3_configuracoes";
    this.configPadrao = {
      tema: "light",
      idioma: "pt-BR",
      notificacoes: true,
      autoSave: true,
      fontSize: "16",
      layout: "grid",
    };
    this.inicializar();
  }

  inicializar() {
    this.criarInterface();
    this.carregarConfiguracoes();
    this.aplicarConfiguracoes();
  }

  criarInterface() {
    const container = document.getElementById("demo3");
    if (!container) return;

    container.innerHTML = `
            <div class="card border-warning">
                <div class="card-header bg-warning text-dark">
                    <h5 class="mb-0">⚙️ Sistema de Configurações</h5>
                </div>
                <div class="card-body" id="config-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>🎨 Aparência</h6>
                            <div class="mb-3">
                                <label for="tema" class="form-label">Tema:</label>
                                <select id="tema" class="form-select">
                                    <option value="light">☀️ Claro</option>
                                    <option value="dark">🌙 Escuro</option>
                                    <option value="auto">🔄 Automático</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label for="fontSize" class="form-label">Tamanho da Fonte:</label>
                                <input type="range" id="fontSize" class="form-range" 
                                       min="12" max="24" step="2">
                                <div class="d-flex justify-content-between">
                                    <small>12px</small>
                                    <span id="fontSize-value">16px</span>
                                    <small>24px</small>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="layout" class="form-label">Layout:</label>
                                <select id="layout" class="form-select">
                                    <option value="grid">📱 Grade</option>
                                    <option value="list">📄 Lista</option>
                                    <option value="card">🎴 Cartões</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h6>🔧 Funcionalidades</h6>
                            <div class="mb-3">
                                <label for="idioma" class="form-label">Idioma:</label>
                                <select id="idioma" class="form-select">
                                    <option value="pt-BR">🇧🇷 Português (Brasil)</option>
                                    <option value="en-US">🇺🇸 English (US)</option>
                                    <option value="es-ES">🇪🇸 Español</option>
                                    <option value="fr-FR">🇫🇷 Français</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="notificacoes">
                                    <label class="form-check-label" for="notificacoes">
                                        🔔 Receber Notificações
                                    </label>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="autoSave">
                                    <label class="form-check-label" for="autoSave">
                                        💾 Salvamento Automático
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-top pt-3 mt-3">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-secondary" onclick="demo3.resetarPadrao()">
                                🔄 Resetar Padrão
                            </button>
                            <button class="btn btn-info" onclick="demo3.exportarConfig()">
                                📤 Exportar Configurações
                            </button>
                            <button class="btn btn-warning" onclick="demo3.importarConfig()">
                                📥 Importar Configurações
                            </button>
                            <button class="btn btn-success" onclick="demo3.salvarConfiguracoes()">
                                💾 Salvar Alterações
                            </button>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <h6>📊 Preview das Configurações</h6>
                        <div id="preview-config" class="alert alert-light border">
                            <pre id="config-json" class="mb-0"></pre>
                        </div>
                    </div>
                </div>
            </div>
        `;

    this.adicionarEventListeners();
  }

  adicionarEventListeners() {
    // Event listeners para mudanças em tempo real
    const campos = [
      "tema",
      "idioma",
      "fontSize",
      "layout",
      "notificacoes",
      "autoSave",
    ];

    campos.forEach((campo) => {
      const elemento = document.getElementById(campo);
      if (elemento) {
        const evento = elemento.type === "checkbox" ? "change" : "input";
        elemento.addEventListener(evento, () => {
          this.atualizarPreview();
          if (this.getConfiguracao("autoSave")) {
            this.salvarConfiguracoes();
          }
        });
      }
    });

    // Event listener especial para o range do fontSize
    document.getElementById("fontSize").addEventListener("input", (e) => {
      document.getElementById("fontSize-value").textContent =
        e.target.value + "px";
    });
  }

  getConfiguracao(chave) {
    const elemento = document.getElementById(chave);
    if (!elemento) return null;

    if (elemento.type === "checkbox") {
      return elemento.checked;
    }
    return elemento.value;
  }

  setConfiguracao(chave, valor) {
    const elemento = document.getElementById(chave);
    if (!elemento) return;

    if (elemento.type === "checkbox") {
      elemento.checked = valor;
    } else {
      elemento.value = valor;
    }

    // Atualizar valor do fontSize
    if (chave === "fontSize") {
      document.getElementById("fontSize-value").textContent = valor + "px";
    }
  }

  obterTodasConfiguracoes() {
    return {
      tema: this.getConfiguracao("tema"),
      idioma: this.getConfiguracao("idioma"),
      notificacoes: this.getConfiguracao("notificacoes"),
      autoSave: this.getConfiguracao("autoSave"),
      fontSize: this.getConfiguracao("fontSize"),
      layout: this.getConfiguracao("layout"),
    };
  }

  salvarConfiguracoes() {
    try {
      const config = this.obterTodasConfiguracoes();
      localStorage.setItem(this.chaveConfig, JSON.stringify(config));
      this.aplicarConfiguracoes();
      this.mostrarMensagem("💾 Configurações salvas!", "success");
    } catch (error) {
      this.mostrarMensagem(`❌ Erro ao salvar: ${error.message}`, "danger");
    }
  }

  carregarConfiguracoes() {
    try {
      const configSalva = localStorage.getItem(this.chaveConfig);
      const config = configSalva ? JSON.parse(configSalva) : this.configPadrao;

      Object.keys(config).forEach((chave) => {
        this.setConfiguracao(chave, config[chave]);
      });

      this.atualizarPreview();
    } catch (error) {
      this.mostrarMensagem(`❌ Erro ao carregar: ${error.message}`, "danger");
      this.resetarPadrao();
    }
  }

  aplicarConfiguracoes() {
    const config = this.obterTodasConfiguracoes();
    const body = document.getElementById("config-body");

    // Aplicar tema
    if (config.tema === "dark") {
      body.style.backgroundColor = "#212529";
      body.style.color = "#ffffff";
    } else {
      body.style.backgroundColor = "#ffffff";
      body.style.color = "#000000";
    }

    // Aplicar fontSize
    body.style.fontSize = config.fontSize + "px";

    // Mostrar notificação se ativada
    if (config.notificacoes) {
      this.mostrarMensagem("✅ Configurações aplicadas!", "info");
    }
  }

  resetarPadrao() {
    if (confirm("⚠️ Deseja resetar todas as configurações para o padrão?")) {
      Object.keys(this.configPadrao).forEach((chave) => {
        this.setConfiguracao(chave, this.configPadrao[chave]);
      });
      this.salvarConfiguracoes();
      this.atualizarPreview();
      this.mostrarMensagem("🔄 Configurações resetadas!", "info");
    }
  }

  atualizarPreview() {
    const config = this.obterTodasConfiguracoes();
    document.getElementById("config-json").textContent = JSON.stringify(
      config,
      null,
      2
    );
  }

  exportarConfig() {
    const config = this.obterTodasConfiguracoes();
    const dadosFormatados = JSON.stringify(config, null, 2);
    const blob = new Blob([dadosFormatados], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "configuracoes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    this.mostrarMensagem("📤 Configurações exportadas!", "success");
  }

  importarConfig() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const config = JSON.parse(e.target.result);
            Object.keys(config).forEach((chave) => {
              if (this.configPadrao.hasOwnProperty(chave)) {
                this.setConfiguracao(chave, config[chave]);
              }
            });
            this.salvarConfiguracoes();
            this.atualizarPreview();
            this.mostrarMensagem("📥 Configurações importadas!", "success");
          } catch (error) {
            this.mostrarMensagem("❌ Arquivo JSON inválido!", "danger");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  mostrarMensagem(mensagem, tipo) {
    const div = document.createElement("div");
    div.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    div.style.cssText =
      "top: 20px; right: 20px; z-index: 1050; max-width: 300px;";
    div.innerHTML = `
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(div);

    setTimeout(() => {
      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }, 3000);
  }
}

// ============================================================================
// 🚀 INICIALIZAÇÃO GLOBAL
// ============================================================================

// Instâncias globais das demonstrações
let demo1, demo2, demo3;

// Função de inicialização principal
window.Aula7 = {
  inicializar() {
    console.log("🎯 Inicializando Aula 7: LocalStorage e Persistência");

    // Aguardar DOM estar pronto
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.criarDemonstracoes();
      });
    } else {
      this.criarDemonstracoes();
    }
  },

  criarDemonstracoes() {
    // Criar instâncias das demonstrações
    demo1 = new Demo1_ConceitosBasicos();
    demo2 = new Demo2_ObjetosJSON();
    demo3 = new Demo3_Configuracoes();

    console.log("✅ Todas as demonstrações inicializadas com sucesso!");
  },
};

// Auto-inicialização quando o script é carregado
if (typeof window !== "undefined") {
  window.Aula7.inicializar();
}

// Export para módulos (se necessário)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Demo1_ConceitosBasicos,
    Demo2_ObjetosJSON,
    Demo3_Configuracoes,
  };
}
