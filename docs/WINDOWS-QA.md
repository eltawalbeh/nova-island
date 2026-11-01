# Phase 1 — Windows quality gates

## Automated Windows CI
Workflow: `.github/workflows/windows-qa.yml`, running on a GitHub-hosted Windows environment.

- Locked npm dependencies installed with `npm ci`.
- Syntax and Node regression checks.
- Rebuild the C# native helper using its published C# sources.
- Record SHA-256 of bundled and rebuilt helpers. Mismatch means reproducibility needs investigation, **not** proof of malicious code.
- Build a **QA-only** NSIS Windows installer; do not publish it or upload it as a release.
- Run an informational dependency vulnerability audit.

## Manual checks not covered by headless CI
1. Run the temporary development app side by side with the original; verify separate settings, shortcuts, app identity, files and uninstall.
2. Test display scaling at 100%, 125%, 150%, multiple monitors (including negative-coordinate secondary display) and full-screen apps.
3. Verify actual behavior of media, browser helper, clipboard permission modes, desktop capture, prayer alerts, mic/camera privacy signals and IDM bridge.
4. Benchmark CPU/RAM/energy for 10-minute idle, expanded with motion, downloading, video, and screen capture.
5. Confirm UX performance: animations, focus/keyboard, overlap with browser UI, RTL and reduced motion.

## Current limits
A GitHub-hosted Windows runner is **not an interactive Windows desktop**; successful builds do not prove that UI features work or that runtime performance is good. The native helper might have environment-specific compilation dependencies. Verify workflow outcome before claiming success.

## Safety
Development build keeps **Island Dev** placeholder branding and upstream assets. No public distribution until rebranding, licensing and security review is complete.
