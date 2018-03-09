const fs = require("fs");

// Nombre del fichero donde se guardan las preguntan.
// Es un fichero de texto con el JSON de quizzes.
const DB_FILENAME = "quizzes.json";

// Modelo de datos.
//
// En esta variable se mantienen todos los quizzes existentes.
// Es una array de objetos, donde cada objeto tiene los atributos question
// y answer para guardar el texto de la pregunta y el de la respuesta.
//
// Al arrancar la aplicación, esta variable contiene estas cuatro preguntas
// pero al final del módulo se llama load() para cargar las preguntas
// guardadas en el fichero DB_FILENAME.

let quizzes = [
    {
        question: "Capital de Italia",
        answer: "Roma"
    },
    {
        question: "Capital de Francia",
        answer: "París"
    },
    {
        question: "Capital de España",
        answer: "Madrid"
    },
    {
        question: "Capital de Portugal",
        answer: "Lisboa"
    }

];
/**
 * Carga las preguntas guardadas en el fichero.
 *
 * Este método carga el contenido del fichero DB_FILENAME en la variable
 * quizzes. El contenido de ese fichero está en formato JSON.
 * La primero vez que se ejecute este método, el fichero DB_FILENAME no
 * existe, y se producirá error ENONENT. En este caso se salva el
 * contenido inicial almacenado en quizzes.
 * Si se produce otro tipo de error, se lanza una excepción que abortará
 * la ejecución del programa.
 */
const load = () => {
    fs.readFile(DB_FILENAME,(err,data) => {
        if(err){
            // La primera vez no existe el fichero
            if(err.code === "ENOENT"){
                save(); // valores iniciales
                return;
            }
            throw err;
        }
        let json = JSON.parse(data);
        if(json){
            quizzes = json;
        }
    });
};

/**
 * Guarda las preguntas en el fichero.
 *
 * Guarda en formato JSON el valor quizzes en el fichero DB_FILENAME.
 * Si se produce algún tipo de error, se lanza una excepción que abortará
 * la ejecución del programa.
 */
const save =() => {
    fs.writeFile(DB_FILENAME,
        JSON.stringify(quizzes), //stringify da  una cadena de caracteres
        err => {                 //callback en caso de que haya error
            if (err) throw err;
        });
};


/**
 * Devuelve el número total de preguntas existentes.
 *
 * @returns {number}  número total de preguntas existentes.
 */
exports.count = () => quizzes.length;

/**
 * Añade un nuevo quiz.
 *
 * @param question String con la pregunta.
 * @param answer   String con la respuesta.
 */
exports.add=(question,answer) => {
    quizzes.push({
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

/**
 * Actualiza el quiz situado en la posicion index.
 *
 * @param id        Clave que identifica el quiz a actualizar.
 * @param question  String con la pregunta.
 * @param answer    String con la respuesta.
 */

exports.update = (id, question, answer) => {
    const quiz = quizzes[id];
    if (typeof quiz === "undefined"){
        throw new Error (`El valor del parámetro id no es válido.`);
    }
    quizzes.splice(id, 1, {
        question: (question || "").trim(),
        answer: (answer || "" ).trim()
    });
    save();
};


/**
 * Devuelve todos los quizzes existentes.
 *
 * Devuelve un clon del valor guardado en la variable quizzes, es decir devuelve un
 * objeto nuevo con todas las preguntas existentes.
 * Para clonar quizzes se usa stringify + parse.
 *
 * @returns {any}
 */
exports.getAll=() => JSON.parse(JSON.stringify(quizzes));

/**
 * Devuelve un clon del quiz almacendado en la posición dada.
 *
 * Para clonar el quiz se usa stringify + parse.
 * objeto nuevo con todas las preguntas existentes.
 * Para clonar quizzes se usa stringify + parse.
 *
 * @param id Clave que identifica el quiz a devolver.
 * @returns {question,answer} Devuelve el objeto del quiz en la posición dada
 */

exports.getByIndex = id => {
    const quiz = quizzes[id];
    if (typeof quiz === "undefined"){
        throw new Error(`El valor del parámetro id no es válido.`);
    }
    return JSON.parse(JSON.stringify(quiz));
};

/**
 * Elimina el quiz situado en la posición dada.
 *
 * @param id  Clave que identifica el quiz a borrar.
 */
exports.deleteByIndex = id => {
    const quiz = quizzes[id];
    if (typeof quiz === "undefined"){
        throw new Error(`El valor del parámetro id no es válido.`);
    }
    quizzes.splice(id,1);//en la posición id, quitas 1 elemento(2 parámetro) y no pones nada(3 parámetro)
    save();
};

// Carga los quizzes almacenados en el fichero.
load();