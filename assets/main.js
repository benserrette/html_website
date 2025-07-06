function apply_color_theme(new_theme){
    body.className = new_theme;
}

const body = document.getElementsByTagName("body")[0];
const menu = document.createElement("menu");
menu.id = "color_menu"
menu.setAttribute("aria-label", "Color Theme Selection Menu");
const themes = {
    "light": `&#127774;<span>Light Mode</span>`,
    "dark": `&#127769;<span>Dark Mode</span>`,
    "purple": `&#127814;<span>Purple Mode</span>`,
}

for (const theme in themes) {
    const button = document.createElement("button");
    const li = document.createElement("li");
    button.innerHTML = themes[theme];
    button.addEventListener("click", ()=>{
        apply_color_theme("force-" + theme);
        if(theme == "purple"){
            load_font();
        }
     });
     li.appendChild(button);
     menu.appendChild(li);
}
body.prepend(menu);

function load_font() {
    if(document.getElementById("comic-sans-font")){
        return;
    }
    const style_element = document.createElement("style");
    style_element.id = "comic-sans-font";
    style_element.textContent = `
        @font-face {
            font-family: "Comic Sans";
            src: url("comic.ttf");
            font-display: swap;
        }`;
    document.head.appendChild(style_element);
}

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();
const [fn, ln] = document.getElementsByTagName("title")[0].text.split(/\s|'/g);
const eml_a = document.getElementById("email");
if( eml_a ) {
    const eml = `${fn}.${ln}@outlook.com`.toLowerCase();
    eml_a.textContent = eml;
    eml_a.href = `mailto:${fn} ${ln}<${eml}>`;
}

document.getElementsByTagName("footer")[0].innerHTML += `<p>Last updated: <time id="last_updated" datetime=""></time></p>`
const time_element = document.getElementById("last_updated");
time_element.textContent = time_element.datetime = document.lastModified;

const links_with_icons = {
    "github": [16, 16, `<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.33-.27 2.02-.27.69 0 1.38.09 2.02.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.002 8.002 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`],
    "linkedin": [16,16,`<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .632-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zM4.943 13.5V6.75h-2.5v6.75h2.5zm-1.25-7.64c.833 0 1.5-.675 1.5-1.51s-.667-1.5-1.5-1.5c-.833 0-1.5.665-1.5 1.5s.667 1.51 1.5 1.51zM13.5 13.5V9.25c0-1.5-.75-2.25-1.92-2.25-.84 0-1.4.46-1.64.89V6.75h-2.5v6.75h2.5v-3.69c0-.2.02-.39.06-.56.18-.66.69-1.13 1.29-1.13.89 0 1.25.75 1.25 1.86v3.52h2.5z"/>`],
    "bsky": [600,535, `<path d="m299.75 238.48c-26.326-51.007-97.736-146.28-164.21-193.17-63.677-44.919-88.028-37.186-103.82-29.946-18.428 8.3915-21.719 36.692-21.719 53.311s9.0496 136.57 15.138 156.48c19.745 66.145 89.674 88.522 154.17 81.282 3.2908-0.49362 6.5816-0.98723 10.037-1.3163-3.2908 0.49362-6.7461 0.98723-10.037 1.3163-94.445 13.986-178.52 48.374-68.284 170.96 121.1 125.38 166.02-26.82 189.06-104.15 23.035 77.169 49.526 223.94 186.75 104.15 103.17-104.15 28.301-156.97-66.145-170.96-3.2908-0.32908-6.7461-0.82269-10.037-1.3163 3.4553 0.49362 6.7461 0.82269 10.037 1.3163 64.499 7.2397 134.59-15.138 154.17-81.282 5.9234-20.074 15.138-139.86 15.138-156.48s-3.2908-44.919-21.719-53.311c-15.96-7.2397-40.148-14.973-103.82 29.946-66.967 47.058-138.38 142.16-164.7 193.17z"/>`],
    "osome": [270,341, `<path d="M88.2,0 v25.6 h19.9 v188h-37.9v-142.6h17.8v-25.7h-88v25.7h19.9v165.2l32.3,33h55.9v38.1h-19.9v33h93.4v-33h-19.9v-38.1h55.9l32.3,-33v-165.2h19.9v-25.7h-88v25.7h17.8v142.6h-37.9v-188h19.9v-25.6z" />`],
}
for(const link_name in links_with_icons){
    try {
        const link = document.getElementById(link_name + "_link");
        const [x, y, path] = links_with_icons[link_name]
        link.innerHTML = `<svg aria-hidden="true" tabindex="-1" width="1em" heigh="1em" viewBox="0 0 ${x} ${y}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">${path}</svg>${link.innerText}`;
    } catch (e) {
        continue;
    }
}
