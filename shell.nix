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
  TERM = "xterm";
  TMPDIR = "/tmp";

  pkgs = flake.pkgs.${currentSystem};
in pkgs.mkShell {
  name = "rise_and_fall_of_dwarven_empire";

  inherit NIX_PATH TERM TMPDIR;

  buildInputs = with pkgs; [
    cacert
    coreutils-full
    curlFull
    git
    gnutar
    # Nix 2.5 (as the one from the installator)
    nixUnstable
    rust-bin.stable.latest.default
  ];

  shellHook = ''
    echo "Welcome to rise-and-fall dev shell."
  '';
}
