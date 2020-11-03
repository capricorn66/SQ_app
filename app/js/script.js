import $ from "jquery";
import debounce from 'lodash.debounce';
import "./hasAttr";
import {rwdMedia} from "./rwdMedia";
import {rippletInit} from './ripplet';
import './nav-scroll';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/toast';
import 'jquery-ui-sortable-npm';


window.debounce = debounce;
window.rwdMedia = rwdMedia;
window.rippletInit = rippletInit;

document.addEventListener('DOMContentLoaded', function(){

    rippletInit();
    $('.nav-scroll').navScroll();

}, false);
