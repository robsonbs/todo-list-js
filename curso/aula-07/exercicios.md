# 📚 Exercícios - Aula 7: LocalStorage e Persistência

![LocalStorage](https://img.shields.io/badge/JavaScript-LocalStorage-yellow?style=for-the-badge&logo=javascript)

![Nível](https://img.shields.io/badge/Nível-Progressivo-blue?style=for-the-badge)

![Exercícios](https://img.shields.io/badge/Exercícios-15%20questões-green?style=for-the-badge)

## 🎯 **OBJETIVOS DOS EXERCÍCIOS**

Estes exercícios foram desenvolvidos para consolidar o aprendizado sobre **LocalStorage e persistência de dados** através de prática progressiva e aplicação real.

### **📝 O que você vai praticar:**

* ✅ **Conceitos básicos** de LocalStorage e SessionStorage
* ✅ **Serialização e deserialização** de objetos JSON
* ✅ **Sistemas de configuração** e preferências
* ✅ **Aplicações práticas** com TODO Lists
* ✅ **Tratamento de erros** e validação de dados
* ✅ **Performance e otimização** de storage
* ✅ **Técnicas avançadas** de persistência

---

## 📋 **ESTRUTURA DOS EXERCÍCIOS**

### **🥉 Nível Iniciante (4 exercícios)**

Fundamentos de storage, métodos básicos e primeiros passos

### **🥈 Nível Intermediário (5 exercícios)**

Objetos JSON, sistemas práticos e funcionalidades completas

### **🥇 Nível Avançado (4 exercícios)**

Otimização, analytics e técnicas profissionais

### **🏆 Desafios Bonus (2 exercícios)**

Projetos complexos e implementações criativas

---

## 🥉 **NÍVEL INICIANTE**

*Fundamentos de LocalStorage e conceitos básicos*

### **Exercício 1.1: Primeiro Contato com Storage**

**🎯 Objetivo:** Entender a diferença entre LocalStorage e SessionStorage

```javascript
// TODO: Complete as funções abaixo

// 1. Função para salvar dados no LocalStorage
function salvarLocal(chave, valor) {
    // Seu código aqui
}

// 2. Função para recuperar dados do LocalStorage
function obterLocal(chave) {
    // Seu código aqui
}

// 3. Função para salvar dados no SessionStorage
function salvarSessao(chave, valor) {
    // Seu código aqui
}

// 4. Função para recuperar dados do SessionStorage
function obterSessao(chave) {
    // Seu código aqui
}

// 5. Teste suas funções
salvarLocal('nome', 'João Silva');
salvarSessao('tempData', 'dados temporários');

console.log('Local:', obterLocal('nome'));
console.log('Sessão:', obterSessao('tempData'));
```

**✅ Critérios de sucesso:**
* [x] Implementar todas as 4 funções corretamente
* [x] Entender a diferença entre Local e Session
* [x] Testar com dados diferentes
* [x] Verificar persistência após refresh

---

### **Exercício 1.2: Contador Persistente**

**🎯 Objetivo:** Criar um contador que mantém seu valor entre sessões

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Contador Persistente</title>
</head>

<body>
    <div id="app">
        <h1>Contador: <span id="contador">0</span></h1>
        <button onclick="incrementar()">➕ Incrementar</button>
        <button onclick="decrementar()">➖ Decrementar</button>
        <button onclick="resetar()">🔄 Resetar</button>
    </div>

    <script>
        // TODO: Implemente as funções para um contador persistente

        // 1. Carregar valor do contador do localStorage
        function carregarContador() {
            // Seu código aqui
        }

        // 2. Salvar valor no localStorage
        function salvarContador(valor) {
            // Seu código aqui
        }

        // 3. Incrementar contador
        function incrementar() {
            // Seu código aqui
        }

        // 4. Decrementar contador
        function decrementar() {
            // Seu código aqui
        }

        // 5. Resetar contador
        function resetar() {
            // Seu código aqui
        }

        // 6. Inicializar ao carregar a página
        window.onload = function() {
            carregarContador();
        };
    </script>
</body>

</html>
```

**✅ Critérios de sucesso:**
* [x] Contador persiste entre recarregamentos
* [x] Botões funcionam corretamente
* [x] Interface atualiza em tempo real
* [x] Função de reset funciona

---

### **Exercício 1.3: Validação e Tratamento de Erros**

**🎯 Objetivo:** Implementar verificações de segurança para o storage

```javascript
// TODO: Crie um sistema seguro de storage com validação

class StorageSeguro {
    constructor() {
        this.suportado = this.verificarSuporte();
    }

    // 1. Verificar se localStorage é suportado
    verificarSuporte() {
        // Seu código aqui
        // Dica: Use try/catch para testar localStorage
    }

    // 2. Salvar dados com validação
    salvar(chave, valor) {
        // Seu código aqui
        // Validar: chave não vazia, suporte disponível, espaço suficiente
    }

    // 3. Recuperar dados com fallback
    obter(chave, valorPadrao = null) {
        // Seu código aqui
        // Retornar valorPadrao se não encontrar ou erro
    }

    // 4. Verificar espaço disponível
    verificarEspaco() {
        // Seu código aqui
        // Dica: Calcular tamanho atual do localStorage
    }

    // 5. Limpar dados antigos
    limparExpirados() {
        // Seu código aqui
        // Implementar sistema de expiração
    }
}

// Teste do sistema
const storage = new StorageSeguro();

if (storage.suportado) {
    storage.salvar('teste', 'valor de teste');
    console.log('Recuperado:', storage.obter('teste'));
    console.log('Espaço usado:', storage.verificarEspaco());
} else {
    console.log('LocalStorage não suportado!');
}
```

**✅ Critérios de sucesso:**
* [x] Verificação de suporte funciona
* [x] Validação de entrada implementada
* [x] Tratamento de erros robusto
* [x] Sistema de fallback operacional

---

### **Exercício 1.4: Lista de Favoritos**

**🎯 Objetivo:** Criar sistema de favoritos persistente

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Lista de Favoritos</title>
    <style>
        .favorito {
            background: #ffffcc;
        }

        .item {
            padding: 10px;
            margin: 5px;
            border: 1px solid #ccc;
        }

        .btn {
            padding: 5px 10px;
            margin: 2px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div id="app">
        <h1>Meus Favoritos</h1>

        <div id="items">
            <div class="item" data-id="1">
                Item 1
                <button class="btn" onclick="toggleFavorito(1)">⭐</button>
            </div>
            <div class="item" data-id="2">
                Item 2
                <button class="btn" onclick="toggleFavorito(2)">⭐</button>
            </div>
            <div class="item" data-id="3">
                Item 3
                <button class="btn" onclick="toggleFavorito(3)">⭐</button>
            </div>
        </div>

        <div>
            <button onclick="mostrarFavoritos()">📋 Ver Favoritos</button>
            <button onclick="limparFavoritos()">🗑️ Limpar Todos</button>
        </div>

        <div id="lista-favoritos"></div>
    </div>

    <script>
        // TODO: Implemente sistema de favoritos

        // 1. Obter lista de favoritos do storage
        function obterFavoritos() {
            // Seu código aqui
        }

        // 2. Salvar favoritos no storage
        function salvarFavoritos(favoritos) {
            // Seu código aqui
        }

        // 3. Alternar status de favorito
        function toggleFavorito(id) {
            // Seu código aqui
            // Adicionar/remover da lista e atualizar interface
        }

        // 4. Mostrar lista de favoritos
        function mostrarFavoritos() {
            // Seu código aqui
        }

        // 5. Limpar todos os favoritos
        function limparFavoritos() {
            // Seu código aqui
        }

        // 6. Atualizar interface visual
        function atualizarInterface() {
            // Seu código aqui
            // Aplicar classe 'favorito' aos itens favoritos
        }

        // Inicializar
        window.onload = function() {
            atualizarInterface();
        };
    </script>
</body>

</html>
```

**✅ Critérios de sucesso:**
* [x] Favoritos persistem entre sessões
* [x] Interface visual atualiza corretamente
* [x] Toggle funciona em ambas direções
* [x] Limpeza remove todos os favoritos

---

## 🥈 **NÍVEL INTERMEDIÁRIO**

*Objetos JSON, sistemas práticos e funcionalidades avançadas*

### **Exercício 2.1: Gerenciador de Contatos**

**🎯 Objetivo:** Sistema completo de CRUD com objetos JSON

```javascript
// TODO: Implemente um gerenciador de contatos

class GerenciadorContatos {
    constructor() {
        this.chave = 'contatos';
        this.contatos = this.carregarContatos();
    }

    // 1. Carregar contatos do localStorage
    carregarContatos() {
        // Seu código aqui
        // Retornar array vazio se não existir
    }

    // 2. Salvar contatos no localStorage
    salvarContatos() {
        // Seu código aqui
    }

    // 3. Adicionar novo contato
    adicionarContato(nome, email, telefone) {
        // Seu código aqui
        // Criar objeto com id único, validar dados
    }

    // 4. Buscar contato por ID
    buscarContato(id) {
        // Seu código aqui
    }

    // 5. Editar contato existente
    editarContato(id, dadosNovos) {
        // Seu código aqui
    }

    // 6. Remover contato
    removerContato(id) {
        // Seu código aqui
    }

    // 7. Listar todos os contatos
    listarContatos() {
        // Seu código aqui
    }

    // 8. Buscar contatos por nome
    buscarPorNome(termo) {
        // Seu código aqui
    }

    // 9. Exportar contatos como JSON
    exportarJSON() {
        // Seu código aqui
    }

    // 10. Importar contatos de JSON
    importarJSON(jsonString) {
        // Seu código aqui
    }
}

// Exemplo de uso
const gerenciador = new GerenciadorContatos();

// Adicionar alguns contatos
gerenciador.adicionarContato('João Silva', 'joao@email.com', '11999999999');
gerenciador.adicionarContato('Maria Santos', 'maria@email.com', '11888888888');

// Listar contatos
console.log('Contatos:', gerenciador.listarContatos());

// Buscar por nome
console.log('Busca por "João":', gerenciador.buscarPorNome('João'));
```

**✅ Critérios de sucesso:**
* [x] CRUD completo funcionando
* [x] Validação de dados implementada
* [x] Busca por nome funcional
* [x] Export/Import de JSON operacional

---

### **Exercício 2.2: Sistema de Configurações de Usuário**

**🎯 Objetivo:** Painel de configurações com aplicação em tempo real

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Configurações do Usuário</title>
    <style>
        .config-panel {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }

        .config-group {
            margin-bottom: 20px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 5px;
        }

        .preview {
            padding: 20px;
            border: 2px dashed #ccc;
            margin-top: 20px;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="config-panel">
        <h1>⚙️ Configurações do Usuário</h1>

        <div class="config-group">
            <h3>🎨 Aparência</h3>
            <label>
                Tema:
                <select id="tema">
                    <option value="claro">☀️ Claro</option>
                    <option value="escuro">🌙 Escuro</option>
                    <option value="auto">🔄 Automático</option>
                </select>
            </label><br><br>

            <label>
                Tamanho da Fonte:
                <input type="range" id="fontSize" min="12" max="24" value="16">
                <span id="fontSize-display">16px</span>
            </label><br><br>

            <label>
                Cor Principal:
                <input type="color" id="corPrincipal" value="#007bff">
            </label>
        </div>

        <div class="config-group">
            <h3>🔧 Funcionalidades</h3>
            <label>
                <input type="checkbox" id="notificacoes">
                🔔 Receber notificações
            </label><br><br>

            <label>
                <input type="checkbox" id="autoSave">
                💾 Salvamento automático
            </label><br><br>

            <label>
                Idioma:
                <select id="idioma">
                    <option value="pt-BR">🇧🇷 Português</option>
                    <option value="en-US">🇺🇸 English</option>
                    <option value="es-ES">🇪🇸 Español</option>
                </select>
            </label>
        </div>

        <div class="config-group">
            <button onclick="salvarConfiguracoes()">💾 Salvar</button>
            <button onclick="resetarPadrao()">🔄 Padrão</button>
            <button onclick="exportarConfig()">📤 Exportar</button>
            <input type="file" id="importFile" accept=".json" style="display:none">
            <button onclick="document.getElementById('importFile').click()">📥 Importar</button>
        </div>

        <div class="preview" id="preview">
            <h3>👁️ Preview das Configurações</h3>
            <p>Esta área mostra como suas configurações afetam a interface.</p>
        </div>
    </div>

    <script>
        // TODO: Implemente sistema de configurações

        const configPadrao = {
            tema: 'claro',
            fontSize: '16',
            corPrincipal: '#007bff',
            notificacoes: true,
            autoSave: false,
            idioma: 'pt-BR'
        };

        // 1. Carregar configurações do localStorage
        function carregarConfiguracoes() {
            // Seu código aqui
        }

        // 2. Salvar configurações no localStorage
        function salvarConfiguracoes() {
            // Seu código aqui
        }

        // 3. Aplicar configurações na interface
        function aplicarConfiguracoes(config) {
            // Seu código aqui
            // Atualizar preview, cores, fontes, etc.
        }

        // 4. Resetar para configurações padrão
        function resetarPadrao() {
            // Seu código aqui
        }

        // 5. Exportar configurações
        function exportarConfig() {
            // Seu código aqui
        }

        // 6. Importar configurações
        function importarConfig(event) {
            // Seu código aqui
        }

        // 7. Atualizar preview em tempo real
        function atualizarPreview() {
            // Seu código aqui
        }

        // 8. Adicionar event listeners
        function adicionarEventListeners() {
            // Seu código aqui
            // Escutar mudanças em todos os controles
        }

        // Inicialização
        window.onload = function() {
            carregarConfiguracoes();
            adicionarEventListeners();
            document.getElementById('importFile').addEventListener('change', importarConfig);
        };
    </script>
</body>

</html>
```

**✅ Critérios de sucesso:**
* [x] Configurações persistem entre sessões
* [x] Preview atualiza em tempo real
* [x] Export/Import funcionando
* [x] Reset para padrão operacional

---

### **Exercício 2.3: TODO List Avançada**

**🎯 Objetivo:** Sistema completo de TODO com categorias e prioridades

```javascript
// TODO: Implemente uma TODO List avançada

class TodoAvancada {
    constructor() {
        this.chave = 'todos_avancada';
        this.todos = this.carregarTodos();
        this.proximoId = this.obterProximoId();
    }

    // 1. Carregar TODOs do localStorage
    carregarTodos() {
        // Seu código aqui
    }

    // 2. Salvar TODOs no localStorage
    salvarTodos() {
        // Seu código aqui
    }

    // 3. Obter próximo ID disponível
    obterProximoId() {
        // Seu código aqui
    }

    // 4. Adicionar nova tarefa
    adicionarTodo(texto, categoria = 'geral', prioridade = 'media') {
        // Seu código aqui
        // Criar objeto: { id, texto, categoria, prioridade, concluida, dataCriacao, dataVencimento }
    }

    // 5. Marcar como concluída/não concluída
    toggleConcluida(id) {
        // Seu código aqui
    }

    // 6. Editar tarefa
    editarTodo(id, novoTexto) {
        // Seu código aqui
    }

    // 7. Remover tarefa
    removerTodo(id) {
        // Seu código aqui
    }

    // 8. Filtrar por categoria
    filtrarPorCategoria(categoria) {
        // Seu código aqui
    }

    // 9. Filtrar por prioridade
    filtrarPorPrioridade(prioridade) {
        // Seu código aqui
    }

    // 10. Filtrar por status
    filtrarPorStatus(concluida) {
        // Seu código aqui
    }

    // 11. Buscar TODOs por texto
    buscarTodos(termo) {
        // Seu código aqui
    }

    // 12. Obter estatísticas
    obterEstatisticas() {
        // Seu código aqui
        // Retornar: total, concluidas, pendentes, por categoria, por prioridade
    }

    // 13. Exportar dados
    exportarDados(formato = 'json') {
        // Seu código aqui
        // Suportar JSON e CSV
    }

    // 14. Importar dados
    importarDados(dados, formato = 'json') {
        // Seu código aqui
    }

    // 15. Limpar tarefas concluídas
    limparConcluidas() {
        // Seu código aqui
    }
}

// Interface de exemplo
class InterfaceTodo {
    constructor() {
        this.todo = new TodoAvancada();
        this.filtroAtual = 'todas';
        this.categoriaAtual = 'todas';
        this.prioridadeAtual = 'todas';
    }

    // TODO: Implemente métodos da interface
    // renderizar(), adicionarEventListeners(), etc.
}

// Teste básico
const todo = new TodoAvancada();
todo.adicionarTodo('Estudar JavaScript', 'estudos', 'alta');
todo.adicionarTodo('Fazer compras', 'pessoal', 'media');
todo.adicionarTodo('Terminar projeto', 'trabalho', 'alta');

console.log('Estatísticas:', todo.obterEstatisticas());
console.log('Tarefas de alta prioridade:', todo.filtrarPorPrioridade('alta'));
```

**✅ Critérios de sucesso:**
* [x] CRUD completo para TODOs
* [x] Sistema de categorias e prioridades
* [x] Filtros e busca funcionais
* [x] Estatísticas e relatórios

---

### **Exercício 2.4: Cache de Dados com Expiração**

**🎯 Objetivo:** Sistema de cache inteligente com TTL

```javascript
// TODO: Implemente sistema de cache com expiração

class CacheInteligente {
    constructor() {
        this.chaveCache = 'cache_dados';
        this.chaveMetadata = 'cache_metadata';
        this.limparExpirados();
    }

    // 1. Salvar no cache com TTL (time to live)
    salvar(chave, dados, ttlSegundos = 3600) {
        // Seu código aqui
        // Salvar dados + timestamp + TTL
    }

    // 2. Recuperar do cache
    obter(chave) {
        // Seu código aqui
        // Verificar se expirou antes de retornar
    }

    // 3. Verificar se existe e não expirou
    existe(chave) {
        // Seu código aqui
    }

    // 4. Remover item do cache
    remover(chave) {
        // Seu código aqui
    }

    // 5. Limpar itens expirados
    limparExpirados() {
        // Seu código aqui
    }

    // 6. Obter estatísticas do cache
    obterEstatisticas() {
        // Seu código aqui
        // Retornar: total itens, tamanho, taxa de hit, etc.
    }

    // 7. Definir limite de tamanho
    definirLimite(limiteMB) {
        // Seu código aqui
    }

    // 8. Implementar LRU (Least Recently Used)
    implementarLRU() {
        // Seu código aqui
    }

    // 9. Exportar cache
    exportarCache() {
        // Seu código aqui
    }

    // 10. Importar cache
    importarCache(dadosCache) {
        // Seu código aqui
    }
}

// Wrapper para requisições com cache
class RequisicaoComCache {
    constructor() {
        this.cache = new CacheInteligente();
    }

    // TODO: Implemente requisições com cache automático
    async buscarComCache(url, ttl = 300) {
        // Seu código aqui
        // Verificar cache primeiro, fazer requisição se necessário
    }
}

// Exemplo de uso
const cache = new CacheInteligente();

// Salvar dados com diferentes TTLs
cache.salvar('usuario_1', {
    nome: 'João',
    email: 'joao@email.com'
}, 60); // 1 minuto
cache.salvar('config_app', {
    tema: 'escuro',
    lang: 'pt-BR'
}, 3600); // 1 hora

// Recuperar dados
console.log('Usuário:', cache.obter('usuario_1'));
console.log('Config:', cache.obter('config_app'));

// Estatísticas
console.log('Stats:', cache.obterEstatisticas());
```

**✅ Critérios de sucesso:**
* [x] Sistema de TTL funcionando
* [x] Limpeza automática de expirados
* [x] Estatísticas de uso
* [x] LRU implementado

---

### **Exercício 2.5: Sincronização entre Abas**

**🎯 Objetivo:** Sincronizar dados entre múltiplas abas do navegador

```javascript
// TODO: Implemente sincronização entre abas

class SincronizadorAbas {
    constructor() {
        this.chave = 'dados_sincronizados';
        this.callbacks = new Map();
        this.inicializar();
    }

    // 1. Inicializar event listeners
    inicializar() {
        // Seu código aqui
        // Escutar storage events
    }

    // 2. Registrar callback para mudanças
    onMudanca(chave, callback) {
        // Seu código aqui
    }

    // 3. Salvar dados e notificar outras abas
    salvar(chave, dados) {
        // Seu código aqui
    }

    // 4. Broadcast para todas as abas
    broadcast(tipo, dados) {
        // Seu código aqui
    }

    // 5. Processar mensagens de outras abas
    processarMensagem(event) {
        // Seu código aqui
    }

    // 6. Sincronizar estado inicial
    sincronizarEstado() {
        // Seu código aqui
    }

    // 7. Detectar quando aba fica ativa
    onAbaAtiva(callback) {
        // Seu código aqui
    }

    // 8. Detectar fechamento de aba
    onAbaFechada(callback) {
        // Seu código aqui
    }
}

// Exemplo de aplicação: Chat entre abas
class ChatEntreAbas {
    constructor() {
        this.sincronizador = new SincronizadorAbas();
        this.mensagens = [];
        this.usuarioId = this.gerarUsuarioId();
        this.inicializar();
    }

    // TODO: Implemente chat entre abas
    inicializar() {
        // Seu código aqui
    }

    enviarMensagem(texto) {
        // Seu código aqui
    }

    receberMensagem(mensagem) {
        // Seu código aqui
    }

    gerarUsuarioId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }
}

// Interface HTML para teste
const htmlChat = `
<div id="chat-container">
    <div id="mensagens" style="height: 300px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;"></div>
    <div style="margin-top: 10px;">
        <input type="text" id="input-mensagem" placeholder="Digite sua mensagem..." style="width: 70%;">
        <button onclick="enviarMensagem()" style="width: 25%;">Enviar</button>
    </div>
    <div style="margin-top: 10px;">
        <small>💡 Abra esta página em múltiplas abas para testar a sincronização!</small>
    </div>
</div>
`;
```

**✅ Critérios de sucesso:**
* [x] Storage events funcionando
* [x] Sincronização em tempo real
* [x] Chat entre abas operacional
* [x] Detecção de abas ativas/fechadas

---

## 🥇 **NÍVEL AVANÇADO**

*Otimização, analytics e técnicas profissionais*

### **Exercício 3.1: Compressão de Dados**

**🎯 Objetivo:** Implementar compressão para economizar espaço no storage

```javascript
// TODO: Implemente sistema de compressão de dados

class StorageComprimido {
    constructor() {
        this.chaveIndice = 'compressed_index';
        this.prefixo = 'comp_';
    }

    // 1. Comprimir string usando algoritmo simples
    comprimirString(str) {
        // Seu código aqui
        // Implementar compressão básica (ex: RLE ou LZ77 simplificado)
    }

    // 2. Descomprimir string
    descomprimirString(strComprimida) {
        // Seu código aqui
    }

    // 3. Comprimir objeto JSON
    comprimirObjeto(obj) {
        // Seu código aqui
        // JSON.stringify + compressão
    }

    // 4. Descomprimir objeto JSON
    descomprimirObjeto(objComprimido) {
        // Seu código aqui
    }

    // 5. Salvar dados comprimidos
    salvar(chave, dados) {
        // Seu código aqui
        // Comprimir antes de salvar
    }

    // 6. Recuperar dados descomprimidos
    obter(chave) {
        // Seu código aqui
        // Descomprimir após recuperar
    }

    // 7. Calcular taxa de compressão
    calcularTaxaCompressao(original, comprimido) {
        // Seu código aqui
    }

    // 8. Relatório de economia de espaço
    relatorioEconomia() {
        // Seu código aqui
    }

    // 9. Migrar dados existentes para formato comprimido
    migrarDados() {
        // Seu código aqui
    }

    // 10. Benchmark de performance
    benchmarkCompressao(dados) {
        // Seu código aqui
    }
}

// Algoritmo de compressão RLE (Run Length Encoding)
class CompressorRLE {
    static comprimir(str) {
        // TODO: Implemente RLE
        // Exemplo: "aaabbc" -> "3a2b1c"
    }

    static descomprimir(strComprimida) {
        // TODO: Implemente decompressão RLE
    }
}

// Teste de compressão
const storage = new StorageComprimido();
const dadosTeste = {
    usuarios: Array.from({
        length: 1000
    }, (_, i) => ({
        id: i,
        nome: `Usuario ${i}`,
        email: `user${i}@email.com`,
        ativo: i % 2 === 0
    }))
};

storage.salvar('usuarios_teste', dadosTeste);
console.log('Dados recuperados:', storage.obter('usuarios_teste'));
console.log('Relatório:', storage.relatorioEconomia());
```

**✅ Critérios de sucesso:**
* [x] Compressão RLE implementada
* [x] Transparência total para o usuário
* [x] Relatório de economia funcionando
* [x] Performance adequada

---

### **Exercício 3.2: Analytics de Usage**

**🎯 Objetivo:** Sistema de analytics para monitorar uso do storage

```javascript
// TODO: Implemente sistema de analytics

class StorageAnalytics {
    constructor() {
        this.chaveAnalytics = 'storage_analytics';
        this.inicializar();
    }

    // 1. Inicializar analytics
    inicializar() {
        // Seu código aqui
        // Interceptar métodos do localStorage
    }

    // 2. Registrar operação
    registrarOperacao(tipo, chave, tamanho = 0) {
        // Seu código aqui
        // Tipos: 'read', 'write', 'delete', 'clear'
    }

    // 3. Obter estatísticas gerais
    obterEstatisticas() {
        // Seu código aqui
        // Retornar: operações por tipo, chaves mais acessadas, etc.
    }

    // 4. Análise de padrões de uso
    analisarPadroes() {
        // Seu código aqui
        // Horários de pico, frequência de acesso, etc.
    }

    // 5. Detectar vazamentos de memória
    detectarVazamentos() {
        // Seu código aqui
        // Chaves que crescem muito, nunca são limpas, etc.
    }

    // 6. Sugerir otimizações
    sugerirOtimizacoes() {
        // Seu código aqui
    }

    // 7. Gerar relatório HTML
    gerarRelatorioHTML() {
        // Seu código aqui
    }

    // 8. Exportar dados para análise externa
    exportarDados() {
        // Seu código aqui
    }

    // 9. Alertas automáticos
    configurarAlertas(configuracao) {
        // Seu código aqui
        // Ex: uso > 80% do limite, muitas operações/segundo
    }

    // 10. Dashboard em tempo real
    criarDashboard() {
        // Seu código aqui
    }
}

// Monitor de performance
class PerformanceMonitor {
    constructor() {
        this.metricas = new Map();
    }

    // TODO: Implemente monitoramento de performance

    iniciarMedicao(operacao) {
        // Seu código aqui
    }

    finalizarMedicao(operacao) {
        // Seu código aqui
    }

    obterRelatorioPerformance() {
        // Seu código aqui
    }
}

// Wrapper instrumentado do localStorage
class LocalStorageInstrumentado {
    constructor() {
        this.analytics = new StorageAnalytics();
        this.performance = new PerformanceMonitor();
        this.original = window.localStorage;
    }

    // TODO: Implemente wrapper que registra todas as operações

    setItem(key, value) {
        // Seu código aqui
        // Registrar analytics + performance
    }

    getItem(key) {
        // Seu código aqui
    }

    removeItem(key) {
        // Seu código aqui
    }

    clear() {
        // Seu código aqui
    }

    // Métodos específicos de analytics
    gerarRelatorio() {
        // Seu código aqui
    }
}

// Exemplo de uso
const storage = new LocalStorageInstrumentado();

// Simular uso
storage.setItem('config', JSON.stringify({
    tema: 'dark'
}));
storage.getItem('config');
storage.setItem('cache_user_1', JSON.stringify({
    name: 'João'
}));

// Ver relatório
console.log(storage.gerarRelatorio());
```

**✅ Critérios de sucesso:**
* [x] Interceptação transparente
* [x] Métricas de performance coletadas
* [x] Relatórios detalhados
* [x] Alertas automáticos funcionando

---

### **Exercício 3.3: Backup e Recovery**

**🎯 Objetivo:** Sistema robusto de backup e recuperação de dados

```javascript
// TODO: Implemente sistema de backup/recovery

class BackupManager {
    constructor() {
        this.chaveBackup = 'backup_storage';
        this.chaveHistorico = 'backup_historico';
        this.versaoAtual = this.obterVersaoAtual();
    }

    // 1. Criar backup completo
    criarBackupCompleto() {
        // Seu código aqui
        // Salvar todos os dados do localStorage
    }

    // 2. Criar backup incremental
    criarBackupIncremental() {
        // Seu código aqui
        // Apenas mudanças desde último backup
    }

    // 3. Restaurar backup específico
    restaurarBackup(versao) {
        // Seu código aqui
    }

    // 4. Listar backups disponíveis
    listarBackups() {
        // Seu código aqui
    }

    // 5. Validar integridade do backup
    validarIntegridade(backup) {
        // Seu código aqui
        // Checksum, validação de estrutura, etc.
    }

    // 6. Compactar backups antigos
    compactarBackups() {
        // Seu código aqui
        // Manter apenas X backups mais recentes
    }

    // 7. Backup automático
    configurarBackupAutomatico(intervaloMinutos) {
        // Seu código aqui
    }

    // 8. Exportar backup para arquivo
    exportarBackup(versao) {
        // Seu código aqui
    }

    // 9. Importar backup de arquivo
    importarBackup(arquivo) {
        // Seu código aqui
    }

    // 10. Comparar versões
    compararVersoes(versao1, versao2) {
        // Seu código aqui
        // Mostrar diferenças entre backups
    }

    obterVersaoAtual() {
        return Date.now();
    }
}

// Sistema de versionamento
class VersionController {
    constructor() {
        this.chaveVersions = 'data_versions';
        this.versoes = this.carregarVersions();
    }

    // TODO: Implemente controle de versões

    // 1. Salvar nova versão
    salvarVersao(chave, dados, comentario = '') {
        // Seu código aqui
    }

    // 2. Obter versão específica
    obterVersao(chave, versao) {
        // Seu código aqui
    }

    // 3. Listar histórico de versões
    listarHistorico(chave) {
        // Seu código aqui
    }

    // 4. Reverter para versão anterior
    reverterVersao(chave, versao) {
        // Seu código aqui
    }

    // 5. Comparar versões
    compararVersoes(chave, versao1, versao2) {
        // Seu código aqui
    }

    carregarVersions() {
        // Seu código aqui
    }
}

// Interface para gerenciamento de backup
class BackupInterface {
    constructor() {
        this.backup = new BackupManager();
        this.version = new VersionController();
        this.criarInterface();
    }

    criarInterface() {
        // TODO: Criar interface HTML para gerenciamento
        const html = `
            <div id="backup-manager">
                <h2>🔒 Gerenciador de Backup</h2>
                
                <div class="backup-section">
                    <h3>Criar Backup</h3>
                    <button onclick="criarBackup('completo')">📦 Backup Completo</button>
                    <button onclick="criarBackup('incremental')">📋 Backup Incremental</button>
                </div>

                <div class="backup-section">
                    <h3>Backups Disponíveis</h3>
                    <div id="lista-backups"></div>
                </div>

                <div class="backup-section">
                    <h3>Ferramentas</h3>
                    <button onclick="validarTodos()">✅ Validar Todos</button>
                    <button onclick="compactarBackups()">🗜️ Compactar</button>
                    <button onclick="exportarTodos()">📤 Exportar Todos</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
    }

    // TODO: Implemente métodos da interface
}

// Exemplo de uso
const backup = new BackupManager();

// Criar backup completo
backup.criarBackupCompleto();

// Configurar backup automático a cada 30 minutos
backup.configurarBackupAutomatico(30);

// Listar backups
console.log('Backups disponíveis:', backup.listarBackups());
```

**✅ Critérios de sucesso:**
* [x] Backup completo e incremental
* [x] Validação de integridade
* [x] Sistema de versionamento
* [x] Interface de gerenciamento

---

### **Exercício 3.4: Storage Distribuído**

**🎯 Objetivo:** Simular storage distribuído usando múltiplas estratégias

```javascript
// TODO: Implemente sistema de storage distribuído

class StorageDistribuido {
    constructor() {
        this.estrategias = new Map();
        this.configuracao = {
            replicacao: 2,
            sharding: true,
            consistencia: 'eventual'
        };
        this.inicializar();
    }

    // 1. Inicializar estratégias de storage
    inicializar() {
        // Seu código aqui
        // Registrar: localStorage, sessionStorage, IndexedDB simulado
    }

    // 2. Registrar estratégia de storage
    registrarEstrategia(nome, estrategia) {
        // Seu código aqui
    }

    // 3. Calcular shard para uma chave
    calcularShard(chave) {
        // Seu código aqui
        // Hash da chave % número de shards
    }

    // 4. Salvar com replicação
    salvar(chave, dados) {
        // Seu código aqui
        // Salvar em múltiplas estratégias
    }

    // 5. Recuperar com fallback
    obter(chave) {
        // Seu código aqui
        // Tentar múltiplas estratégias até encontrar
    }

    // 6. Verificar consistência
    verificarConsistencia(chave) {
        // Seu código aqui
        // Comparar dados entre réplicas
    }

    // 7. Sincronizar réplicas
    sincronizarReplicas(chave) {
        // Seu código aqui
    }

    // 8. Rebalancear shards
    rebalancearShards() {
        // Seu código aqui
    }

    // 9. Obter estatísticas de distribuição
    obterEstatisticas() {
        // Seu código aqui
    }

    // 10. Recuperar de falhas
    recuperarFalhas() {
        // Seu código aqui
    }
}

// Estratégias de storage
class LocalStorageStrategy {
    salvar(chave, dados) {
        localStorage.setItem(chave, JSON.stringify(dados));
    }

    obter(chave) {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : null;
    }

    remover(chave) {
        localStorage.removeItem(chave);
    }

    existe(chave) {
        return localStorage.getItem(chave) !== null;
    }
}

class SessionStorageStrategy {
    salvar(chave, dados) {
        sessionStorage.setItem(chave, JSON.stringify(dados));
    }

    obter(chave) {
        const dados = sessionStorage.getItem(chave);
        return dados ? JSON.parse(dados) : null;
    }

    remover(chave) {
        sessionStorage.removeItem(chave);
    }

    existe(chave) {
        return sessionStorage.getItem(chave) !== null;
    }
}

class MemoryStorageStrategy {
    constructor() {
        this.dados = new Map();
    }

    salvar(chave, dados) {
        this.dados.set(chave, JSON.parse(JSON.stringify(dados)));
    }

    obter(chave) {
        return this.dados.get(chave) || null;
    }

    remover(chave) {
        this.dados.delete(chave);
    }

    existe(chave) {
        return this.dados.has(chave);
    }
}

// Sistema de health check
class HealthChecker {
    constructor(storage) {
        this.storage = storage;
        this.intervalo = null;
    }

    // TODO: Implemente monitoramento de saúde

    iniciarMonitoramento(intervaloSegundos = 60) {
        // Seu código aqui
    }

    verificarSaude() {
        // Seu código aqui
        // Testar cada estratégia, verificar consistência
    }

    gerarRelatorioSaude() {
        // Seu código aqui
    }
}

// Exemplo de uso
const storage = new StorageDistribuido();

// Registrar estratégias
storage.registrarEstrategia('local', new LocalStorageStrategy());
storage.registrarEstrategia('session', new SessionStorageStrategy());
storage.registrarEstrategia('memory', new MemoryStorageStrategy());

// Salvar dados
storage.salvar('usuario_1', {
    nome: 'João',
    email: 'joao@email.com'
});

// Recuperar dados
console.log('Dados:', storage.obter('usuario_1'));

// Verificar consistência
console.log('Consistência:', storage.verificarConsistencia('usuario_1'));

// Estatísticas
console.log('Estatísticas:', storage.obterEstatisticas());
```

**✅ Critérios de sucesso:**
* [x] Múltiplas estratégias funcionando
* [x] Replicação automática
* [x] Verificação de consistência
* [x] Sistema de health check

---

## 🏆 **DESAFIOS BONUS**

*Projetos complexos e implementações criativas*

### **Desafio Bonus 1: Aplicação Completa com Storage**

**🎯 Objetivo:** Criar uma aplicação completa utilizando todos os conceitos

```javascript
// TODO: Crie uma aplicação completa de gerenciamento pessoal

/*
ESPECIFICAÇÕES DA APLICAÇÃO:

1. 📝 Sistema de Notas
   - CRUD completo
   - Categorias e tags
   - Busca full-text
   - Exportar/importar

2. 📋 Lista de Tarefas
   - Prioridades e status
   - Data de vencimento
   - Notificações
   - Sincronização entre abas

3. ⚙️ Configurações
   - Tema dark/light
   - Idioma
   - Preferências de notificação
   - Backup automático

4. 📊 Dashboard
   - Estatísticas de uso
   - Gráficos de produtividade
   - Relatórios

5. 🔄 Sincronização
   - Entre abas do navegador
   - Backup/restore
   - Export para múltiplos formatos

REQUISITOS TÉCNICOS:
- Usar LocalStorage para persistência
- Implementar cache inteligente
- Sistema de backup automático
- Interface responsiva
- Performance otimizada
- Tratamento de erros robusto
*/

class AplicacaoCompleta {
    constructor() {
        // TODO: Implemente aplicação completa
        this.inicializar();
    }

    inicializar() {
        // Seu código aqui
    }

    // Implementar todos os módulos necessários
}
```

### **Desafio Bonus 2: Framework de Storage**

**🎯 Objetivo:** Criar um framework reutilizável para storage

```javascript
// TODO: Crie um framework completo de storage

/*
ESPECIFICAÇÕES DO FRAMEWORK:

1. 🏗️ Architecture
   - Plugin system
   - Event system
   - Middleware support
   - Type safety

2. 🔧 Features
   - Multiple storage backends
   - Data validation
   - Automatic serialization
   - Query system
   - Transactions
   - Migrations

3. 🚀 Performance
   - Caching layer
   - Lazy loading
   - Compression
   - Batch operations

4. 🛡️ Security
   - Data encryption
   - Access control
   - Audit logging

5. 📚 Developer Experience
   - TypeScript support
   - Documentation
   - Examples
   - Testing utilities

EXEMPLO DE USO:
const db = new StorageFramework({
    name: 'myapp',
    version: 1,
    stores: {
        users: { 
            keyPath: 'id',
            indexes: ['email', 'name']
        },
        settings: {
            keyPath: 'key'
        }
    }
});

await db.users.add({ id: 1, name: 'João', email: 'joao@email.com' });
const user = await db.users.get(1);
const results = await db.users.where('name').equals('João').toArray();
*/

class StorageFramework {
    constructor(config) {
        // TODO: Implemente framework completo
    }

    // Implementar todas as funcionalidades especificadas
}
```

**✅ Critérios de sucesso para os desafios:**
* [x] Aplicação/Framework funcional completo
* [x] Documentação detalhada
* [x] Testes abrangentes
* [x] Performance otimizada
* [x] Código reutilizável e escalável

---

## 🎓 **CONCLUSÃO DOS EXERCÍCIOS**

### **📊 Resumo do Aprendizado**

Ao completar estes exercícios, você terá dominado:

* ✅ **Fundamentos** de LocalStorage e SessionStorage
* ✅ **Manipulação** de objetos JSON no storage
* ✅ **Sistemas práticos** de configuração e cache
* ✅ **Técnicas avançadas** de otimização e analytics
* ✅ **Arquiteturas complexas** de storage distribuído

### **🚀 Próximos Passos**

1. **Pratique** implementando variações dos exercícios
2. **Experimente** combinando diferentes técnicas
3. **Crie** seus próprios projetos usando os conceitos
4. **Estude** IndexedDB para storage mais avançado
5. **Explore** WebSQL e outras APIs de storage

### **💡 Dicas Finais**

* **Sempre** implemente tratamento de erros
* **Considere** limitações de espaço do localStorage
* **Teste** em diferentes navegadores
* **Monitore** performance em aplicações reais
* **Documente** seu código para facilitar manutenção

---

## 🔗 **RECURSOS ADICIONAIS**

### **📚 Documentação**

* [MDN - Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
* [MDN - IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
* [Can I Use - Storage](https://caniuse.com/namevalue-storage)

### **🛠️ Ferramentas**

* [Chrome DevTools - Application Tab](https://developers.google.com/web/tools/chrome-devtools/storage/localstorage)
* [Firefox DevTools - Storage Inspector](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)

### **📖 Artigos Recomendados**

* [Best Practices for LocalStorage](https://blog.logrocket.com/localstorage-javascript-complete-guide/)
* [Storage Quotas and Eviction Criteria](https://web.dev/storage-for-the-web/)

---

**🎯 Objetivo:** Capacitar desenvolvedores a criar aplicações web que persistem dados de forma eficiente e segura.

**💪 Meta final:** Dominar completamente as técnicas de storage no navegador para criar experiências de usuário superiores!
