{ rise-and-fall, lib, pkgs, pkgs-unstable, ... }:

let
  rust-bin = pkgs.rust-bin.stable.latest.default.override {
      targets = [ "x86_64-unknown-linux-musl" ];
  };
  rust-platform = pkgs.makeRustPlatform { 
    cargo = rust-bin;
    rustc = rust-bin;
  };
  rust-platform-musl = pkgs.pkgsCross.musl64.makeRustPlatform { 
    cargo = rust-bin;
    rustc = rust-bin;
  };
in
{
  platform = rust-platform;
  platform-musl = rust-platform-musl;
  bin = rust-bin;
}
