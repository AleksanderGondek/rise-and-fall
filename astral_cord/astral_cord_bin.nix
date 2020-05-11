with import <nixpkgs> {};

rustPlatform.buildRustPackage {
  name = "astral_cord";
  cargoSha256 = "1a28yy1xws8n7j8vzlzzv60gvfjidmhqx2r67mjdy98rhppzrvv2";
 
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
  RUST_BACKTRACE = 1;
}
