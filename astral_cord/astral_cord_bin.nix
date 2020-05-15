with import <nixpkgs> {};

rustPlatform.buildRustPackage {
  name = "astral_cord";
  cargoSha256 = "0v4di4xny48g03a4f179nm16s8i6ss01ijk81idhr648havgj8kc";
 
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
  OPENSSL_LIB_DIR="${openssl.dev}/lib/pkgconfig";
  OPENSSL_INCLUDE_DIR="${openssl.dev}/include/openssl";
}
