# Trading Post: The Fur Trade Fair

A separate, short bargaining game inspired by the McCord Museum classroom activity supplied by Darren Maltais. River Routes remains the connected travel adventure.

## First playable edition

Choose a First Nations trading-party role or a travelling merchant role. Roll three dice for original starting stock, watch the arrival scene, bargain through up to two untimed rounds and unpack the received goods. Original starting items that were not exchanged score zero. Trading all originals ends the fair early. The other role is available after the result.

All twelve McCord item scores are retained: beaver/musket 10; otter/cauldron 5; bear/shirt 4; deer/blanket 3; mink/trade silver 2; muskrat/metal tools 1. The interface calls both sets trade points. The original differentiates gold pieces and prestige points. These are educational game scores, not verified historical prices.

The supplied rules refer to separate dice lookup cards that are not present in either supplied PDF. The six-face lookup is reconstructed from the given examples and paired value tiers. Three rolls, each awarding the face-number quantity, are retained. Computer partners, individual preferences, visible stock and untimed rounds adapt the original human classroom negotiations. The original rotation and uneven-team auction are not implemented.

Click or tap a shelf item to stage one unit; tap a counter item to remove one. Make an offer, inspect an agreement or affordable counteroffer, and confirm an exchange. Changing an offer cancels its pending agreement. Accepted trades spend inventory once. Advancing a round cancels unaccepted offers and keeps all inventory already held. The second partner has new stock and different individual priorities. Accepted goods cannot be traded back as starting stock.

Progress is saved locally on the device, including dice rolls, rounds, inventories, pending agreements and results. Screen resizing changes layout without resetting gameplay. Start over asks for confirmation. Sound begins off; the optional sounds are short generated dice and exchange tones. Reduced-motion settings remove scene movement. No accounts, remote game storage or multiplayer service are required.

## Historical and artistic framing

The original rules name 1750 and the background passage names 1745. This version uses circa 1750 in New France, at a fictional Great Lakes post. The paintings show fictional merchants and Anishinaabe partners; they are not documented portraits, an exact reconstruction or a representation of every Indigenous community. Each partner's preferences are invented and do not define a culture. The final painting represents the ending of the fair, not a documented home village.

McCord's older broad cultural explanations are not repeated as historical fact. Optional teacher notes encourage discussion of individual needs, pre-existing Indigenous knowledge, unequal power and what the simple model leaves out. Current museum context: https://www.musee-mccord-stewart.ca/en/collections/indigenous-cultures/ and https://www.musee-mccord-stewart.ca/en/connecting-indigenous-nations/.

## Validation

Run `node --test tests/model.test.cjs`. Seven meaningful checks cover original score tiers and dice, affordable offers, inventory conservation, repeat prevention, counteroffer validity, round continuity, early finish and saved-state restoration. `qa.html` supplies all six required rendered viewports. Native browser zoom remains a manual check in the remote browser.

## Assets

Four newly generated paintings and a transparent twelve-object atlas, all local WebP assets. See ARTWORK.md for prompts and generation provenance. No museum photography or card artwork is copied into the game.
