workspace(
  name = "rise_and_fall_of_dwarven_empire_crystal_ball",
  managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
  name = "build_bazel_rules_nodejs",
  sha256 = "d0c4bb8b902c1658f42eb5563809c70a06e46015d64057d25560b0eb4bdc9007",
  urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/1.5.0/rules_nodejs-1.5.0.tar.gz"],
)

new_local_repository(
  name = "nix_vendored",
  path = "./vendored",
  build_file = "./vendored/BUILD.bzl",
)

# Vendored Nodejs & yarn
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories")
node_repositories(
  node_version = "10.19.0",
  vendored_node = "@nix_vendored//:node_pkg_link",
  vendored_yarn = "@nix_vendored//:yarn_pkg_link",
)

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")
yarn_install(
  name = "npm",
  package_json = "//:package.json",
  yarn_lock = "//:yarn.lock",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()

# Set up TypeScript toolchain
load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
ts_setup_workspace()
