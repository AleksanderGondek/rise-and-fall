package(default_visibility = ["//visibility:public"])

exports_files([
  "node_pkg_link",
  "npm_pkg_link",
  "yarn_pkg_link",
  "node_pkg_link/bin/node",
  "yarn_pkg_link/bin/yarn"
])

alias(
  name = "yarn_pkg_link/bin/yarn.js",
  actual = ":yarn_pkg_link/bin/yarn",
)
