/* <script id="yapiJs" type="text/javascript">
25012025
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

/***********************************
* Functions
************************************/
function TextToUpper(texto) {
    /* 012025
    * retorna o texto recebido em carixa alta 
    */
    return texto.toUpperCase();
}
//
function LetterToUpper(letra){
    /* 012025
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
function DoMask(campo, mascara){
    /* 012025
    * formata o campo de formulário recebido para aceitar somente valores que correspondem à mascara.
    * geralmente usado no evento onkeypres. Exemplo: onkeypress="DoMask(this,'SSS-000000/0000')"
    * dependences:
    *   - JQuery
    */
    $(campo).mask(mascara, {
      'translation': {
        S: {pattern: /[A-Za-z]/},
      }
    });  
  }
//
function HideElementById(elementId) {
    /*012025
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementId).addClass('hide');
}
//
function HideChildElementById(elementoPai, elementoFilho) {
    /* 012025
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementoPai + ' .' + elementoFilho).addClass('hide');
}
//
function ShowElementById(elementId) {
    /* 012025
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementId).removeClass('hide');
}
//
function ShowChildElementById(elementoPai, elementoFilho) {
    /* 012025
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementoPai + ' .' + elementoFilho).removeClass('hide');
}
//
function MsgBox(msg, titulo, icone, timer) {
    /* 012025
    * dependences:
    *   - sweetalert2
    *   - yapiStyle
    *   - declarações prévias e global dos ícones
    */
    let t = titulo;
    let i = icone;
    if (t == "") { t = "Atenção!"; }
    if (i == "") { i = IconeAtencao; }
    if (timer == "") { timer = 0; }
    let confirmButtonCClass;
    switch (icone) {
        case ICONEERRO: confirmButtonCClass = "y-btn-llgrey"; break;
        case ICONESUCESSO: confirmButtonCClass = "y-btn-green"; break;
        case ICONEINFO: confirmButtonCClass = "y-btn-info"; break;
        case ICONEPERGUNTA: confirmButtonCClass = "y-btn-blue"; break;
        default: confirmButtonCClass = "y-btn-uv";
    }
    Swal.fire({
        title: TextToUpper(t),
        html: msg,
        icon: i,
        timer: timer,
        timerProgressBar: true,
        buttonsStyling: false,
        showCancelButton: false,
        customClass: {
            confirmButton: 'btn btn-lg ' + confirmButtonCClass,
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
function ToastBox(msg, titulo, icone, timer) {
    /* 012025
    * dependences:
    *   - sweetalert2
    *   - yapiStyle
    *   - declarações prévias e global dos ícones
    */
    let t = titulo;
    let i = icone;
    if (t == "") { t = "Atenção!"; }
    if (i == "") { i = IconeAtencao; }
    if (timer == "") { timer = 3000; }
    Swal.fire({
        title: TextToUpper(t),
        html: msg,
        icon: i,
        toast: true,
        animation: true,
        position: 'bottom',
        timer: timer,
        timerProgressBar: true,
        showConfirmButton: false,
        width: 'auto',
        customClass: { popup: 'colored-toast toast-sm' },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
}
//
/***********************************
* Functions que dependem do html
************************************/
function SetLoading(showHide) {
    /* 012025
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
    /* 012025
    * Os valores PROJINFO e DEVINFO são trazidos do servidor
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
function ShowSidebarMenu(sidebarClass){
    /* 012025
    * dependences:
    *   - hint.css
    *   - yapiStyle
    *   - css da sidebar
    *   - html: <nav><ul><li class="menu-button" onclick=ShowSidebarMenu()>...</li></ul></nav>
    */
    if(IsNull(sidebarClass)){
        console.log("function ShowSidebarMenu(sidebarClass) => É necessário especificar a classe corretamente");
        return 
    }
    let sidebar = document.querySelector(sidebarClass);
    sidebar.style.display = 'flex';
}
//
function HideSidebarMenu(sidebarClass){
    /* 012025
    * dependences:
    *   - hint.css
    *   - yapiStyle
    *   - css da sidebar
    *   - html: <nav><ul class="sidebar"><li onclick=HideSidebarMenu()>...</li></ul></nav>
    */
    if(IsNull(sidebarClass)){
        console.log("function ShowSidebarMenu(sidebarClass) => É necessário especificar a classe corretamente");
        return 
    }
    let sidebar = document.querySelector(sidebarClass);
    sidebar.style.display = 'none';
}
//
function HasValue(opt){
    /* 012025
    * Verifica se a variavel "opt" tem valor 
    * dependences: none
    */ 
    if(!opt || opt ==""|| opt == null || opt === undefined){return false}else{return true}
    }
//
function IsNull(opt){
    /* 012025
    * Verifica se a variavel "opt" está vazia
    * dependences: none
    */ 
    if(!opt || opt ==""|| opt == null || opt === undefined){return true}else{return false}
}
//
