#!/bin/sh
# Installs the visor command, the Visor Development Kit's tool for your computer:
#
#   curl -fsSL https://visor.macedonga.com/install.sh | sh
#
# It takes the latest release from GitHub, puts it in ~/.visor and adds ~/.local/bin/visor to start it. Run it again to
# update. VISOR_HOME and VISOR_BIN change the two folders; VISOR_ZIP installs from a release zip you already have.
set -eu

repo="macedonga/visor-kit"
home="${VISOR_HOME:-$HOME/.visor}"
bin="${VISOR_BIN:-$HOME/.local/bin}"

fail() { echo "visor: $1" >&2; exit 1; }
command -v unzip >/dev/null 2>&1 || fail "the installer needs unzip. Install it, then run this again."

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

if [ -n "${VISOR_ZIP:-}" ]; then
  cp "$VISOR_ZIP" "$tmp/visor.zip"
else
  command -v curl >/dev/null 2>&1 || fail "the installer needs curl. Install it, then run this again."
  tag=$(curl -fsSL "https://api.github.com/repos/$repo/releases/latest" | sed -n 's/.*"tag_name": *"\(v[^"]*\)".*/\1/p' | head -n 1)
  [ -n "$tag" ] || fail "no release of $repo was found. Check your connection, or download a zip from https://github.com/$repo/releases."
  echo "Downloading visor ${tag#v}"
  curl -fsSL -o "$tmp/visor.zip" "https://github.com/$repo/releases/download/$tag/visor-${tag#v}.zip"
fi

unzip -q "$tmp/visor.zip" -d "$tmp/unpacked" 2>/dev/null || fail "the download is not a visor release zip."
dist=$(find "$tmp/unpacked" -mindepth 1 -maxdepth 1 -type d -name 'visor-*' | head -n 1)
[ -n "$dist" ] && [ -x "$dist/bin/visor" ] || fail "the zip does not hold a visor release."

# Only the installer's own folders are replaced.
mkdir -p "$home" "$bin"
rm -rf "$home/bin" "$home/lib"
cp -R "$dist/bin" "$dist/lib" "$home/"
# A wrapper rather than a symlink: some systems copy a symlinked file, and the launcher then misses its lib folder.
rm -f "$bin/visor"
printf '#!/bin/sh\nexec "%s/bin/visor" "$@"\n' "$home" > "$bin/visor"
chmod +x "$bin/visor"
echo "Installed $(basename "$dist") in $home"

case ":$PATH:" in
  *":$bin:"*) ;;
  *) echo "Add $bin to your PATH, for example in ~/.profile: export PATH=\"$bin:\$PATH\"" ;;
esac

if [ -z "${JAVA_HOME:-}" ] && ! command -v java >/dev/null 2>&1; then
  echo "visor needs Java 17 or later, and it found none. Android Studio brings one: set JAVA_HOME to its jbr folder."
  echo "Or install a JDK, such as Temurin from https://adoptium.net."
fi
