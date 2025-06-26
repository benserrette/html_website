import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";

export default function(eleventyConfig){
    eleventyConfig.addPlugin(handlebarsPlugin)
    eleventyConfig.addPassthroughCopy("assets")
    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
        },
        markdownTemplateEngine: "hbs",
        htmlTemplateEngine: "hbs",
    };
};