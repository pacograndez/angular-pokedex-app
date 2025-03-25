module.exports = {
    extends: ["@commitlint/config-conventional"],
    ignores: [(message) => /^(Merge|Pull)/.test(message)]
}