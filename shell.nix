{}:

let
  pkgs = import (
    fetchTarball { url = https://github.com/NixOS/nixpkgs/archive/nixos-20.09.tar.gz;}
  ) {};
in
pkgs.mkShell {
  name = "rise_and_fall_of_dwarven_empire";

  buildInputs = with pkgs; [
    bazel
    busybox
    nix
    nodejs
    yarn
  ];

  shellHook = ''
    rm -f ./crystal_ball/vendored/node_pkg_link
    rm -f ./crystal_ball/vendored/npm_pkg_link
    rm -f ./crystal_ball/vendored/yarn_pkg_link

    # IMHO 'npm-like' bazelisk bazel/yarn manager
    # Is not well suited for the task.
    # So I will be using nix-provided packages.
    ln -sf ${pkgs.nodejs} ./crystal_ball/vendored/node_pkg_link
    ln -sf ${pkgs.nodejs} ./crystal_ball/vendored/npm_pkg_link
    ln -sf ${pkgs.yarn}/libexec/yarn ./crystal_ball/vendored/yarn_pkg_link
  '';
}

