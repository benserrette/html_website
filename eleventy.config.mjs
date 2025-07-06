export default function(eleventyConfig){
    eleventyConfig.addPassthroughCopy("assets")
    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
        },
        markdownTemplateEngine: "njk",
        // htmlTemplateEngine: "hbs",
    };
};