{ rise-and-fall, lib, pkgs, pkgs-unstable, ... }:

let
  rust-bin = pkgs.rust-bin.stable.latest.default.override {
      targets = [ "x86_64-unknown-linux-musl" ];
  };
  rust-platform = pkgs.makeRustPlatform { 
    cargo = rust-bin;
    rustc = rust-bin;
  };
in
{
  platform = rust-platform;
  bin = rust-bin;
}
