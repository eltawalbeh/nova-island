# Phase 1 — Foundation

Working branch: `develop`. Upstream v1.4.0 baseline retained on `main`.

## Applied
- Full fork with Git history and GPL attribution retained.
- Temporary internal identity **Island Dev** (not the final name), unique Windows application ID, installer/executable and shortcuts.
- Separate app data and log paths; removed migration that could delete the upstream application's shortcuts.
- Update source changed to this fork and auto-updates default to off; explicit allowlist in updater.
- Static syntax check, small behavior and isolation tests, Windows CI workflow.

## Outstanding
- Pick final product name and icon. Replace all remaining in-app labels, visual assets and promotional materials before public release.
- Run the app and installer on Windows; validate coexistence with the original, uninstall, multi-monitor, DPI, system features and performance.
- Audit compiled `helper/nova-helper.exe` against C# sources and check security, privacy, dependency and asset licences.
- Design system, AR/EN UI and accessibility QA in later phases.

**Do not release the development build publicly:** existing upstream logo/artwork and UI labels are not fully replaced. GPL requirements and any separately licensed assets apply.
