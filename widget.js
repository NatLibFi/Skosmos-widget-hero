// declaring a namespace for the plugin
var HERO = HERO || {};

HERO = {
    widget: {
        render: function (id) {
            var imgUrl = 'http://extranet.narc.fi/heraldica/k/128/' + id + '.png';
            $('.concept-main').prepend(Handlebars.compile($('#hero-template').html())({'imgurl': imgUrl}));
            $('.property-label-pref').css({'height': '105px'});
        }
    }
};

$(function() { 
    
    window.loadHeroImage = function (data) {
        // Only activating the widget when on a concept page and there is a prefLabel.
        if (data.page !== 'page' || data.prefLabels === undefined) {
            return;
        }
        // reading the id from the uri
        var id = data.uri.substr(data.uri.lastIndexOf('/p') + 2); 
        HERO.widget.render(id);
    };

});
