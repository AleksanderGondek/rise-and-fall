{ ... }:
with builtins;
let
  flake = (import
    (
      let lockFile = fromJSON (readFile ./flake.lock); in
      fetchTarball {
        url = "https://github.com/edolstra/flake-compat/archive/${lockFile.nodes.flake-compat.locked.rev}.tar.gz";
        sha256 = lockFile.nodes.flake-compat.locked.narHash;
      }
    )
    { src = ./.; }
  ).defaultNix;

  COLORTERM = "truecolor";
  NIX_PATH = concatStringsSep ":" (
    attrValues (
      mapAttrs
        (
          n: v:
            if hasAttr "path" v
            then "${n}=${storePath v.path}"
            else "${n}=null"
        )
        (
          (mapAttrs (n: v: getAttr currentSystem v) {
            nixpkgs = flake.outputs.pkgs;
            nixpkgs-unstable = flake.outputs.pkgs-unstable;
            rise-and-fall = flake.outputs.rise-and-fall;
          })
        )
    )
  );
  TERM = "xterm-256color";
  TMPDIR = "/tmp";

  pkgs = flake.pkgs.${currentSystem};
  pkgs-unstable = flake.pkgs-unstable.${currentSystem};
  rise-and-fall = flake.rise-and-fall.${currentSystem};
in pkgs.mkShell {
  name = "rise_and_fall_of_dwarven_empire";

  inherit COLORTERM NIX_PATH TERM TMPDIR;

  buildInputs = with pkgs; [
    bashInteractive
    cacert
    coreutils-full
    curlFull
    git
    gnutar
    nix
    rise-and-fall.rust.bin
    pkg-config
    openssl
    pkgs-unstable.rust-analyzer
    pkgs-unstable.lldb
    pkgs-unstable.helix
  ];

  shellHook = ''
    echo "Welcome to rise-and-fall dev shell."
    ${pkgs-unstable.lldb}
  '';
}
