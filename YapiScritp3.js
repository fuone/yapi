/*************************
*  YAPISCRIPT 3.0
* Framework JavaScript. Esse arquivo é parte do framwork Yapi
* Edição 07/2026
* Dev: Fuone
* fuone.dev@gmaill.com
**************************/
/*
* 140926
*/

const ICONE_SA_SUCESSO = "success";
const ICONE_SA_ERRO = "error";
const ICONE_SA_ATENCAO = "warning";
const ICONE_SA_INFO = "info";
const ICONE_SA_PERGUNTA = "question";
var swalCustomClass = '';

/*iniciação das funções no carregamento da página*/
document.addEventListener('DOMContentLoaded', function() {
  InitTabs()
  InitCollapses()
  SetupAlertClosing();
});

function MsgBox(msg, titulo, icone, timer, posicao) {
    /* 0726
    * dependences:
    *   - sweetalert2
    *   - yapiStyle
    *   - declaracoes previas e global dos icones
    */
    if (IsNull(msg)) { msg = "Não há mensagem" }
    if (IsNull(titulo)) { titulo = "Atenção!"; }
    if (IsNull(icone)) { icone = "warning"; }
    if (IsNull(timer)) { timer = 3000; }
    if (IsNull(posicao)) { posicao = "center"; }
    switch (icone) {
        case ICONE_SA_ERRO: swalCustomClass = "btn grey"; break;
        case ICONE_SA_SUCESSO: swalCustomClass = "btn green"; break;
        case ICONE_SA_INFO: swalCustomClass = "btn teal btn-light"; break;
        case ICONE_SA_PERGUNTA: swalCustomClass = "btn blue"; break;
        case ICONE_SA_ATENCAO: swalCustomClass = "btn yellow"; break;
        default: swalCustomClass = "btn purple";
    }
    Swal.fire({
        title: TextToUpper(titulo),
        html: msg,
        icon: icone,
        position: posicao,
        timer: timer,
        timerProgressBar: true,
        buttonsStyling: false,
        showCancelButton: false,
        customClass: {
            confirmButton: 'btn btn-lg ' + swalCustomClass,
            cancelButton: 'btn btn-lg y-btn-llgrey',
            loader: 'custom-loader',
        },
        didOpen: (timer) => {
            timer.addEventListener('mouseenter', Swal.stopTimer)
            timer.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
}
//
function ToastBox(msg, titulo, icone, timer, posicao) {
    /* 0726
    * dependences:
    *   - sweetalert2
    *   - yapiStyle
    *   - declaracoes previas e global dos icones
    */

    if (IsNull(msg)) { msg = "Não há mensagem" }
    if (IsNull(titulo)) { titulo = "Atenção!"; }
    if (IsNull(icone)) { icone = "warning"; }
    if (IsNull(timer)) { timer = 3000; }
    if (IsNull(posicao)) { posicao = "bottom"; }
    Swal.fire({
        title: TextToUpper(titulo),
        html: msg,
        icon: icone,
        toast: true,
        animation: true,
        position: posicao,
        timer: timer,
        timerProgressBar: true,
        showConfirmButton: false,
        width: 'auto',
        customClass: { popup: 'msg-box' + swalCustomClass },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
}
//
function IsNull(opt) {
    /* 0726
    * Verifica se a variavel "opt" está vazia
    * dependences: none
    */
    if (!opt || opt == "" || opt == null || opt === undefined) { return true } else { return false }
}
//
function HasValue(opt) {
    /* 0726
    * Verifica se a variavel "opt" tem valor 
    * dependences: none
    */
    if (!opt || opt == "" || opt == null || opt === undefined) { return false } else { return true }
}
//
function LetterToUpper(letra) {
    /* 0726
    * retorna a letra recebida em caixa alta.
    * geralmente usado no evento "oninput"
    */
    var ss = letra.target.selectionStart;
    var se = letra.target.selectionEnd;
    letra.target.value = letra.target.value.toUpperCase();
    letra.target.selectionStart = ss;
    letra.target.selectionEnd = se;
}
//
function TextToUpper(texto) {
    /* 0726
    * retorna o texto recebido em carixa alta 
    */
    return texto.toUpperCase();
}
//
function InitTabs() {
  const tabGroups = document.querySelectorAll('.tab-group');

  // Inicialização: define a primeira aba como ativa se nenhuma foi declarada
  tabGroups.forEach(group => {
    const activeTrigger = group.querySelector('.tab-trigger.is-active');
    
    if (!activeTrigger) {
      const firstTrigger = group.querySelector('.tab-trigger');
      if (firstTrigger) {
        firstTrigger.classList.add('is-active');
        const targetId = firstTrigger.getAttribute('aria-controls');
        const targetContent = group.querySelector(`#${targetId}`);
        if (targetContent) {
          targetContent.classList.add('is-active');
        }
      }
    }
  });

  // Event Listeners para a troca de abas
  const triggers = document.querySelectorAll('.tab-group .tab-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();

      const currentTrigger = event.currentTarget;
      const targetId = currentTrigger.getAttribute('aria-controls');
      
      const tabGroup = currentTrigger.closest('.tab-group');
      if (!tabGroup) return;

      // Desativa apenas os itens deste tab-group específico
      tabGroup.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('is-active'));
      tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('is-active'));

      // Ativa o gatilho clicado e o conteúdo alvo
      currentTrigger.classList.add('is-active');
      const targetContent = tabGroup.querySelector(`#${targetId}`);
      if (targetContent) {
        targetContent.classList.add('is-active');
      }
    });
  });
}
//
function InitCollapses() {
  /*0826
  * Inicializa todos os componentes de collapse/accordion
  */
  const triggers = document.querySelectorAll('.collapse-trigger');

  triggers.forEach(trigger => {
    // Evita reinicializar o mesmo elemento caso a função seja chamada mais de uma vez
    if (trigger.dataset.collapseInitialized) return;
    trigger.dataset.collapseInitialized = 'true';

    const isNativeButton = trigger.tagName === 'BUTTON';

    if (!isNativeButton) {
      if (!trigger.hasAttribute('tabindex')) trigger.setAttribute('tabindex', '0');
      if (!trigger.hasAttribute('role')) trigger.setAttribute('role', 'button');
    }

    const toggleCollapse = (event) => {
      if (event) {
        event.stopPropagation();
      }

      const targetId = trigger.getAttribute('aria-controls');
      const target = document.getElementById(targetId);

      if (!target) return;

      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // LÓGICA DO ACORDEÃO
      const accordionContainer = trigger.closest('.collapse-accordion-group');
      
      const isAccordion = accordionContainer !== null && (
        target.classList.contains('collapse-accordion') || 
        trigger.classList.contains('collapse-accordion')
      );

      if (isAccordion && !isOpen) {
        const otherTriggers = accordionContainer.querySelectorAll('.collapse-trigger');

        otherTriggers.forEach(otherTrigger => {
          if (otherTrigger !== trigger) {
            const otherTargetId = otherTrigger.getAttribute('aria-controls');
            const otherTarget = document.getElementById(otherTargetId);

            const isOtherAccordion = otherTarget?.classList.contains('collapse-accordion') || 
                                     otherTrigger.classList.contains('collapse-accordion');

            if (otherTarget && isOtherAccordion) {
              otherTrigger.setAttribute('aria-expanded', 'false');
              otherTarget.classList.remove('is-open');
            }
          }
        });
      }

      // ALTERNA O ITEM ATUAL
      const newState = !isOpen;
      trigger.setAttribute('aria-expanded', String(newState));
      target.classList.toggle('is-open', newState);
    };

    // Evento de Clique
    trigger.addEventListener('click', toggleCollapse);

    // Evento de Teclado
    if (!isNativeButton) {
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          toggleCollapse(event);
        }
      });
    }
  });
}

function SetupAlertClosing() {
    // Evento de clique com verificação da classe 'disabled'
    document.addEventListener('click', function(event) {
      const closeBtn = event.target.closest('.alert-close-btn');
      
      if (closeBtn) {
        const alertContainer = closeBtn.closest('.y-alert');
        
        // Se o container existe E possui a classe 'disabled', interrompe a execução
        if (alertContainer && alertContainer.classList.contains('disabled')) {
          return;
        }

        if (alertContainer) {
          // Aplica o esmaecimento e remove do DOM
          alertContainer.classList.add('fade-out');

          alertContainer.addEventListener('transitionend', function() {
            alertContainer.remove();
          }, { once: true });
        }
      }
    });
  }
