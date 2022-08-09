module.exports = {
  scaffolding: {
    css: {
      default: [
        { path: "/src/css", type: "directory" },
        { path: "/src/css/main.css", type: "file" },
      ],
      smacss: [
        { path: "/src/css", type: "directory" },
        { path: "/src/css/modules", type: "directory" },
        { path: "/src/css/main.css", type: "file" },
        { path: "/src/css/_base.css", type: "file" },
        { path: "/src/css/_layout.css", type: "file" },
        { path: "/src/css/modules/_example.css", type: "file" },
      ],
    },
    scss: {
      default: [
        { path: "/src/scss", type: "directory" },
        { path: "/src/scss/main.scss", type: "file" },
      ],
      smacss: [
        { path: "/src/scss", type: "directory" },
        { path: "/src/scss/modules", type: "directory" },
        { path: "/src/scss/main.scss", type: "file" },
        { path: "/src/scss/_base.scss", type: "file" },
        { path: "/src/scss/_layout.scss", type: "file" },
        { path: "/src/scss/modules/_example.scss", type: "file" },
      ],
    },
  },
  import_rules: {
    css: {
      path: "/src/css/main.css",
      data: '@import "./_base.css";\n@import "./_layout.css";\n@import "./modules/_example.css";',
    },
    scss: {
      path: "/src/scss/main.scss",
      data: '@import "base";\n@import "layout";\n@import "modules/example";',
    },
  },
  reset_rules: {
    css: {
      default: { path: "/src/css/main.css" },
      smacss: { path: "/src/css/_base.css" },
    },
    scss: {
      default: { path: "/src/scss/main.scss" },
      smacss: { path: "/src/scss/_base.scss" },
    },
  },
};
