// declaring a namespace for the plugin
var HERO = HERO || {};

HERO = {

    linkTarget: "//heraldica.narc.fi/termi.html",
    imageLocation: "//heraldica.narc.fi/img/hero/thumb/",
    widget: {
        getTranslation (key) {
            var getLang = lang;
            if (lang !== "fi" && lang !== "sv") {
                getLang = "en";
            }
            if (key=='linkText') {
                return {
                    'fi': 'Vastaava sivu Europeana Heraldicassa',
                    'sv': 'Motsvarande sida i Europeana Heraldica',
                    'en': 'Corresponding page in Europeana Heraldica'
                }[getLang];
            } else {
                return "";
            }
        },
        render: function (id) {
            var imgUrl = HERO.imageLocation + id + '.png';
            $('.concept-main').prepend(Handlebars.compile($('#hero-template').html())({'imgurl': imgUrl}));
            $('.property-label-pref').css({'height': '105px'});
        },
        createLink: function (id) {
            var $linkElement = $('<p class="hero-link"><a href="" target="_blank"><span></span></a></p>');
            $linkElement.find('a').attr("href", HERO.linkTarget + "?id=" + id + "&lang=" + lang + "&t=" + content_lang);
            $linkElement.find('span').text(HERO.widget.getTranslation('linkText'));
            $(".concept-main").append($linkElement);
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
        HERO.widget.createLink(id);
    };

});
