/* <script id="yapiJs" type="text/javascript">
25012025
*/
function ToUpper(texto) {
    return texto.toUpperCase();
}
//
function HideElementById(elementId) {
    /*
    * 01/2025
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementId).addClass('hide');
}
//
function HideChildElementById(elementoPai, elementoFilho) {
    /*
    * 01/2025
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementoPai + ' .' + elementoFilho).addClass('hide');
}
//
function ShowElementById(elementId) {
    /*
    * 01/2025
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementId).removeClass('hide');
}
//
function ShowChildElementById(elementoPai, elementoFilho) {
    /*
    * 01/2025
    * dependences:
    *   - JQuery
    *   - yapiStyle
    */
    $('#' + elementoPai + ' .' + elementoFilho).removeClass('hide');
}
//
function SetLoading(showHide) {
    /*
    * 01/2025
    * dependences:
    *   - JQuery
    *   - html do modal spinner
    */
    switch (showHide) {
        case 'show':
            $('#spinnerModal').modal('show');
            break;
        case 'hide':
            $('#spinnerModal').modal('hide');
            break;
    }
}
//
function MsgBox(msg, titulo, icone, timer) {
    /* 
    * 01/2025
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
        title: ToUpper(t),
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
    /* 
    * 01/2025
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
        title: ToUpper(t),
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
//
function SetFooter(ver) {
    /* 
    * Os valores PROJINFO e DEVINFO são trazidos do servidor
    * 01/2025
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
