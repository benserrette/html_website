import fs from "fs";
import markdownIt from "markdown-it";

export default function(eleventyConfig){
    eleventyConfig.addPassthroughCopy("assets")

    const md = markdownIt({html: true});

    eleventyConfig.addShortcode("mdInclude", function (filePath) {
        const fileContent = fs.readFileSync("./src/" + filePath, "utf8");
        const rendered_content = md.render(fileContent);
        return rendered_content;
    });

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