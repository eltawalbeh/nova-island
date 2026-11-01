# Final brand and release checklist

Temporary working identity: **Island Dev**. This is NOT the proposed final product name.

- Select an independent name, logo, icon, product website and final app ID.
- Replace `build/icon.ico`, `build/icon.png`, promo artwork and all other upstream visual identities.
- Update in-app strings in `index.html`, `prefs/`, `mini/` and JS UI code.
- Update `package.json`: product name, installer, executable, release owner/repo and package identifiers.
- Update `nova.js`: shortcuts, tray, screenshots, user data, support links and menus; update `log.js`.
- Update README, screenshots, marketing copy, credits and documentation.
- Preserve GPL license and required copyright notices; check separately licensed fonts/assets and any permission that goes beyond GPL.
- If needed, migrate only **our** development settings after verification, never alter the original app's settings.
- Complete Windows smoke testing, accessibility/localization QA, update signing and security tests before publishing.
