import * as themes from "../themes.js";

let document;
let background;
let hours;
let circle;
let dot;
let hourHand;
let minHand;
let secHand;

export function loadDocument(doc) {
    document = doc;
    background = document.getElementsByClassName("background")[0];
    hours = document.getElementsByClassName("hours");
    circle = document.getElementById("circle");
    dot = document.getElementById("dot");
    hourHand = document.getElementById("hours").getElementsByTagName("rect")[0];
    minHand = document.getElementById("mins").getElementsByTagName("rect")[0];
    secHand = document.getElementById("secs").getElementsByTagName("rect")[0];
}

export function getThemes() {
    return themes.default;
}

export function getTheme(theme) {
    return themes.default[theme] || false;
}

export function findTheme(display) {
    if (typeof display !== "string") {
        return;
    }
    const themesJSON = themes.default;
    if (themesJSON[display.toLowerCase().replace(/ /gi, "")]) {
        return themesJSON[display.toLowerCase().replace(/ /gi, "")];
    }
}

export function loadTheme(theme) {
    if (!document) {
        return;
    }
    const themeFound = themes.default[theme];
    if (!theme) {
        console.log(`Failed to find theme: ${theme}`);
        loadTheme("default");
        return;
    }

    if (themeFound.background.fill) {
        background.style.fill = themeFound.background.fill;
    }
    if (themeFound.circle.fill) {
        circle.style.fill = themeFound.circle.fill;
    }
    if (themeFound.dot.fill) {
        dot.style.fill = themeFound.dot.fill;
    }
    if (themeFound.hours.fill) {
        hours.forEach(ele => {
            ele.style.fill = themeFound.hours.fill;
        });
    }
    if (themeFound.hands) {
        if (themeFound.hands.secs.fill) {
            secHand.style.fill = themeFound.hands.secs.fill;
        }
        if (themeFound.hands.mins.fill) {
            minHand.style.fill = themeFound.hands.mins.fill;
        }
        if (themeFound.hands.hours.fill) {
            hourHand.style.fill = themeFound.hands.hours.fill;
        }
    }
}