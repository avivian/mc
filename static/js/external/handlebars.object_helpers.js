/* 30/08/2012
 * thank you strathmeyer
 * https://gist.github.com/1371586
 */


define(['handlebars_main', 
        'underscore.string'],
function(Handlebars, _str){
    // HELPER: #key_value
    //
    // Usage: {{#key_value obj}} Key: {{key}} // Value: {{value}} {{/key_value}}
    //
    // Iterate over an object, setting 'key' and 'value' for each property in
    // the object.
    Handlebars.registerHelper("key_value", function(obj, fn) {
        var buffer = "",
            key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                buffer += fn({key: key, value: obj[key]});
            }
        }

        return buffer;
    });

    // HELPER: #each_with_key
    //
    // Usage: {{#each_with_key container key="myKey"}}...{{/each_with_key}}
    //
    // Iterate over an object containing other objects. Each
    // inner object will be used in turn, with an added key ("myKey")
    // set to the value of the inner object's key in the container.
    Handlebars.registerHelper("each_with_key", function(obj, fn) {
        var context,
            buffer = "",
            key,
            keyName = fn.hash.key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                context = obj[key];

                if (keyName) {
                    context[keyName] = key;
                }

                buffer += fn(context);
            }
        }

        return buffer;
    });

    Handlebars.registerHelper('key_state_icon', function(state) {
        var states_lookup =  {
            delivered:'icon-ok-sign icon-white delivered',
            failed:'icon-remove-sign icon-white failed', 
            new_kdm:'icon-question-sign icon-white new', 
            pending:'icon-question-sign icon-white pending', 
            played:'icon-ok-sign icon-white  played'
        };
        
        return new Handlebars.SafeString(states_lookup[state]);
    });


    Handlebars.registerHelper('sprintf', function() {
            return _str.sprintf.apply(this, arguments);
        });


    Handlebars.registerHelper('key_state_class', function(state) {
        var states_lookup =  {
            delivered:'label-success',
            failed:'label-important', 
            new_kdm:'label-info', 
            pending:'label-info', 
            played:'label-success'
        };
        
        return new Handlebars.SafeString(states_lookup[state]);
    });

    return Handlebars;
})
