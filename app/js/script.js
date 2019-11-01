// JavaScript Document
var rwdMedia = {
    bs4_xs: function() {
        return document.getElementsByClassName("bs4-xs")[0].offsetParent ? !null : null;
    },
    bs4_sm: function() {
        return document.getElementsByClassName("bs4-sm")[0].offsetParent ? !null : null;
    },
    bs4_md: function() {
        return document.getElementsByClassName("bs4-md")[0].offsetParent ? !null : null;
    },
    bs4_lg: function() {
        return document.getElementsByClassName("bs4-lg")[0].offsetParent ? !null : null;
    },
    bs4_xl: function() {
        return document.getElementsByClassName("bs4-xl")[0].offsetParent ? !null : null;
    },
    bs4_xxl: function() {
        return document.getElementsByClassName("bs4-xxl")[0].offsetParent ? !null : null;
    }
};

$(document).ready(function(e) {


    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    };

    var time = new Date().timeNow();

    function generateTimeBlocks() {
        const timeIntervalHours = 3;
        const days = 3;
        const timeBlocksAmount = 24 / timeIntervalHours;

        for (var i = 0; i < 24; i = i + timeIntervalHours) {

            var blocks = {};

            var start_i = i;
            start_i = start_i < 10 ? '0' + start_i : start_i;
            var end_i = i + 3;
            end_i = end_i < 10 ? '0' + end_i : end_i;
            blocks['start'] = start_i + ':00';
            blocks['end'] = end_i + ':00';

            if(i < 6) blocks['label'] = 'Night';
            if(i >= 6 && i < 12) blocks['label'] = 'Morning';
            if(i >= 12 && i < 18) blocks['label'] = 'Afternoon';
            if(i >= 18 && i < 24) blocks['label'] = 'Evening';

        }
    }

});
