{
  description = "rise-and-fall";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = github:edolstra/flake-compat;
      flake = false;
    };
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-21.11";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs-unstable, nixpkgs, flake-utils, ... }:
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

        importArgs = { inherit system; };
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
