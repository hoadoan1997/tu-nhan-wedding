# QR Code + Search Fix + Floor Plan Removal: When Testing Surfaces Real Bugs

**Date**: 2026-07-07 21:43
**Severity**: Medium (fixes real bugs affecting guests)
**Component**: Find Your Seat seating search + QR feature
**Status**: Resolved

## What Happened

Started the session aiming to ship a straightforward QR-code feature for guests to scan at venue entry and find their seating. Planned 3 phases: generate static QR SVG, build a printable A4 sign route, and verify mobile UX. All three shipped cleanly.

Then the user tested against live guest data (94 names) and found three real search bugs. The planned QR feature was good; the existing search was broken in ways that never surfaced during dev testing. We fixed all three bugs and removed the venue floor plan visualization after the user assessed it as "not nice, unclear on mobile."

## The Brutal Truth

Testing against real data revealed a painful reality: substring and prefix matching on diacritic-stripped Vietnamese names was producing false positives that made the search unreliable. "Yến" matched every "Nguyễn ..." guest because after stripping accents, "Nguyen" contains the substring "yen". "Trí" matched both "Trịnh" and "Triệu" because they all normalize to "tri" once tone marks disappear.

This is frustrating because it means the search was silently broken — not crashing, just wrong. A guest arrives at the kiosk, types their first name, and sees 20 results instead of 1 or 2. We got lucky that the user tested thoroughly instead of discovering this complaint from the floor on wedding day.

The floor plan removal felt like defeat at first — we'd invested effort building those components (guest avatars, round tables, venue decorations). But the user was right: on mobile, the floor plan was more confusing than helpful. Sometimes you build something that doesn't deliver.

## Technical Details

**Search bug fix**: Rewrote `nameMatches()` to use strict whole-word matching with a sliding window instead of substring/prefix matching. The algorithm: normalize the query and guest names by stripping diacritics + lowercasing, then check if all query words appear consecutively in the guest's name words (in order). Supports both single-word queries ("Nguyễn") and multi-word queries ("Hồ Văn Sơn").

```typescript
// Before: substring/prefix issues
const hasMatch = normalizedName.includes(normalizedQuery);

// After: sliding window whole-word matching
const nameWords = normalizedName.split(/\s+/);
const queryWords = normalizedQuery.split(/\s+/);
let found = false;
for (let start = 0; start <= nameWords.length - queryWords.length; start++) {
  if (queryWords.every((word, i) => nameWords[start + i] === word)) {
    found = true;
    break;
  }
}
```

Confirmed via Node simulation against representative names.

**Deleted components**: `venue-floor-plan.tsx`, `round-table.tsx`, `venue-decorations.tsx`, `guest-avatar.tsx`, `guest-avatar-variants.tsx` — all had zero other importers, confirmed via grep. Simplified the page to return name/table cards only.

## What We Tried

1. Initial fix: tone-mark-only stripping (preserving vowel-quality modifiers like circumflex). Analyzed trade-off: breaks ASCII-only typing for most Vietnamese names. User explicitly rejected this — diacritic-insensitive search intentionally prioritizes ASCII-typability over rare tone-collisions.
2. Kept accepted limitation: "Vân"/"Văn" still normalize to the same string. This is a known, documented trade-off.

## Root Cause Analysis

We tested with synthetic/minimal data during development. The search worked on isolated cases. But 94 real guests in a dataset meant 94 opportunities to hit edge cases—and we did. The substring/prefix approach seemed natural for autocomplete, but Vietnamese name structure (common family names like Nguyễn, tones that normalize similarly) made it fragile.

Not validating against real data before shipping search logic was the mistake.

## Lessons Learned

1. **Test with real data early**—not just unit tests with synthetic cases. A search feature must be validated against the actual guest list, ideally before the feature is considered "done."
2. **Good UX validation can save wasted effort**—the floor plan was built with care, but the user's mobile feedback was the real signal. Building it was not wasted; but testing on-device sooner would have caught the issue.
3. **Document accepted trade-offs explicitly**—the diacritic-search decision is now recorded in the changelog and plan, so future maintainers understand why "Vân"/"Văn" collide and why we chose to leave it.

## Next Steps

- No follow-up work needed. The search is now robust, QR code is live, and the floor plan removal simplifies the page for all devices.
- If future guests report search issues, refer back to this entry for context on the sliding-window algorithm and the tone-mark trade-off decision.
- Consider a pre-launch "final data validation" step for future features that touch live datasets: run against the real guest list and confirm expected behavior with the couple before shipping.
