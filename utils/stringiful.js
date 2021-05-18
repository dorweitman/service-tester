const { createStringifyFunction } = require("stringiful");

const stringify = createStringifyFunction({
  inspectOptions: {
    colors: true,
    depth: null,
  },
});

module.exports = stringify;
