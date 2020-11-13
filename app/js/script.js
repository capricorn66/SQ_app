import $ from "jquery";
import debounce from 'lodash.debounce';
import "./hasAttr";
import {rwdMedia} from "./rwdMedia";
import {rippletInit} from './ripplet';
import './nav-scroll';
import 'bootstrap';
import 'jquery-ui-sortable-npm';

window.debounce = debounce;
window.rwdMedia = rwdMedia;
window.rippletInit = rippletInit;

document.addEventListener('DOMContentLoaded', function(){

    rippletInit();
    $('.nav-scroll').navScroll();

}, false);
