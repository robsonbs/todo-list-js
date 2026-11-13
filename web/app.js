// ============================================================
// APP.JS — Interface online da lista de tarefas
// ------------------------------------------------------------
// Responsabilidade: conversar com a API e renderizar a conta autenticada.
// NÃO faz: não guarda senha/token de sessão nem decide autorização.
// Conceitos ensinados: fetch, HTTP, JSON, DOM seguro e estado assíncrono.
// ============================================================

const painelConta = document.querySelector('#painel-conta');
const painelTarefas = document.querySelector('#painel-tarefas');
const mensagem = document.querySelector('#mensagem');
const formularioLogin = document.querySelector('#form-login');
const formularioCadastro = document.querySelector('#form-cadastro');
const formularioEsqueciSenha = document.querySelector('#form-esqueci-senha');
const formularioReenviarConfirmacao = document.querySelector('#form-reenviar-confirmacao');
const formularioRedefinirSenha = document.querySelector('#form-redefinir-senha');
const formularioNovaTarefa = document.querySelector('#form-nova-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const listaVazia = document.querySelector('#lista-vazia');
const painelImportacao = document.querySelector('#painel-importacao');
const botaoImportar = document.querySelector('#botao-importar');
const indicadorCarregamento = document.querySelector('#carregamento-tarefas');

let tokenCsrf;
let tokenRedefinicao;

// ========== COMUNICACAO HTTP ==========

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
}

async function obterTokenCsrf() {
  const resposta = await fetch('/api/csrf-token', {
    headers: { Accept: 'application/json' },
    credentials: 'same-origin',
  });

  const dados = await resposta.json();
  if (!resposta.ok) {
    throw new Error(dados.erro ?? 'Não foi possível iniciar uma sessão segura.');
  }

  tokenCsrf = dados.token;
}

async function chamarApi(caminho, { metodo = 'GET', dados: corpo } = {}) {
  const cabecalhos = { Accept: 'application/json' };
  const metodoAlteraDados = !['GET', 'HEAD', 'OPTIONS'].includes(metodo);

  if (corpo !== undefined) {
    cabecalhos['Content-Type'] = 'application/json';
  }

  if (metodoAlteraDados) {
    if (!tokenCsrf) {
      await obterTokenCsrf();
    }
    cabecalhos['X-CSRF-Token'] = tokenCsrf;
  }

  const resposta = await fetch(caminho, {
    method: metodo,
    headers: cabecalhos,
    credentials: 'same-origin',
    ...(corpo !== undefined ? { body: JSON.stringify(corpo) } : {}),
  });
  const resultado = resposta.status === 204 ? null : await resposta.json();

  if (resposta.status === 403) {
    tokenCsrf = undefined;
  }

  if (!resposta.ok) {
    throw new Error(resultado?.erro ?? 'Não foi possível concluir a operação.');
  }

  return resultado;
}

// ========== ESTADO DA CONTA ==========

function mostrarTelaDeConta() {
  painelConta.hidden = false;
  painelTarefas.hidden = true;
}

function mostrarTelaDeTarefas(usuario) {
  painelConta.hidden = true;
  painelTarefas.hidden = false;
  document.querySelector('#email-atual').textContent = usuario.email;
}

async function atualizarConta() {
  const dados = await chamarApi('/api/auth/me');

  if (!dados.autenticado) {
    mostrarTelaDeConta();
    return;
  }

  mostrarTelaDeTarefas(dados.usuario);
  await carregarTarefas();
}

// ========== LISTA E IMPORTACAO ==========

function obterTarefasLocais() {
  try {
    const conteudo = localStorage.getItem('tarefas');
    const tarefas = conteudo ? JSON.parse(conteudo) : [];

    if (!Array.isArray(tarefas)) {
      return [];
    }

    return tarefas.map((tarefa) => ({
      texto: tarefa.texto ?? tarefa.text ?? '',
      completa: tarefa.completa === true || tarefa.completed === true,
    }));
  } catch {
    mostrarMensagem('Não foi possível ler as tarefas locais para importar.');
    return [];
  }
}

async function atualizarOpcaoImportacao() {
  const locais = obterTarefasLocais();
  if (locais.length === 0) {
    painelImportacao.hidden = true;
    return;
  }

  const estado = await chamarApi('/api/tarefas/importacao');
  painelImportacao.hidden = estado.importada;
}

function criarBotao(texto, rotulo, classe, aoAtivar) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = classe;
  botao.textContent = texto;
  botao.setAttribute('aria-label', rotulo);
  botao.addEventListener('click', aoAtivar);
  return botao;
}

function iniciarEdicao(item, tarefa) {
  const formulario = document.createElement('form');
  formulario.className = 'editor-tarefa';

  const campo = document.createElement('input');
  campo.type = 'text';
  campo.maxLength = 100;
  campo.required = true;
  campo.value = tarefa.texto;
  campo.setAttribute('aria-label', `Editar tarefa: ${tarefa.texto}`);

  const salvar = document.createElement('button');
  salvar.type = 'submit';
  salvar.className = 'botao botao-principal botao-pequeno';
  salvar.textContent = 'Salvar';

  const cancelar = document.createElement('button');
  cancelar.type = 'button';
  cancelar.className = 'botao botao-secundario botao-pequeno';
  cancelar.textContent = 'Cancelar';
  cancelar.addEventListener('click', () => renderizarTarefa(item, tarefa));

  formulario.append(campo, salvar, cancelar);
  item.replaceChildren(formulario);
  campo.focus();

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    salvar.disabled = true;

    try {
      await chamarApi(`/api/tarefas/${tarefa.id}`, {
        metodo: 'PATCH',
        dados: { texto: campo.value },
      });
      await carregarTarefas();
      mostrarMensagem('Tarefa atualizada.');
    } catch (erro) {
      mostrarMensagem(erro.message);
      salvar.disabled = false;
    }
  });
}

function renderizarTarefa(item, tarefa) {
  item.className = tarefa.completa ? 'item-tarefa concluida' : 'item-tarefa';
  item.replaceChildren();

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = tarefa.completa;
  checkbox.setAttribute('aria-label', `Concluir tarefa: ${tarefa.texto}`);
  checkbox.addEventListener('change', async () => {
    checkbox.disabled = true;
    try {
      await chamarApi(`/api/tarefas/${tarefa.id}`, {
        metodo: 'PATCH',
        dados: { completa: checkbox.checked },
      });
      await carregarTarefas();
    } catch (erro) {
      checkbox.checked = tarefa.completa;
      checkbox.disabled = false;
      mostrarMensagem(erro.message);
    }
  });

  const texto = document.createElement('span');
  texto.className = 'texto-item-tarefa';
  texto.textContent = tarefa.texto;

  const botoes = document.createElement('div');
  botoes.className = 'botoes-tarefa';
  botoes.append(
    criarBotao(
      'Editar',
      `Editar tarefa: ${tarefa.texto}`,
      'botao botao-secundario botao-pequeno',
      () => {
        iniciarEdicao(item, tarefa);
      }
    ),
    criarBotao(
      'Remover',
      `Remover tarefa: ${tarefa.texto}`,
      'botao botao-remover botao-pequeno',
      async () => {
        const remover = item.querySelector('.botao-remover');
        remover.disabled = true;
        try {
          await chamarApi(`/api/tarefas/${tarefa.id}`, { metodo: 'DELETE' });
          await carregarTarefas();
          mostrarMensagem('Tarefa removida.');
        } catch (erro) {
          remover.disabled = false;
          mostrarMensagem(erro.message);
        }
      }
    )
  );

  item.append(checkbox, texto, botoes);
}

async function carregarTarefas() {
  indicadorCarregamento.hidden = false;
  listaVazia.hidden = true;

  try {
    const dados = await chamarApi('/api/tarefas');
    listaTarefas.replaceChildren();

    for (const tarefa of dados.tarefas) {
      const item = document.createElement('li');
      renderizarTarefa(item, tarefa);
      listaTarefas.append(item);
    }

    listaVazia.hidden = dados.tarefas.length > 0;
    await atualizarOpcaoImportacao();
  } finally {
    indicadorCarregamento.hidden = true;
  }
}

// ========== FORMULARIOS DE CONTA ==========

document.querySelector('#abrir-cadastro').addEventListener('click', () => {
  formularioLogin.hidden = true;
  formularioCadastro.hidden = false;
  formularioCadastro.querySelector('input').focus();
});

document.querySelector('#voltar-login').addEventListener('click', () => {
  formularioCadastro.hidden = true;
  formularioLogin.hidden = false;
  formularioLogin.querySelector('input').focus();
});

formularioLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const formulario = new FormData(formularioLogin);

  try {
    await chamarApi('/api/auth/login', {
      metodo: 'POST',
      dados: {
        email: formulario.get('email'),
        senha: formulario.get('senha'),
      },
    });
    tokenCsrf = undefined;
    mostrarMensagem('Bem-vindo de volta!');
    await atualizarConta();
    await obterTokenCsrf();
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

formularioCadastro.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const formulario = new FormData(formularioCadastro);

  try {
    const resposta = await chamarApi('/api/auth/registrar', {
      metodo: 'POST',
      dados: {
        email: formulario.get('email'),
        senha: formulario.get('senha'),
      },
    });
    mostrarMensagem(resposta.mensagem);
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

formularioEsqueciSenha.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const formulario = new FormData(formularioEsqueciSenha);

  try {
    const resposta = await chamarApi('/api/auth/esqueci-senha', {
      metodo: 'POST',
      dados: { email: formulario.get('email') },
    });
    mostrarMensagem(resposta.mensagem);
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

formularioReenviarConfirmacao.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const formulario = new FormData(formularioReenviarConfirmacao);

  try {
    const resposta = await chamarApi('/api/auth/reenviar-confirmacao', {
      metodo: 'POST',
      dados: { email: formulario.get('email') },
    });
    mostrarMensagem(resposta.mensagem);
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

formularioRedefinirSenha.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    const resposta = await chamarApi('/api/auth/redefinir-senha', {
      metodo: 'POST',
      dados: {
        token: tokenRedefinicao,
        senha: new FormData(formularioRedefinirSenha).get('senha'),
      },
    });
    tokenRedefinicao = undefined;
    formularioRedefinirSenha.hidden = true;
    formularioLogin.hidden = false;
    mostrarMensagem(resposta.mensagem);
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

document.querySelector('#botao-sair').addEventListener('click', async () => {
  try {
    await chamarApi('/api/auth/logout', { metodo: 'POST' });
    tokenCsrf = undefined;
    listaTarefas.replaceChildren();
    mostrarTelaDeConta();
    mostrarMensagem('Você saiu da sua conta.');
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

// ========== OPERACOES DA LISTA ==========

formularioNovaTarefa.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const campo = formularioNovaTarefa.elements.namedItem('texto');
  const botao = formularioNovaTarefa.querySelector('button[type="submit"]');
  botao.disabled = true;

  try {
    await chamarApi('/api/tarefas', {
      metodo: 'POST',
      dados: { texto: campo.value },
    });
    formularioNovaTarefa.reset();
    await carregarTarefas();
    campo.focus();
    mostrarMensagem('Tarefa adicionada.');
  } catch (erro) {
    mostrarMensagem(erro.message);
  } finally {
    botao.disabled = false;
  }
});

botaoImportar.addEventListener('click', async () => {
  botaoImportar.disabled = true;

  try {
    const resposta = await chamarApi('/api/tarefas/importar', {
      metodo: 'POST',
      dados: { tarefas: obterTarefasLocais() },
    });
    mostrarMensagem(`${resposta.importadas} tarefas importadas para sua conta.`);
    await carregarTarefas();
  } catch (erro) {
    mostrarMensagem(erro.message);
  } finally {
    botaoImportar.disabled = false;
  }
});

// ========== LINKS DE EMAIL ==========

async function processarLinkDeAutenticacao() {
  const url = new URL(window.location.href);
  const tokenConfirmacao = url.searchParams.get('confirmar-email');
  const tokenSenha = url.searchParams.get('redefinir-senha');

  if (!tokenConfirmacao && !tokenSenha) {
    return;
  }

  url.searchParams.delete('confirmar-email');
  url.searchParams.delete('redefinir-senha');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);

  if (tokenSenha) {
    tokenRedefinicao = tokenSenha;
    formularioLogin.hidden = true;
    formularioCadastro.hidden = true;
    formularioRedefinirSenha.hidden = false;
    formularioRedefinirSenha.querySelector('input').focus();
    mostrarMensagem('Defina sua nova senha. O link pode ser usado uma única vez.');
    return;
  }

  try {
    const resposta = await chamarApi('/api/auth/confirmar-email', {
      metodo: 'POST',
      dados: { token: tokenConfirmacao },
    });
    mostrarMensagem(resposta.mensagem);
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
}

// ========== INICIALIZACAO ==========

try {
  await processarLinkDeAutenticacao();
  await atualizarConta();
} catch (erro) {
  mostrarTelaDeConta();
  mostrarMensagem(`Não foi possível conectar ao servidor: ${erro.message}`);
}
