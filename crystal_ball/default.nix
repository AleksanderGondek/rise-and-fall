{ rise-and-fall, lib, pkgs, pkgs-unstable, ... }:

pkgs.mkYarnPackage {
  name = "crystal_ball";
  src = builtins.path {
    path = ./.;
    name = "crystal_ball";
  };
  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;
}
