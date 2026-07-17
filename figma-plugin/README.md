# Figma plugin scaffold

This folder is the Figma-side entry point for the translation service at `POST /api/design-system/translate`.

Before importing it into Figma, bundle `src/code.ts` and `src/ui.html` into `dist/` using your preferred Figma plugin build tool. Update the endpoint in the panel to an authenticated HTTPS orchestration URL for any shared environment; `localhost` is only for development.

The plugin exports the selected node tree, receives generated React source plus validation findings, and displays the result for review. Importing code changes back into a Figma library is deliberately deferred until component ID/version mapping and review rules are configured.
