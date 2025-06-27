import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";
import { readFileSync } from "fs";
import markdownIt from "markdown-it";

export default function(eleventyConfig){
    eleventyConfig.addPlugin(handlebarsPlugin)
    eleventyConfig.addPassthroughCopy("assets")

    const mdLib = markdownIt({html: true});

    eleventyConfig.addShortcode("include_markdown", function (filePath) {
        const contents = readFileSync(`./src/${filePath}.md`, "utf8");
        return mdLib.render(contents);
    });
    
    eleventyConfig.addShortcode("include_html", function (filePath) {
        const contents = readFileSync(`./src/${filePath}.html`, "utf8");
        return contents;
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
        },
        markdownTemplateEngine: "hbs",
        // htmlTemplateEngine: "hbs",
    };
};