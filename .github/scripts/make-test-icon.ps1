# Generate a plain temporary test icon; do not reuse the upstream project's logo.
Add-Type -AssemblyName System.Drawing
$size = 256
$bmp = [System.Drawing.Bitmap]::new($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)
$bg = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 32, 38, 52))
$accent = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255, 106, 180, 245), 8)
$ink = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$g.FillEllipse($bg, 8, 8, 240, 240)
$g.DrawEllipse($accent, 12, 12, 232, 232)
$font = [System.Drawing.Font]::new("Segoe UI", 98, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$format = [System.Drawing.StringFormat]::new()
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString("ID", $font, $ink, [System.Drawing.RectangleF]::new(0, -3, 256, 256), $format)
New-Item -ItemType Directory -Force -Path "build" | Out-Null
$bmp.Save((Join-Path (Get-Location).Path "build/icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$format.Dispose(); $font.Dispose(); $ink.Dispose(); $accent.Dispose(); $bg.Dispose(); $g.Dispose(); $bmp.Dispose()
# A PNG-compressed 256x256 icon stored inside the standard ICO container.
$png = [System.IO.File]::ReadAllBytes((Join-Path (Get-Location).Path "build/icon.png"))
$target = Join-Path (Get-Location).Path "build/icon.ico"
$stream = [System.IO.File]::Open($target, [System.IO.FileMode]::Create)
try {
  $writer = [System.IO.BinaryWriter]::new($stream)
  $writer.Write([UInt16]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]1)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]32)
  $writer.Write([UInt32]$png.Length)
  $writer.Write([UInt32]22)
  $writer.Write([byte[]]$png)
  $writer.Flush()
} finally {
  $writer.Dispose()
  $stream.Dispose()
}
Write-Host "Temporary Island Dev icons generated."
