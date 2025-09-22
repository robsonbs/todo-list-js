# Aula 7: LocalStorage e Persistência de Dados

![LocalStorage Banner](https://img.shields.io/badge/JavaScript-LocalStorage-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Nível](https://img.shields.io/badge/Nível-Intermediário-orange?style=for-the-badge)

![Duração](https://img.shields.io/badge/Duração-50_minutos-blue?style=for-the-badge)

![Exercícios](https://img.shields.io/badge/Exercícios-15_atividades-green?style=for-the-badge)

## 📋 Índice

* [Visão Geral](#-visão-geral)
* [Objetivos de Aprendizagem](#-objetivos-de-aprendizagem)
* [Estrutura da Aula](#-estrutura-da-aula)
* [Arquivos do Projeto](#-arquivos-do-projeto)
* [Como Usar](#-como-usar)
* [Conceitos Abordados](#-conceitos-abordados)
* [Demonstrações Práticas](#-demonstrações-práticas)
* [Exercícios](#-exercícios)
* [Sistema de Avaliação](#-sistema-de-avaliação)
* [Recursos Adicionais](#-recursos-adicionais)
* [Troubleshooting](#-troubleshooting)
* [Próximos Passos](#-próximos-passos)

## 🎯 Visão Geral

Esta aula apresenta os conceitos fundamentais de **persistência de dados no navegador** usando **localStorage** e **sessionStorage**. Os estudantes aprenderão a armazenar, recuperar e gerenciar dados localmente, criando aplicações mais dinâmicas e personalizadas.

### Por que LocalStorage é Importante?

* ✅ **Persistência**: Dados sobrevivem ao fechamento do navegador
* ✅ **Performance**: Acesso rápido sem requisições ao servidor
* ✅ **Experiência do Usuário**: Configurações e preferências mantidas
* ✅ **Funcionalidade Offline**: Aplicações funcionam sem internet
* ✅ **Personalização**: Interfaces adaptadas ao usuário

## 🎓 Objetivos de Aprendizagem

Ao final desta aula, o estudante será capaz de:

### Conhecimentos Técnicos

* [ ] Diferenciar localStorage de sessionStorage
* [ ] Utilizar métodos básicos de armazenamento (setItem, getItem, removeItem)
* [ ] Serializar e deserializar objetos JSON
* [ ] Implementar verificação de suporte do navegador
* [ ] Tratar erros de quota e disponibilidade

### Habilidades Práticas

* [ ] Criar sistemas de configuração persistentes
* [ ] Implementar cache de dados com expiração
* [ ] Desenvolver funcionalidades de carrinho de compras
* [ ] Gerenciar preferências de usuário
* [ ] Construir sistemas de favoritos

### Boas Práticas

* [ ] Validar dados antes do armazenamento
* [ ] Implementar fallbacks para navegadores antigos
* [ ] Otimizar performance do localStorage
* [ ] Considerar aspectos de segurança
* [ ] Estruturar dados de forma eficiente

## 🏗️ Estrutura da Aula

```
aula-07/
├── 📄 index.html              # Interface principal com demonstrações
├── 📄 codigo-progressivo.js   # Implementações JavaScript progressivas
├── 📄 exercicios.md          # 15 exercícios práticos organizados por nível
├── 📄 teste-progressivo.html # Sistema de avaliação automatizada
├── 📄 plano-aula.md         # Plano pedagógico estruturado (50min)
├── 📄 style.css             # Estilos CSS avançados
└── 📄 README.md             # Este documento (guia completo)
```

### Cronograma da Aula (50 minutos)

| ⏰ Tempo | 📚 Atividade | 🎯 Objetivo |
|---------|-------------|------------|
| **0-5min** | Abertura e Motivação | Contextualizar importância da persistência |
| **5-15min** | Conceitos Fundamentais | localStorage vs sessionStorage |
| **15-25min** | Métodos Básicos | setItem, getItem, removeItem, clear |
| **25-35min** | Objetos e JSON | Serialização e deserialização |
| **35-45min** | Aplicações Práticas | Sistemas reais e casos de uso |
| **45-50min** | Síntese e Próximos Passos | Resumo e direcionamentos |

## 📁 Arquivos do Projeto

### 🌐 `index.html` - Interface Principal

Interface interativa com navegação por tabs demonstrando:
* **Demo 1**: Conceitos básicos e primeiros passos
* **Demo 2**: Trabalhando com objetos JSON
* **Demo 3**: Sistema de configurações completo
* **Demo 4**: Cache de dados com expiração
* **Demo 5**: Aplicação prática (carrinho de compras)

**Características:**
* Design responsivo com Bootstrap 5.3.2
* Navegação intuitiva por tabs
* Progress indicator visual
* Integração com Font Awesome
* Animações CSS suaves

### ⚙️ `codigo-progressivo.js` - Implementações JavaScript

Contém três classes principais organizadas progressivamente:

```javascript
// Demonstração 1: Conceitos Básicos
class Demo1_ConceptosBasicos {
    // Métodos fundamentais e verificação de suporte
}

// Demonstração 2: Objetos JSON
class Demo2_ObjetosJSON {
    // Serialização, deserialização e validação
}

// Demonstração 3: Sistema de Configurações
class Demo3_Configuracoes {
    // Sistema completo de configurações persistentes
}
```

**Funcionalidades Implementadas:**
* ✅ Verificação de suporte do navegador
* ✅ Tratamento de erros e exceções
* ✅ Validação de dados
* ✅ Sistema de cache com expiração
* ✅ Operações CRUD completas
* ✅ Persistência de configurações

### 📝 `exercicios.md` - Sistema de Exercícios

15 exercícios organizados em 4 níveis de dificuldade:

#### 🟢 **Iniciante (4 exercícios)**

* Primeiros passos com localStorage
* Operações básicas de armazenamento
* Verificação de dados salvos

#### 🟡 **Intermediário (5 exercícios)**

* Objetos JavaScript e JSON
* Sistemas de configuração
* Validação e tratamento de erros

#### 🔴 **Avançado (4 exercícios)**

* Cache com expiração
* Performance e otimização
* Integração com APIs

#### 🎯 **Bonus (2 exercícios)**

* Projetos complexos e integrados
* Sistema completo de e-commerce
* Dashboard com múltiplas funcionalidades

### 🧪 `teste-progressivo.html` - Sistema de Avaliação

Sistema completo de avaliação automatizada:

**Características do Teste:**
* ⏱️ **Timer**: 20 minutos para conclusão
* 📊 **15 questões** cobrindo todos os conceitos
* 🔄 **Tipos variados**: múltipla escolha, código e prática
* 📈 **Analytics**: gráfico de performance por categoria
* 💾 **Persistência**: resultados salvos no localStorage

**Categorias Avaliadas:**
* Conceitos Básicos
* Métodos Básicos  
* Serialização JSON
* Recuperação de Dados
* Aplicação Prática
* Sistema de Configurações
* Tratamento de Erros
* Limitações e Segurança
* Performance
* Boas Práticas

### 📚 `plano-aula.md` - Plano Pedagógico

Plano estruturado com metodologia detalhada:

**Componentes:**
* 🎯 Objetivos de aprendizagem específicos
* ⏰ Cronograma minuto a minuto
* 🔧 Metodologias ativas aplicadas
* 📋 Critérios de avaliação
* 📖 Recursos necessários
* 🎲 Atividades interativas

### 🎨 `style.css` - Estilos Avançados

*(A ser implementado na próxima etapa)*

## 🚀 Como Usar

### 1. **Começar pela Interface Principal**

```bash
# Abrir no navegador
open index.html
# ou
python -m http.server 8000  # Para servidor local
```

### 2. **Seguir a Sequência Recomendada**

1. **Explorar Demonstrações** → `index.html`
2. **Estudar Código** → `codigo-progressivo.js`
3. **Praticar Exercícios** → `exercicios.md`
4. **Fazer Avaliação** → `teste-progressivo.html`
5. **Consultar Plano** → `plano-aula.md` (para educadores)

### 3. **Para Educadores**

* Usar `plano-aula.md` como roteiro
* Adaptar cronograma conforme necessidade
* Utilizar exercícios como atividades dirigidas
* Aplicar teste como avaliação formativa

### 4. **Para Estudantes Autodidatas**

* Seguir ordem dos demos na interface
* Experimentar código no console do navegador
* Praticar exercícios progressivamente
* Usar teste para autoavaliação

## 🧠 Conceitos Abordados

### 1. **Fundamentos de Web Storage**

#### localStorage vs sessionStorage

```javascript
// localStorage - persiste até ser removido
localStorage.setItem('usuario', 'João');

// sessionStorage - persiste apenas na sessão
sessionStorage.setItem('carrinho', 'temporario');
```

#### Verificação de Suporte

```javascript
function verificarSuporte() {
    try {
        return typeof(Storage) !== "undefined" && localStorage;
    } catch (error) {
        return false;
    }
}
```

### 2. **Operações Básicas (CRUD)**

#### Create/Update

```javascript
localStorage.setItem('chave', 'valor');
```

#### Read

```javascript
const valor = localStorage.getItem('chave');
```

#### Delete

```javascript
localStorage.removeItem('chave');
localStorage.clear(); // Remove tudo
```

### 3. **Trabalhando com Objetos**

#### Serialização

```javascript
const usuario = {
    nome: 'Ana',
    idade: 28
};
localStorage.setItem('usuario', JSON.stringify(usuario));
```

#### Deserialização

```javascript
const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
```

### 4. **Tratamento de Erros**

#### Quota Exceeded

```javascript
function salvarSeguro(chave, valor) {
    try {
        localStorage.setItem(chave, valor);
        return true;
    } catch (error) {
        if (error.code === 22) {
            console.log('Quota do localStorage excedida');
        }
        return false;
    }
}
```

### 5. **Cache com Expiração**

#### Implementação

```javascript
function salvarComExpiracao(chave, dados, minutos) {
    const item = {
        dados: dados,
        expira: Date.now() + (minutos * 60 * 1000)
    };
    localStorage.setItem(chave, JSON.stringify(item));
}

function obterSeValido(chave) {
    const item = JSON.parse(localStorage.getItem(chave));
    if (item && Date.now() < item.expira) {
        return item.dados;
    }
    localStorage.removeItem(chave);
    return null;
}
```

## 🛠️ Demonstrações Práticas

### Demo 1: Conceitos Básicos

* Verificação de suporte
* Operações CRUD básicas
* Monitoramento do storage

### Demo 2: Objetos JSON

* Serialização de objetos
* Validação de dados
* Recuperação segura

### Demo 3: Sistema de Configurações

* Tema claro/escuro
* Tamanho de fonte
* Preferências de idioma
* Aplicação automática

### Demo 4: Cache de Dados

* Cache com expiração
* Gestão automática
* Performance otimizada

### Demo 5: Carrinho de Compras

* Adicionar/remover produtos
* Cálculo de totais
* Persistência entre sessões

## 📚 Exercícios

### Estrutura dos Exercícios

Cada exercício inclui:
* 🎯 **Objetivo claro**
* 📋 **Instruções detalhadas**
* 💡 **Dicas e orientações**
* ✅ **Critérios de validação**
* 🔗 **Conexão com conceitos anteriores**

### Progressão de Dificuldade

```
Iniciante → Intermediário → Avançado → Bonus
    ↓            ↓            ↓         ↓
Conceitos    Aplicações   Otimização  Projetos
 Básicos     Práticas     Performance  Completos
```

### Exemplos de Exercícios

#### 🟢 **Iniciante - Exercício 1**

**Objetivo**: Criar um sistema simples de favoritos

```javascript
// Implementar funções para:
function adicionarFavorito(item) {
    // Seu código aqui
}

function listarFavoritos() {
    // Seu código aqui
}

function removerFavorito(item) {
    // Seu código aqui
}
```

#### 🔴 **Avançado - Exercício 12**

**Objetivo**: Sistema completo de cache com analytics

```javascript
class CacheManager {
    constructor(maxSize = 100) {
        // Implementar sistema LRU
    }

    set(key, data, ttl) {
        // Cache com expiração
    }

    get(key) {
        // Recuperação com analytics
    }

    getStats() {
        // Estatísticas de uso
    }
}
```

## 🎯 Sistema de Avaliação

### Tipos de Questões

#### 1. **Múltipla Escolha** (60%)

* Conceitos fundamentais
* Diferenças entre APIs
* Boas práticas

#### 2. **Análise de Código** (25%)

* Completar implementações
* Identificar problemas
* Otimizar soluções

#### 3. **Exercícios Práticos** (15%)

* Implementação completa
* Testes interativos
* Validação automática

### Sistema de Pontuação

```
Questões Teóricas: 1 ponto cada
Questões de Código: 1 ponto cada  
Exercícios Práticos: 2 pontos cada
Total Máximo: 18 pontos
```

### Classificação de Performance

| 📊 Pontuação | 🏆 Nível | 📝 Descrição |
|-------------|----------|-------------|
| **90-100%** | Excelente | Domínio completo dos conceitos |
| **80-89%** | Bom | Entendimento sólido, poucos gaps |
| **70-79%** | Regular | Base adequada, precisa praticar |
| **<70%** | Revisar | Necessário estudar mais o conteúdo |

### Analytics Detalhados

O sistema fornece:
* 📈 **Gráfico radar** por categoria
* 📊 **Performance temporal** (histórico)
* 🎯 **Pontos fortes e fracos**
* 💡 **Recomendações personalizadas**
* 📋 **Plano de estudos sugerido**

## 📖 Recursos Adicionais

### 🔗 **Links Úteis**

* [MDN - Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
* [Can I Use - localStorage](https://caniuse.com/namevalue-storage)
* [HTML5 Storage Quotas](https://web.dev/storage-for-the-web/)

### 📚 **Leitura Complementar**

* IndexedDB para dados mais complexos
* Service Workers para cache avançado
* Web SQL Database (descontinuado)
* Cache API para recursos estáticos

### 🛠️ **Ferramentas Recomendadas**

* Chrome DevTools → Application → Storage
* Firefox Developer Tools → Storage Inspector
* LocalStorage Manager Extensions
* Storage Quota Management

### 🎥 **Recursos Visuais**

* Diagramas de fluxo de dados
* Comparações lado a lado
* Exemplos interativos
* Casos de uso reais

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. **localStorage não funciona**

```javascript
// Verificação básica
if (typeof(Storage) !== "undefined") {
    // localStorage disponível
} else {
    // Navegador não suporta
}
```

#### 2. **Quota Exceeded Error**

```javascript
// Limpeza automática
function limparCacheAntigo() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        try {
            const item = JSON.parse(localStorage.getItem(key));
            if (item.expira && Date.now() > item.expira) {
                localStorage.removeItem(key);
            }
        } catch (e) {
            // Item não é JSON, manter
        }
    });
}
```

#### 3. **Dados Corrompidos**

```javascript
// Recuperação segura
function obterSeguro(chave, padrao = null) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || padrao;
    } catch (error) {
        console.warn(`Dados corrompidos em ${chave}:`, error);
        localStorage.removeItem(chave);
        return padrao;
    }
}
```

#### 4. **Performance Lenta**

```javascript
// Cache em memória
class LocalStorageCache {
    constructor() {
        this.cache = new Map();
        this.maxSize = 100;
    }

    get(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }

        const value = localStorage.getItem(key);
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, value);
        return value;
    }
}
```

### Compatibilidade

#### Navegadores Suportados

* ✅ Chrome 4+
* ✅ Firefox 3.5+
* ✅ Safari 4+
* ✅ IE 8+
* ✅ Edge (todos)

#### Fallbacks para Navegadores Antigos

```javascript
// Polyfill simples
if (!window.localStorage) {
    window.localStorage = {
        getItem: function(key) {
            return this[key] || null;
        },
        setItem: function(key, value) {
            this[key] = value;
        },
        removeItem: function(key) {
            delete this[key];
        }
    };
}
```

## 🎯 Próximos Passos

### Para Estudantes

#### Nível Básico Alcançado ✅

* [ ] Revisar conceitos fundamentais
* [ ] Praticar exercícios básicos
* [ ] Criar projeto pessoal simples

#### Próximo Nível 🎯

* [ ] **Aula 8**: Manipulação do DOM Avançada
* [ ] **Aula 9**: Eventos e Interações Complexas
* [ ] **Aula 10**: APIs e Requisições HTTP

#### Aprofundamento 📚

* [ ] IndexedDB para dados complexos
* [ ] Service Workers
* [ ] Progressive Web Apps (PWA)
* [ ] Cache API

### Para Educadores

#### Adaptações Possíveis

* Ajustar cronograma conforme turma
* Adicionar exercícios específicos
* Criar avaliações customizadas
* Integrar com projetos maiores

#### Extensões Recomendadas

* Workshop de PWA
* Projeto integrado com backend
* Comparação com outras tecnologias
* Estudos de caso reais

### Projetos Sugeridos

#### 📱 **Projeto Básico**: Lista de Tarefas Persistente

* CRUD completo
* Filtros e categorias
* Backup/restore

#### 📊 **Projeto Intermediário**: Dashboard Pessoal

* Múltiplos widgets
* Configurações personalizáveis
* Temas e layouts

#### 🛒 **Projeto Avançado**: E-commerce Completo

* Carrinho persistente
* Histórico de compras
* Sistema de favoritos
* Cache de produtos

---

## 📞 Suporte e Feedback

### Como Obter Ajuda

* 💬 **Issues no repositório**: Para bugs e melhorias
* 📧 **Contato direto**: Para dúvidas específicas
* 🎓 **Fórum da comunidade**: Para discussões gerais

### Contribuições

Contribuições são bem-vindas! Veja nosso [guia de contribuição](../CONTRIBUTING.md).

### Avaliação do Conteúdo

Sua opinião é importante! Use o [formulário de feedback](../feedback.md) para nos ajudar a melhorar.

---

<div align="center">

**🎓 Curso Completo de JavaScript**

*Aula 7: LocalStorage e Persistência de Dados*

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-blue?style=flat)](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
[![Educação](https://img.shields.io/badge/Educação-Interativa-green?style=flat)](https://github.com/robsonbs/todo-list-js)

**Preparado com ❤️ para a comunidade de desenvolvedores**

*Última atualização: Setembro 2025*

</div>
