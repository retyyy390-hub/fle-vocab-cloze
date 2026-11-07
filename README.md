# FLE Vocabulary · November 7.2

Live site: https://retyyy390-hub.github.io/fle-vocab-cloze/

November contains Lists 7–11: 75 headwords and 750 sentence questions. October Lists 4–6 and existing browser records remain available. Select one word family from the basket, then edit its form directly in the sentence. Meaning and form are graded separately. Every November sentence has a context-specific offline SVG illustration; polysemous words use different scenes for different senses. Illustrations are visible in the reference and feedback views, and optional during a quiz. Revealing one is recorded as assistance and cannot count as independent mastery. A form error enters the same mistake-review loop as a word error; same-day success is verified again on another day.

The root `index.html` is a self-contained production build. `sw.js`, the manifest and app icons support installation and offline use on the GitHub Pages project path. All vocabulary, icons and illustrations are bundled locally; no external image service is required. Updates wait for the learner to refresh; unfinished answers are saved before refreshing.

`FLE-November-Lists-7-11.txt` contains the 75 primary entries, separated by English commas, including complete phrases. It can also be copied by List or downloaded from the website’s word-list page. The Baicizhan website has not been filled in.

## Rebuild

Extract `source-november-v7.2.zip`, then use Node.js 24 or later:

```sh
npm ci
npm test
npx tsc --noEmit
npm run build
```

Upload the contents of `dist/` to the repository root. `npm run build` inlines the JavaScript and CSS and generates a content-specific service-worker cache version. Keep `sw.js` with the matching `index.html`.

## Content and review

- November meanings come from the uploaded 0500 FLE edition 6 vocabulary documents. Word forms and sentence contexts draw on the uploaded List 7–11 classroom PDFs plus authored practice contexts.
- Every new headword has ten contexts. Inflected and derived forms are mixed without counting them as separate new words. Fixed phrases and invariant words stay intact.
- Common UK and US spellings are accepted. Source ambiguities and usage corrections appear in the relevant word’s notes.
- New-word detection, due review and optional practice have separate purposes. Optional practice does not change daily quotas or scheduled review dates.
- The test suite covers vocabulary completeness, word/form grading, alternate spellings, question variation, old draft compatibility, Beijing-day scheduling and offline updates.

The source archive includes the final vocabulary JSON and does not require the original classroom attachments to build. `scripts/build-vocabulary.py` is the source-import tool; rerunning that import requires the original documents and extracted tables. For later updates, preserve existing word IDs and old question order so saved drafts and records remain compatible.

Icons: FatCow Farm-Fresh Icons by FatCow Web Hosting, licensed under CC BY 3.0: https://creativecommons.org/licenses/by/3.0/ . The website retains the attribution in its footer.
