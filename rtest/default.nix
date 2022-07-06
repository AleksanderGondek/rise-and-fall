{ rise-and-fall, lib, pkgs, pkgs-unstable, ... }:

let
  rust-platform = pkgs.makeRustPlatform { 
    cargo = pkgs.rust-bin.stable.latest.default.override {
      targets = [ "x86_64-unknown-linux-musl" ];
    };
    rustc = pkgs.rust-bin.stable.latest.default.override {
      targets = [ "x86_64-unknown-linux-musl" ];
    };
  };
in
rustPlatform.buildRustPackage {
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
