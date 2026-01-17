# Aurum Diagrams (LLD-Only)

Basic, unique Mermaid sources for review and PNG export.

## Files
- `class-diagram.mmd`: Entity relationships and key fields.
- `sequence-diagram.mmd`: Customization request flow.

## Quick Preview (No install)
- Open https://mermaid.live
- Paste the contents of each `.mmd` file to preview.
- Export as PNG/JPG from the UI.

## VS Code Preview (Optional)
- Install "Markdown Preview Mermaid Support" or a Mermaid diagram extension.
- Create a Markdown wrapper and embed the code blocks to preview.

## PNG Export via Mermaid CLI (Windows)
1. Install Node.js (if not already).
2. Install CLI:
   ```powershell
   npm install -g @mermaid-js/mermaid-cli
   ```
3. Export PNGs to this folder:
   ```powershell
   mmdc -i class-diagram.mmd -o class-diagram.png
   mmdc -i sequence-diagram.mmd -o sequence-diagram.png
   ```

## Notes
- Keep diagrams simple; adjust labels/enums as your schema evolves.
- For large exports, consider `-w`/`-H` CLI flags to set width/height.
