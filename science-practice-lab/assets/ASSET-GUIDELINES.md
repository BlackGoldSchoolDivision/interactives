# Asset bank production notes

This folder distinguishes **existing live images** (`image-bank.json`) from **planned candidates** (`asset-plan.json`). Planned paths do not imply that a PNG or WebP exists.

**Visual direction:** vibrant yet credible educational photography and cohesive illustrations, not primitive arrangements of geometric/vector characters. Avoid artificially uniform shadows, extra fingers, distorted transparent beakers, inaccurate thermometers and impossible mechanisms. Use original art only; never re-publish a teacher-supplied Vretta practice screenshot. The question interface remains clean and legible.

## Production

1. Create each **source** PNG at useful resolution; for cropped sheets, maintain known rows, columns and panel order.
2. Review anatomy, science and composition at original size. Reject ambiguous imagery rather than writing a leading caption to repair it.
3. Generate an optimized WebP in the matching unit directory. Source `*.png` and page `*.webp` remain paired.
4. Record title, unit, accessible observation-only descriptions and actual dimensions/crops in `image-bank.json`.
5. Use code for measurement, correct-answer logic, drag targets, arrows, textual labels and exact particle models.
6. Test visual crop/alt text and responsive layouts before updating a question.
7. Maintain provenance or factual source notes in `source-notes/`.

**Current inventory:** Existing Matter/Energy images are documented in [IMAGE-BANK.md](IMAGE-BANK.md). Earth and Shared folder notes below mark future banks; their assets are not yet generated.
