# Vibration Station science model — 24 October 2026

The artwork remains illustrative. The calculations do not claim to measure the photographed bands or the pressure in a room.

- The three matching ideal strings have the same length and mass per unit length. All begin at the same tension and fundamental (440 Hz). Each keeps its own tension setting; tuning one leaves the others unchanged. The loose, starting and tight settings yield 220, 440 and 880 Hz on any string. Changing tension follows `f = sqrt(T / mu) / (2L)`.
- Each string uses the same fundamental-only audio waveform, gain envelope and normal-speed duration. The comparison changes pitch without changing the instrument timbre. This does not model the harmonics of a real rubber band or guitar.
- Both motion diagrams use one time reduction: model time equals elapsed time divided by 220. When strings are tuned to 220, 440 and 880 Hz, their slowed rates remain 1:2:4. Equal tensions yield equal pitch and motion on all three strings. Eight seconds of display show about 0.036 seconds of model time. The replay continues after normal-speed audio fades and is labelled accordingly.
- The string has fixed endpoints and a fundamental transverse mode. Air particles move longitudinally around equilibrium locations; the disturbance propagates at 343 m/s for every frequency. Particle displacement is exaggerated, bounded, and not to scale. Real instruments transfer vibration through the body/soundboard as well as the string.
- The optional graph displays generated digital audio samples in a fixed 12 ms time window. It is not an acoustic pressure measurement or the spatial path of air particles. Silence produces a flat line.
- Drum strength scales the signal amplitude with the same pitch sweep and decay. The drum rim stays still while the membrane illustration moves. Sound Hunt uses synthesized examples, not universal duration classifications.
- Starting another sound, changing tension, or changing investigations stops the previous voices so comparisons do not unintentionally overlap.

References consulted:

- [OpenStax, College Physics 2e, 17.1 Sound](https://openstax.org/books/college-physics-2e/pages/17-1-sound)
- [UNSW, Strings, standing waves and harmonics](https://phys.unsw.edu.au/jw/strings.html)

Validation:

```sh
node --check vibration-station/app.js
node --check vibration-station/model.js
node vibration-station/tools/check-science.cjs
```

The existing GitHub browser workflow additionally measures actual generated audio frequency from sampled signals, checks layout and state during resize, checks live waveform rendering, and runs the downloaded HTML with network access blocked. Direct browser review uses 1024×540, 1366×650, 768×900, 390×667, 320×568 and 640×360. Short screens are allowed to scroll; essential controls are not clipped.
