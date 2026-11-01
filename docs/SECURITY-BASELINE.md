# Security and privacy baseline (source review only)

## Confirmed implementation details
- Main Electron window uses `contextIsolation: true`, `nodeIntegration: false` and a Content Security Policy.
- Native Windows bridge uses a C# helper executable; C# source and build script are included, but binary/source parity remains unverified.
- Clipboard history is in memory, and current defaults enable it. Review handling of passwords and copied confidential information.
- Screenshot and glass effects use desktop capture; clipboard screenshots can be saved to a file shelf.
- The mic/camera indicator reads the Windows registry; location/weather uses IP lookup when manual city is not set.
- Network availability is checked using a Microsoft HTTP connectivity probe.
- In the original code, updates used the upstream release feed and startup migration could delete upstream shortcuts. The fork redirects updates, defaults them off, and removes that migration.

## Required before release
1. Audit the native helper, IPC/event handlers, file/network operations and shipped binaries.
2. Test on Windows 10 and 11, including co-installation with upstream, startup/uninstall and screen scaling.
3. Measure CPU/RAM/battery, especially glass capture while idle and on multi-monitor setups.
4. Review explicit privacy controls, third-party services, screenshot retention and clipboard UX.
5. Check licenses for non-GPL assets, notably the bundled Qur'an font; sign the installer and establish a release process.

No malware scan, binary verification, real Windows execution or performance certification has been completed in this phase.

## Phase 1 continuation — additional source hardening
- Thumbnail downloader now restricts URL shapes to public HTTPS hostnames, disallows redirects and buffers at most 400 KiB. This reduces risk from malformed data/oversized images; **DNS rebinding and provider trust require additional security review**.
- Mini Player IPC verifies the event sender belongs to its own window.
- Clipboard text history, smart clipboard, clipboard screenshot notifications, and automatic screenshot shelf are off by default for new installs, with user opt-in available.
- The Windows CI workflow attempts to rebuild the native helper and package the development installer, without publishing it.
- Desktop glass capture and repeated background polling still require a real-device performance profile.
