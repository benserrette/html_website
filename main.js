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
     });
     li.appendChild(button);
     menu.appendChild(li);
}
body.prepend(menu);

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();
const [fn, ln] = document.getElementsByTagName("title")[0].text.split(/\s|'/g);
const eml_a = document.getElementById("email");
const eml = `${fn}.${ln}@outlook.com`.toLowerCase();
eml_a.textContent = eml;
eml_a.href = `mailto:${fn} ${ln}<${eml}>`;