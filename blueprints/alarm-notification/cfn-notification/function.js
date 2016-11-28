
/**
 * Prowl alarm notification lambda
 *
 * @author Julian Kleinhans
 */

var Prowl = require('node-prowl');
var prowl = new Prowl(process.env.PROWL_API_KEY);

exports.handler = function(input, context) {
    prowl.push('YO, this is awesomez!', 'My app', { priority: 2 }, function(error, remaining) {
        if( error ) {
            context.failed(error);
            return;
        }

        console.log( 'I have ' + remaining + ' calls to the api during current hour. BOOM!' );
        context.succeed('DONE');
    });
};
