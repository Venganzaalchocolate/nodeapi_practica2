//Funciones para internacionalizar su extensión. Es posible utilizar estas API para obtener cadenas de texto traducidas a partir de archivos de configuración regional incluidos en la extensión, conocer el idioma actual del navegador y recuperar el valor de su cabecera Accept-Language.
const i18n = require('i18n');
const path=require('path')

// Se debe configurar una vez para iniciar todos los aspectos de i18n
i18n.configure({
    locales: ['es', 'en'],
    //__dirnames = carpeta actual, ''=subiendo un nivel
    directory: path.join(__dirname, './', 'locales'),
    defaultLocale: 'en', 
    // atento a los cambios en los archivos JSON para volver a cargar la configuración regional en las actualizaciones
    autoReload: true,
    // sincroniza información 
    syncFiles: true,

    // cookie para saber en que idioma debe estar la página
    cookie: 'cookie-idioma'
})

//para ultilizar i18n en Scripts
i18n.setLocale('en');

module.exports=i18n;