const sanitizer = require('sanitizer');

const sanitize = function(obj) {
    // pour chaque propriété de l'object, on va modifier la valeur stockée pour nous protéger d'éventuelles injections XSS (Cross Site Script)
    for (const prop in obj) {
        // console.log('Before sanitize : ', obj[prop]);
        obj[prop] = sanitizer.escape(obj[prop]);
        // console.log('After sanitize : ', obj[prop]);
    }
}


const middleware = function(request, response, next) {
/*
le user peut indiquer des infos dans 3 endroits différents, 3 sous-objects de request :
- request.params (paramètres de l'url)
- request.query (data passées dans la queryString, après le ? dans l'url)
- request.body (data passées via un formulaire)
*/
    sanitize(request.params);
    sanitize(request.query);
    if (request.body) { // if (request.body !== undefined)
        sanitize(request.body);
    }
    next();

}

module.exports = middleware;