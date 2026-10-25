# Sources and modelling choices

- Alberta Grade 5 Science: https://curriculum.learnalberta.ca/curriculum/en/c/sci5 . Outcomes and skills checked against the supplied curriculum workbook, October 2026. Float Lab has partial connections to Matter, Energy, Scientific Methods and Design. No invented outcome codes are used.
- Density of ethanol–water mixtures, CRC / International Critical Tables, true densities at 20°C, mass-percentage composition: https://www.jlab.org/ir/CRCHandBooks/15_20_84.pdf . The model interpolates a 5% table; it does not assume additive volumes for water–ethanol blends.
- Simon Fraser University, fluid and salt-solution densities: https://www.sfu.ca/phys/demos/demoindex/fluids/fl2b/density.html . Water 0.99820 g/mL, glycerin 1.260 g/mL, castor oil 0.969 g/mL; sodium chloride solutions at 0, 10, 20 and 26 mass % are interpolated.
- American Chemical Society, density of liquids: https://www.acs.org/education/resources/k-8/inquiryinaction/fifth-grade/substances-have-characteristic-properties/density-of-liquids.html . Equal-volume comparisons and contrasting water, vegetable oil and corn syrup.
- American Chemical Society, liquids dissolving in water: https://www.acs.org/middleschoolchemistry/lessonplans/chapter5/lesson7.html . Oil separation is distinguished from miscibility; alcohol and corn syrup can blend with water.
- Ghent University Science Museum, Plateau experiment: https://sciencemuseum.ugent.be/engl-plat9.html . An immiscible drop can be neutrally buoyant when the surrounding mixture has matching density. Gravity remains; buoyancy balances weight. Surface tension determines the rounded shape.
- NSTA, The Magic of Density: https://www.nsta.org/science-scope/science-scope-julyaugust-2021-0/magic-density . Representative classroom sample values: vegetable oil 0.92, light corn syrup 1.33, honey 1.42 g/mL. Product composition and temperature cause variation.
- The Learning Scientists, implementation guidance: https://www.learningscientists.org/blog/2019/1/31-1 . Guided challenge, comparison, evidence and explanation inform the tasks. The app has not undergone an efficacy study.

Solid values are selected representative classroom samples, not universal material constants: oak 0.80, concrete 2.40, cork 0.24, paraffin wax 0.90, HDPE 0.95, aluminium 2.70 g/cm³. The construction task uses a selected clay sample of 100 g / 50 cm³. Scientific response is calculated from mass, volume, fluid density and displaced volume rather than assigned win/lose animations.

Material artwork was newly generated for this project as a six-cell texture atlas. It is used as specimen surface texture in the numerical model display. Nunito is licensed under the SIL Open Font License; the full licence is included.

The illustrated lab backdrop was generated independently for this project, using the approved original Float Lab mockup as its visual reference. All vessels, measurement marks, labels, liquids, oil drops and moving samples are rendered in code, independently of the background image. No third-party simulation imagery is included.

The refined spherical-drop model uses the volume of the immersed spherical cap. Layer-object geometry and feedback share the same actual column depth. Guided hull benchmarks enumerate only the same dimensions available to students; they do not claim an optimum for real clay boats or account for omitted material strength and stability.

The pouring-order task uses an illustrative exposed-layer contact rule for water–ethanol mixing. It distinguishes mixing before an oil barrier forms from layering water, oil, and then alcohol. It does not model turbulence, viscosity, or diffusion times.
