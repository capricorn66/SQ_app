// JavaScript Document
const rwdMedia = {};

['xs', 'sm', 'md', 'lg', 'xl', 'sl'].map(
    bp => rwdMedia[bp] = () => document.querySelector(`.bs4-${bp}`).offsetParent !== null
);
