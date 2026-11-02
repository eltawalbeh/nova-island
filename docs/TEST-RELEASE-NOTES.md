# Island Dev v0.1.0-test.1 — Windows Testing

This is a **temporary, unsigned Windows 10/11 x64 test build**, not a polished release.

Built from the `develop` branch of [eltawalbeh/nova-island](https://github.com/eltawalbeh/nova-island) using GitHub Actions.

## What to test
1. Install and launch the app on Windows 10/11 x64.
2. Check whether the island shows at the top of the screen; open it with **Ctrl + Alt + I**.
3. Test music/media, apps, timers, downloads, settings, Arabic labels, prayer times and display scaling.
4. If the original Nova Island app is also installed, check that their shortcuts and settings stay separate.
5. Clipboard history and smart clipboard are **off by default** in new test installations; enable them only if desired.
6. Try it first on a test account or non-critical PC if possible. This installer is **not code signed**.

## Important limitations
- **Development branding:** the test installer uses a temporary "Island Dev" icon and name; some source-related labels and the upstream companion's appearance still remain. No final product identity has been chosen.
- This build has passed automated syntax, unit, C# compilation and installer-build checks; real-device UI, security, battery and performance tests are still outstanding.
- The original project is GPL-3.0, with separate terms for some bundled assets. Preserve attribution and comply with those licenses.
- Auto updates are disabled by default. This build does not publish or download a newer version of the original project.
- Uninstalling should not remove user data automatically.

## Feedback
Please attach screenshots and Windows version, and describe what was happening when an issue occurred, in [GitHub Issues](https://github.com/eltawalbeh/nova-island/issues) or directly to the developer.

Original work: [NOVA-TECH-KIT/nova-island](https://github.com/NOVA-TECH-KIT/nova-island), by AmerTech.
