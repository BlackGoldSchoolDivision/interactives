# Rainy Lake arrival — route and artwork checkpoint

Prepared October 8, 2026. This checkpoint adds researched destination notes and an environment asset. The playable game remains at the illustrated-post trading-practice checkpoint; arrival, onward travel and actual journey exchanges are not wired into the application yet.

## Destination in 1809

The next actual arrival will be **Fort Lac La Pluie / Rainy Lake House**, the North West Company depot near the Rainy River outlet of Rainy Lake, in the area now called Fort Frances. The Town of Fort Frances reproduces the provincial plaque: the NWC establishment dates from sometime between 1775 and 1787 and operated until the 1821 merger. Its Athabaska House exchanged cargo between eastern and inland brigades. This supports an NWC destination in the game's 1809 setting.

Do not label this destination Fort St. Pierre, the earlier French fort abandoned around 1758. Do not call it Fort Frances in 1809: the later HBC name dates from 1830. The Town's other plaque describes HBC Lac La Pluie House in 1818–1903; that later establishment is not this 1809 NWC arrival.

The company operated a depot here; that does not make the surrounding Anishinaabe land and waterways company property. Present local partners as people with their own knowledge, supplies and choices. Anishinaabe networks and technologies predate company routes. The contemporary Grand Council Treaty #3 food-sovereignty page provides a community-authored context for continuing wild-rice harvesting, fishing and hunting; it is not evidence for exact 1809 trades, prices, clothing or buildings.

## Route representation

| Stage | Geographic meaning | Display constraint |
| --- | --- | --- |
| Fort William | Departure depot at the Kaministiquia / Lake Superior connection | Existing camp and packing start |
| Kakabeka Falls | Carrying around an actual obstacle on the Kaministiquia route | Existing river landing and completed portage |
| Inland waterways | Numerous intervening rivers, lakes and portages toward Rainy Lake | A clearly compressed journey, rather than an adjacent post or instant arrival |
| Fort Lac La Pluie | NWC cargo exchange and provisioning destination on the Rainy River | New arrival art and the learner's remaining inventory |

Ontario's Dog River management statement documents the historic westward route linking Kaministiquia, Dog Lake, Dog River and Savane River. Fort William Historical Park identifies its department's reach west to Lac la Pluie. These sources ground a general inland connection. This first game pass must not claim a surveyed, continuous river trace or a historically measured journey time. The existing map's general-direction connection can provide orientation; it must remain labelled as simplified. A more detailed navigable map requires additional geographic data and evidence for the intermediate passages.

## New environment

Asset: `assets/post-rainy-lake.webp`, 1536 × 1024, 520,896 bytes. A modest wooded riverside depot, canoe landing, cargo exchange, provision sack, stocked shelves and clear wooden counter. The supplied Fort William artwork was a style reference. The new picture has a smaller compound, broad calm water and low wooded horizon.

This is a source-informed illustrative scene. Building arrangement, enclosure, people, clothing, shelves, objects, season and lighting are imagined. It does not reproduce an excavated assemblage or a known 1809 view. The fish and rice illustrate the proposed provisioning scenario; later local food-trade evidence and Fort William's Anishinaabe provisions do not establish an exact stock list for this post in 1809. Glass colours repeat the game's object palette and are not a claim about finds at Rainy Lake.

## Next build chunk: inventory continuity

- Start onward travel only after the current journey's canoe and every bundle have completed the portage and been reloaded.
- Create one persistent onward-journey state keyed to the original river `journeyId`. Use remaining food, repair kits and canoe condition from the portage manifest. Do not re-import the original packing counts after repairs have been spent.
- Show the learner's pictured cargo beside the route. Make elapsed travel and provisions visible. All food use and travel durations are explicitly invented game rules.
- Arrival creates one real visit to this inland post from that persistent cargo. It must not copy a practice visit or offer a company-switching shortcut.
- Stage offers without spending. Accepting a valid agreement updates journey cargo and post stock exactly once. Leaving, returning, resizing or reloading preserves the exchange and staged work.
- Keep the separately saved Fort William / York comparison practices available.
- Use pictures, short prompts and visible choices. Provisioning and canoe capacity remain part of the goal; the activity must not imply that accumulating the most furs is the only measure of success.

## Following verification chunk

Check depleted repair supplies, food use, conservation during real exchanges, reloading at each transition, stale agreements, new-journey invalidation and independent practice saves. Play a complete journey through the arrival. Verify live and completed states at all six required sizes, keyboard access, horizontal overflow and control sizes, then publish and pause for review. Native browser zoom remains a manual check unless the browser supports it.

## Sources

- [Town of Fort Frances — West Fort Frances heritage tour and provincial plaques](https://www.fortfrances.ca/node/248)
- [Fort William Historical Park — history and depot roles](https://fwhp.ca/about-us/our-history/)
- [Fort William Historical Park — Indigenous networks and historical background](https://fwhp.ca/about-us/historic-background/)
- [Ontario — Dog River Conservation Reserve management statement](https://www.ontario.ca/page/dog-river-conservation-reserve-management-statement)
- [Parks Canada — Fort St. Pierre designation](https://www.pc.gc.ca/apps/dfhd/page_nhs_eng.aspx?i=87525&id=372)
- [Grand Council Treaty #3 — food sovereignty](https://gct3.ca/economic/food-sovereignty/)

