# Installs the visor command, the Visor Development Kit's tool for your computer:
#
#   irm https://visor.macedonga.com/install.ps1 | iex
#
# It takes the latest release from GitHub, puts it in %LOCALAPPDATA%\visor and adds its bin folder to your PATH. Run
# it again to update. VISOR_HOME changes the folder; VISOR_ZIP installs from a release zip you already have.
$ErrorActionPreference = "Stop"

$repo = "macedonga/visor-kit"
$dest = if ($env:VISOR_HOME) { $env:VISOR_HOME } else { Join-Path $env:LOCALAPPDATA "visor" }
$tmp = Join-Path ([IO.Path]::GetTempPath()) ("visor-" + [Guid]::NewGuid())
New-Item -ItemType Directory -Path $tmp | Out-Null

try {
    $zip = Join-Path $tmp "visor.zip"
    if ($env:VISOR_ZIP) {
        Copy-Item $env:VISOR_ZIP $zip
    } else {
        $tag = (Invoke-RestMethod "https://api.github.com/repos/$repo/releases/latest").tag_name
        $version = $tag.TrimStart("v")
        Write-Host "Downloading visor $version"
        Invoke-WebRequest "https://github.com/$repo/releases/download/$tag/visor-$version.zip" -OutFile $zip -UseBasicParsing
    }
    Expand-Archive $zip -DestinationPath (Join-Path $tmp "unpacked")
    $dist = Get-ChildItem (Join-Path $tmp "unpacked") -Directory -Filter "visor-*" | Select-Object -First 1
    if (-not $dist -or -not (Test-Path (Join-Path $dist.FullName "bin\visor.bat"))) { throw "The zip does not hold a visor release." }

    # Only the installer's own folders are replaced.
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
    foreach ($part in "bin", "lib") {
        $old = Join-Path $dest $part
        if (Test-Path $old) { Remove-Item -Recurse -Force $old }
        Copy-Item -Recurse (Join-Path $dist.FullName $part) $old
    }
    Write-Host "Installed $($dist.Name) in $dest"
} finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}

$bin = Join-Path $dest "bin"
$path = [Environment]::GetEnvironmentVariable("Path", "User")
if (-not $path) { $path = "" }
if (($path -split ";") -notcontains $bin) {
    [Environment]::SetEnvironmentVariable("Path", (($path.TrimEnd(";"), $bin) -join ";").TrimStart(";"), "User")
    Write-Host "Added $bin to your PATH. Open a new terminal to use visor."
}

if (-not $env:JAVA_HOME -and -not (Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Host "visor needs Java 17 or later, and it found none. Android Studio brings one: set JAVA_HOME to its jbr folder."
    Write-Host "Or install a JDK: winget install EclipseAdoptium.Temurin.21.JDK"
}
