function showTab(tabId) {
    // Ocultar todos los contenidos de las pestañas
    const contents = document.querySelectorAll('.panel-tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Desactivar todos los enlaces de pestañas
    const tabs = document.querySelectorAll('.panel-a');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Mostrar la pestaña correspondiente
    document.getElementById(tabId).classList.add('active');
    
    // Activar el enlace clicado (selecciona el enlace activo por referencia al evento)
    const activeLink = document.querySelector(`a[onclick="showTab('${tabId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}
