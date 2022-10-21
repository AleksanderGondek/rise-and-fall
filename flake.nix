{
  description = "rise-and-fall-of-dwarven-empire";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = github:edolstra/flake-compat;
      flake = false;
    };
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.05";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.flake-utils.follows = "flake-utils";
    };
  };

  outputs = { self, rust-overlay, nixpkgs-unstable, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        readTree = import ./read-tree {};
        readPackages = packagesArgs: readTree {
          args = packagesArgs;
          path = ./.;
          scopedArgs = {
            __findFile = _: _: throw "Do not import from NIX_PATH!";
          };
        };

        importArgs = { 
          inherit system;
          overlays = [
            rust-overlay.overlays.default
          ];
        };
        pkgs = import nixpkgs importArgs;
        pkgs-unstable = import nixpkgs-unstable importArgs;

        rise-and-fall = readTree.fix (self: (readPackages {
          rise-and-fall = self;
          lib = pkgs.lib;
          pkgs = pkgs;
          pkgs-unstable = pkgs-unstable;
        }));
      in {
        inherit rise-and-fall pkgs pkgs-unstable;
      }
    );
}
