# Specification

## Summary
**Goal:** Add authentication via login page and enable Bluetooth device connection through the UI.

**Planned changes:**
- Add a login page that requires Internet Identity authentication before accessing the health dashboard
- Add a "Connect Device" button in the dashboard to trigger Bluetooth pairing dialog
- Implement Web Bluetooth API integration to scan for and connect to nearby Bluetooth devices
- Display connection status and provide user feedback for connection success/failure

**User-visible outcome:** Users must log in with Internet Identity before accessing the dashboard, and can connect Bluetooth devices through a dedicated button that opens the browser's device selection dialog.
