# "Trusted by" Logo Sources

Official brand logos fetched from Wikimedia, resolved via the official
Wikimedia API (`prop=imageinfo` → original file URL). Used on the homepage
"Trusted by" strip only.

| File | Brand | Source file | URL |
| --- | --- | --- | --- |
| `dlf.svg` | DLF Limited | Wikimedia Commons: [File:DLF logo.svg](https://commons.wikimedia.org/wiki/File:DLF_logo.svg) | https://upload.wikimedia.org/wikipedia/commons/a/aa/DLF_logo.svg |
| `wework.svg` | WeWork | Wikimedia Commons: [File:WeWork.svg](https://commons.wikimedia.org/wiki/File:WeWork.svg) | https://upload.wikimedia.org/wikipedia/commons/2/26/WeWork.svg |
| `tata.svg` | Tata Group | Wikimedia Commons: [File:Tata logo.svg](https://commons.wikimedia.org/wiki/File:Tata_logo.svg) | https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg |
| `max-healthcare.svg` | Max Healthcare | English Wikipedia (non-free logo file): [File:Max Healthcare.svg](https://en.wikipedia.org/wiki/File:Max_Healthcare.svg) | https://upload.wikimedia.org/wikipedia/en/1/18/Max_Healthcare.svg |
| `fortis.svg` | Fortis Healthcare (India) | English Wikipedia (non-free logo file): [File:Fortis Healthcare logo.svg](https://en.wikipedia.org/wiki/File:Fortis_Healthcare_logo.svg) | https://upload.wikimedia.org/wikipedia/en/e/ef/Fortis_Healthcare_logo.svg |

## Notes

- **Fortis disambiguation:** the Commons file `Fortis_logo.svg` belongs to the
  Belgian financial group Fortis SA/NV — NOT the Indian hospital chain. The
  correct file is the English-Wikipedia one used above.
- **tata.svg patch:** the original file uses DTD entity declarations
  (`&ns_svg;`) for its namespace; these were replaced with literal namespace
  URIs for safe rendering. No geometry was changed.
- **wework.svg** draws with `fill="currentColor"`; inside `<img>` (no CSS
  inheritance) it renders black, which is the intended dark variant.
- **max-healthcare.svg** contains a white cross inside its blue shield — kept
  intact; verified to remain visible on the light hero background.
- Logos are trademarks of their respective owners. Display here asserts a
  customer/relationship claim made in site copy — ensure that claim is accurate
  and that the owners' usage guidelines permit it before deploying publicly.
- Downloaded 2026-09-23 via the Wikimedia API original-file URLs (User-Agent
  required by Wikimedia policy).
