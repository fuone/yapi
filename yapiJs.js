/* <script id="yapiJs" type="text/javascript">
220425aa
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
var swalCustomClass = '';
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
function HideElement(element){
    /* 0325
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $(element).addClass('hide');
}
//
function ShowElement(element){
    /* 0325
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $(element).removeClass('hide');
    $(element).show();
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
    /* 0125
    * adiciona dias a uma data qualquer e retorna a nova data
    * dependences: none
    */
    date.setDate(date.getDate() + dias);
    return date
}
//
function CalcFutureDate(dtInicial, t) {
    /* 0125
    * calcula data futura a partir da data inicial e qtd de dias
    * dependences: none
    */
    return dtFutura = AddDays(new Date(dtInicial), t).toISOString().slice(0, 10);
}
//
function ShowComingSoonMsg(){
    /* 0325
    * dependences:
    *   - sweetalert2
    *   - yapiStyle
    *   - declaracoes previas e global dos icones
    */
    ToastBox("Aguarde novidades","Em breve",ICONEINFO,2000, "center");
  }
//
function ShowLoadingMsg(){
    /* 0425
    * dependences:
    *   - sweetalert2
    *   - yapiStyle
    *   - declaracoes previas e global dos icones
    */
    ToastBox(" ","Carregando...",ICONEINFO,3000, "center");
  }
//
async function RedirectMe(url){
    /* 0425
    * Redireciona a pagina para outra url recebida por parâmetro
    * dependences: none
    */
    if(IsNull(url)){
      //pagina "Em breve"
      url = 'https://script.google.com/macros/s/AKfycbxyyyk_yaDXvsrIvR1FJpxrjZvkLCLxUd2jcZ2UdU6FIp-LO5JmGPblx4AFU4iVU7M/exec';
    }
    //let url2 = 'https://b.link/f/soon';
    ToastBox(" ","Carregando...",ICONEINFO,3000, "center");
    //let win = window.open(url2, '_self');
    //let win = window.location.href = url2;
    //let win = window.location.assign(url);
    let win = window.location.replace(url);
  }
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
    *   - html: <footer id="footer" class="footer"></footer>
    */
    let date = new Date();
    let code= '<p class="txt txt-center">© ' + date.getFullYear() + ' - ' +
      '<span class="proj-name hint--right" data-hint="'+ PROJINFO.Description +'">' + PROJINFO.Name + '</span>' +
      ' v.<span class="proj-ver">' + PROJINFO.Version + '</span>' +
      ' by <span class="proj-autor hint--right" data-hint="' + DEVINFO.EmailAutor + '">' + DEVINFO.Autor + '</span>' +
      '</p>';
    //$('#footer').html(code); //jQuery
    document.getElementById('footer').innerHTML = code;
    return code;
}
//
function SetHeader(proj) {
    /* 0225 
    * dependences:
    *   - JQuery*
    *   - definicaoo previa dos dados do projeto (Name, Description, Version, Icon)
    *   - campos com classes proj-?? definidas
    */
    if (IsNull(proj)) { console.log('SetHeader: parametro proj não definido'); return }
    $('.proj-name').html(proj.Name);
    $('.proj-description').html(proj.Description);
    $('.proj-ver').html(proj.Version);
    $('.proj-icon').addClass(proj.Icon);
}
//
function SetProjInfo2(proj) {
    /* 0225
    * todos os elementos que tiverem a classe '.proj-??' receberão o valor correspondente do array 'proj.??'
    * dependences:
    *   - definicaoo previa dos dados do projeto (Name, Description, Version,...)
    *   - campos com classes proj-?? definidas
    */
    if (IsNull(proj)) { console.log('SetProjInfo: parametro proj não definido'); return }
    document.querySelectorAll('.proj-name').forEach(node => node.innerHTML = proj.Name);
    document.querySelectorAll('.proj-description').forEach(node => node.innerHTML = proj.Description);
    document.querySelectorAll('.proj-ver').forEach(node => node.innerHTML = proj.Version);
    document.querySelectorAll('.proj-autor').forEach(node => node.innerHTML = proj.Autor);
    document.querySelectorAll('.proj-email-autor').forEach(node => node.innerHTML = proj.EmailAutor);
    document.querySelectorAll('.proj-framework').forEach(node => node.innerHTML = proj.Framework);
    document.querySelectorAll('.proj-icon').forEach(node => node.classList.add(...proj.Icon.split(' ')));
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
    *   - jQuery
    *   - html: <nav><ul class="sidebar"><li onclick=HideSidebarMenu()>...</li></ul></nav>
    */
    if (IsNull(sidebarClass)) { console.log("function HideSidebarMenu(sidebarClass) => É necessário especificar a classe corretamente"); return }
    /* se tiver caracter especial no inicio da string, retira */
    if (HasSpecialChar(sidebarClass.charAt(0))) { sidebarClass = sidebarClass.substr(1) }
    let sidebar = document.querySelector('.' + sidebarClass);
    sidebar.style.display = 'none';
    $('.' + sidebarClass).css('display', 'none');
}
//
function SetClock() {
    /* 0225
    * Mostra um relogio digital na tela
    * dependences:
    *   - comando JS: setInterval(SetClock, 1000); //(1000=1seg)
    */
    let data = new Date(),
        horas = data.getHours(),
        minutos = data.getMinutes() <= 9 ? "0" + data.getMinutes() : data.getMinutes(),
        segundos = data.getSeconds() <= 9 ? "0" + data.getSeconds() : data.getSeconds();
    //document.getElementById("relogio").innerHTML = `${horas}:${minutos}:${segundos}`;
    return horas +':'+ minutos +':'+ segundos
}
//
function SetDate(){
    /* 0425
    * Retorna a data 
    * dependences:
    */
    return new Date().toLocaleDateString();
}
//
/***********************************
* Functions que dependem do GAS
************************************/
function GetProjInfo2(){
    /* 0425
    * Busca no server as informações do projeto e do autor eatribui às variaveis  PROJINFO e DEVINFO
    * dependences:
    *   - definicaoo previa dos dados do projeto (Name, Description, Version,...) no servidor
    *   - declaração das variaveis PROJINFO e DEVINFO;
    *   - função GetProjInfo desenvolvida no servidor
    */
    google.script.run.withSuccessHandler(function(r){
      PROJINFO = r;
      DEVINFO = {Autor: r.Autor, EmailAutor: r.EmailAutor,Framework: r.Framework};
      SetProjInfo2(PROJINFO);
      SetFooter(PROJINFO);
      SetLoading('hide');
      console.timeEnd('tempo');
    }).GetProjInfo();
  }
