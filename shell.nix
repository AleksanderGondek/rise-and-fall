{ pkgs ? import <nixpkgs> {} }:

let
  unstable = import (
    fetchTarball {
      url = https://github.com/NixOS/nixpkgs/archive/90e09e1f0f003960f3feb28f67873774df8b0921.tar.gz;
      sha256 = "0hggyskq9ld1nw9ffqmnbg4fknpklrl29igi4w10asmmbjlr2xa4";
    }
  ) { 
    config = pkgs.config;
  };
in
pkgs.mkShell {
  name = "rise_and_fall_of_dwarven_empire";

  buildInputs = with pkgs; [
    unstable.bazel_1
    busybox
    nix
    unstable.nodejs
    unstable.yarn
  ];

  shellHook = ''
    rm -f ./crystal_ball/vendored/node_pkg_link
    rm -f ./crystal_ball/vendored/npm_pkg_link
    rm -f ./crystal_ball/vendored/yarn_pkg_link

    # IMHO 'npm-like' bazelisk bazel/yarn manager
    # Is not well suited for the task.
    # So I will be using nix-provided packages.
    ln -sf ${unstable.nodejs} ./crystal_ball/vendored/node_pkg_link
    ln -sf ${unstable.nodejs} ./crystal_ball/vendored/npm_pkg_link
    ln -sf ${unstable.yarn}/libexec/yarn ./crystal_ball/vendored/yarn_pkg_link
  '';
}
