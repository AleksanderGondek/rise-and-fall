package(default_visibility=["//visibility:public"])

load(
  "@npm_bazel_typescript//:index.bzl",
  "ts_library",
  "ts_devserver"
)

exports_files(["tsconfig.json"], visibility = ["//visibility:public"])

ts_library(
  name = "hello",
  srcs = glob(["hello.ts"]),
  deps = [],
)

ts_devserver(
  name = "devserver",
  deps = [":hello"],
  serving_path = "/bundle.js"
)
