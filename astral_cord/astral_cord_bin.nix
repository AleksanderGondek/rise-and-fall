with import <nixpkgs> {};

rustPlatform.buildRustPackage {
  name = "astral_cord";
  cargoSha256 = "0y1yjj73xjgq6jlz45208iyvlkl2hai5qlyfjk52x87lpkfxli86";
 
  # https://github.com/NixOS/nixpkgs/issues/71195
  # target = "x86_64-unknown-linux-musl";

  src = ./.;

  nativeBuildInputs = [
    rustc
    cargo
    pkgconfig
  ];

  buildInputs = [
    binutils
    gcc
    gnumake
    openssl
  ];

  installPhase = ''
    mkdir -p $out
    cp ./target/release/astral_cord $out/astral_cord
  '';

  # Set Environment Variables
  RUST_BACKTRACE="full";

  # Fron hidden system deps with love
  OPENSSL_LIB_DIR="${pkgs.openssl.out}/lib";
  OPENSSL_INCLUDE_DIR="${pkgs.openssl.dev}/include";
}
