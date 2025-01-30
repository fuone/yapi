/* <script id="yapiJs" type="text/javascript">
300125-b
*/
/***********************************
* Declarations
************************************/
/* sweetAlert2 */
const ICONESUCESSO = "success";
const ICONEERRO = "error";
const ICONEATENCAO = "warning";
const ICONEINFO = "info";
const ICONEPERGUNTA = "question";
var swalCustomClass='';
/***********************************
* Functions
************************************/
function TextToUpper(texto) {
    /* 0125
    * retorna o texto recebido em carixa alta 
    */
    return texto.toUpperCase();
}
//
function LetterToUpper(letra) {
    /* 0125
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
function DoMask(campo, mascara) {
    /* 0125
    * formata o campo de formulário recebido para aceitar somente valores que correspondem à mascara.
    * geralmente usado no evento onkeypres. Exemplo: onkeypress="DoMask(this,'SSS-000000/0000')"
    * dependences:
    *   - JQuery
    *   - JQuery Mask
    */
    $(campo).mask(mascara, {
        'translation': {
            S: { pattern: /[A-Za-z]/ },
        }
    });
}
//
function HideElementById(elementId) {
    /* 0125
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementId).addClass('hide');
}
//
function HideChildElementById(elementoPai, elementoFilho) {
    /* 0125
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementoPai + ' .' + elementoFilho).addClass('hide');
}
//
function ShowElementById(elementId) {
    /* 0125
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementId).removeClass('hide');
}
//
function ShowChildElementById(elementoPai, elementoFilho) {
    /* 0125
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementoPai + ' .' + elementoFilho).removeClass('hide');
}
//
function MsgBox(msg, titulo, icone, timer, posicao) {
    /* 0125
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
        case ICONEERRO: swalCustomClass = "y-btn-llgrey"; break;
        case ICONESUCESSO: swalCustomClass = "y-btn-green"; break;
        case ICONEINFO: swalCustomClass = "y-btn-info"; break;
        case ICONEPERGUNTA: swalCustomClass = "y-btn-blue"; break;
        case ICONEATENCAO: swalCustomClass = "y-btn-warning"; break;
        default: swalCustomClass = "y-btn-uv";
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
    /* 0125
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
function HasValue(opt) {
    /* 0125
    * Verifica se a variavel "opt" tem valor 
    * dependences: none
    */
    if (!opt || opt == "" || opt == null || opt === undefined) { return false } else { return true }
}
//
function HasSpecialChar(str) {
    /* 0125
    * Verifica se a variavel "str" contem caracter especial. Retorna true, se conter, ou false
    * dependences: none
    */
    let regex = /^(?=.*[.@!#$%^&*()\/\\])/;
    return regex.test(str)
}
//
function IsNull(opt) {
    /* 0125
    * Verifica se a variavel "opt" está vazia
    * dependences: none
    */
    if (!opt || opt == "" || opt == null || opt === undefined) { return true } else { return false }
}
//
function AddDays(date, dias) {
    date.setDate(date.getDate() + dias);
    return date
}
//
function CalcFutureDate(dtInicial, t) {
    return dtFutura = AddDays(new Date(dtInicial), t).toISOString().slice(0, 10);
}
//
/***********************************
* Functions que dependem do html
************************************/
function SetLoading(showHide) {
    /* 0125
    * dependences:
    *   - JQuery
    *   - html do modal spinner
    */
    switch (showHide) {
        case 'show': $('#spinnerModal').modal('show'); break;
        case 'hide': $('#spinnerModal').modal('hide'); break;
    }
}
//
function SetFooter(ver) {
    /* 0125
    * Os valores PROJINFO e DEVINFO sao trazidos do servidor
    * dependences:
    *   - hint.css
    *   - yapiStyle
    *   - JQuery*
    *   - html: <div id="footer" class=""></div>
    */
    let date = new Date();
    let code = '<p class="txt text-center font-weight-light">© ' + date.getFullYear() + ' - ' + PROJINFO.Name + ' v. <span class="version">' + ver + '</span> by <span class="hint--right" data-hint="' + DEVINFO.EmailAutor + '">' + DEVINFO.Autor + '</span></p>';
    //$('#footer').html(code); //jQuery
    document.getElementById('footer').innerHTML = code;
}
//
function ShowSidebarMenu(sidebarClass) {
    /* 0125
    * dependences:
    *   - yapiStyle
    *   - css da sidebar
    *   - html: <nav><ul><li class="menu-button" onclick=ShowSidebarMenu()>...</li></ul></nav>
    */
    if (IsNull(sidebarClass)) { console.log("function ShowSidebarMenu(sidebarClass) => É necessário especificar a classe corretamente"); return }
    /* se tiver caracter especial no inicio da string, retira */
    if (HasSpecialChar(sidebarClass.charAt(0))) { sidebarClass = sidebarClass.substr(1) }
    let sidebar = document.querySelector('.' + sidebarClass);
    sidebar.style.display = 'flex';
}
//
function HideSidebarMenu(sidebarClass) {
    /* 0125
    * dependences:
    *   - yapiStyle
    *   - css da sidebar
    *   - html: <nav><ul class="sidebar"><li onclick=HideSidebarMenu()>...</li></ul></nav>
    */
    if (IsNull(sidebarClass)) { console.log("function HideSidebarMenu(sidebarClass) => É necessário especificar a classe corretamente"); return }
    /* se tiver caracter especial no inicio da string, retira */
    if (HasSpecialChar(sidebarClass.charAt(0))) { sidebarClass = sidebarClass.substr(1) }
    let sidebar = document.querySelector('.' + sidebarClass);
    sidebar.style.display = 'none';
}
//
//
