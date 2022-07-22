{ rise-and-fall, lib, pkgs, pkgs-unstable, ... }:

# rise-and-fall.rust.platform.buildRustPackage {
rise-and-fall.rust.platform-musl.buildRustPackage {
  pname = "rtest";
  version = "0.1.0";
  src = builtins.path {
    path = ./.;
    name = "rtest";
  };

  cargoLock = {
    lockFile = ./Cargo.lock;
  };
}
