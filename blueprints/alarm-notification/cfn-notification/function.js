
/**
 * Prowl alarm notification lambda
 *
 * @author Julian Kleinhans
 */

var Prowl = require('node-prowl');
var prowl = new Prowl(process.env.PROWL_API_KEY);

exports.handler = function(input, context) {
    input.Records.forEach(function(record) {
        var event = JSON.parse(record.Sns.Message);

        console.log('Current battery voltage:', event.batteryVoltage);
        console.log('Received event:', event.clickType);

        var message = 'Dady, I need you asap!';
        var title = 'High';

        switch(event.clickType)
        {
            case "SINGLE":
                // default above
                break;
            case "DOUBLE":
                message = 'Dady, I need you NOW!';
                title = 'Emergency';
                break;
            case "LONG":
                //
                break;
        }

        prowl.push(message, title, { priority: 2 }, function(error, remaining) {
            if( error ) {
                context.fail(error);
                return;
            }

            console.log( 'I have ' + remaining + ' calls to the api during current hour. BOOM!' );
            context.succeed('DONE');
        });
    });
};
