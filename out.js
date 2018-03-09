
const figlet = require('figlet');
const chalk = require('chalk');

/**
 * Dar color a un string.
 *
 * @param msg    Es string al que hay que dar color
 * @param color  El color con el que pintar msg
 * @returns {string} Devuelve el string msg con le color indicado.
 */

const colorize = (msg,color) => {
    if(typeof color !== "undefined"){
        msg = chalk[color].bold(msg);
    }
    return msg;
};

/**
 * Escribe un mensaje de log.
 *
 * @param msg    Es string a escribir
 * @param color  Color del texto.
 */

const log = (msg,color) => {
    console.log(colorize(msg,color));
};

/**
 * Escribe un mensaje de log grande.
 *
 * @param msg    Es string a escribir
 * @param color  Color del texto.
 */

const biglog = (msg,color) => { //figlet te hace grande el texto
    log(figlet.textSync(msg,{horizontalLayout: 'full'}),color);
};

/**
 * Escribe el mensaje de error emsg.
 *
 * @param emsg   Texto del mensaje de error
 */

const errorlog = (emsg) => {
    console.log(`${colorize("Error", "red")}:${colorize(colorize(emsg,"red"),"bgYellowBright")}`);
};

exports = module.exports = {
    colorize,
    log,
    biglog,
    errorlog
};


