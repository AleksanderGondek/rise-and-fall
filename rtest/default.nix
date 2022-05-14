{ rise-and-fall, lib, pkgs, pkgs-unstable, ... }:

let
  rust-platform = pkgs.makeRustPlatform { 
    cargo = pkgs.rust-bin.stable.latest.default;
    rustc = pkgs.rust-bin.stable.latest.default;
  };
in
pkgs.rustPlatform.buildRustPackage {
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
