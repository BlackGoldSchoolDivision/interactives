# Curriculum grade connections

Reviewed 22 October 2026 against Darren's seven supplied curriculum workbooks:

- Science 1–6 Curriculum NEW Alberta
- Science 7–9 Curriculum — Alberta Draft (September 2026)
- Math 1–6 Curriculum New Alberta
- Mathematics (7–9) Draft New Alberta
- Social Studies 1–6 Curriculum
- Social Studies 7–9 Curriculum
- ELAL 1–6 Curriculum New Alberta

The private workbook URLs and full copied sheets are not published. Workbook
keys, exact grade-tab names and evidence row numbers are in
`../curriculum-alignment.json`. Draft status is retained at the source level.

Ready, Set, Roll! added 23 October 2026 with a partial Grade 1 Science movement connection.

## What the tags mean

Tags identify a curriculum connection or an explicit resource use level. They
do not assert completion of an entire outcome. All referenced connections are
marked partial, ready for a later activity-by-activity coverage audit.

120 of the 153 entries have specific grade labels; 33 have a flexible or
enrichment label. The separate Flexible & enrichment filter also includes
the Grade 7 financial-decisions activity, whose budgeting context is not
established by the requested mathematics workbook.

- `curriculum`: an inspected activity connects to the cited workbook rows.
- `teacher-tool`: a grade-specific planning/routine tool; coverage depends on
  the teacher's selected lesson and student work.
- `resource-level`: the resource explicitly supplies grade-level passages.
  Reading Maze contains Grades 2–10, but only Grades 2–6 were checked against
  the supplied ELAL workbook.
- `extension`: Ionic Nomenclature is designed for Chemistry 20 (Grade 11).
  Its binary ionic examples can extend Grade 9 draft content; advanced items
  should not be counted as required Grade 9 work.
- `enrichment`: additional material without a direct named-content match in
  the supplied workbooks. World/US map drills and Renaissance activities are
  kept available without inventing a new-workbook grade match.
- `flexible`: teacher-entered content, communication/access support or
  language practice; the tool alone does not establish curriculum coverage.

Grade filtering intersects the existing subject, geography-group, activity
type and text filters. Choosing a grade from Featured opens the full collection.
Reset clears all filters. Non-contiguous grade sets stay non-contiguous (for
example, angles: Grades 3–4 and 8).

## Updating the collection

1. Inspect the actual activity and the relevant current curriculum rows.
2. Update its explicit entry in `curriculum-alignment.json`, including the
   grade, source key, row references, rationale and limitations.
3. Use an appropriate non-curriculum basis when there is no direct match.
4. Run `python3 source/build.py`. It synchronizes grade fields into
   catalogue.json, embeds the catalogue in index.html, refreshes asset cache
   versions and generates the activity-links CSV with grade notes.
5. Check subject + grade + type + search intersections, the empty-state reset,
   keyboard operation and the six required responsive sizes.

Do not infer that every referenced outcome is covered, or use flexible tools
as evidence of coverage. Review sub-activities in large collections separately
when building the next outcome-gap report.
