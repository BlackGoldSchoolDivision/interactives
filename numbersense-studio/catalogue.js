// Original category IDs are retained to make content coverage auditable.
export const topics = [
  {id:'numbers',name:'Numbers & Algebra',colour:'yellow',description:'Explore patterns and relationships',intro:'Make sense of signed numbers, factors, powers and equations.'},
  {id:'fractions',name:'Fractions',colour:'coral',description:'Build, compare and find equivalent fractions',intro:'Keep the whole the same. Partition, share and combine its parts.'},
  {id:'decimals',name:'Decimals & Calculations',colour:'blue',description:'Work with decimals and calculate fluently',intro:'Use place value to represent numbers and explain your calculations.'},
  {id:'ratios',name:'Ratios & Percentages',colour:'teal',description:'Find equivalent ratios and solve problems',intro:'Connect fractions, decimals, percentages and rates.'},
  {id:'geometry',name:'Geometry & Measurement',colour:'lavender',description:'Explore shapes, position and measurement',intro:'Move points and shapes, rearrange areas and build volumes.'},
  {id:'chance',name:'Chance & Data',colour:'amber',description:'Investigate chance and represent data',intro:'Predict, experiment and compare what happens.'}
];
export const activities = [
  {id:'integers',topic:'numbers',name:'Integer Addition',description:'Move along a number line to add signed numbers.',grades:'6'},
  {id:'comparing',topic:'numbers',name:'Comparing & Ordering',description:'Place integers in order and compare their positions.',grades:'6'},
  {id:'situations',topic:'numbers',name:'Integer Word Problems',description:'Model changes in temperature, elevation and balances.',grades:'6'},
  {id:'factortree',topic:'numbers',name:'Factor Trees',description:'Split composite numbers until every leaf is prime.',grades:'6'},
  {id:'exponents',topic:'numbers',name:'Exponents',description:'Build powers from repeated factors.',grades:'6'},
  {id:'bedmas',topic:'numbers',name:'Order of Operations',description:'Choose each valid next step in an expression.',grades:'6'},
  {id:'algebra',topic:'numbers',name:'Algebraic Equations',description:'Keep both sides balanced while finding the unknown.',grades:'6'},
  {id:'simplify',topic:'fractions',name:'Simplifying Fractions',description:'Regroup equal parts without changing the amount.',grades:'4–6'},
  {id:'sharing',topic:'fractions',name:'Equal Sharing',description:'Share whole items equally and describe one person’s share.',grades:'6'},
  {id:'addsubfrac',topic:'fractions',name:'Add & Subtract Fractions',description:'Make equal-sized parts, then combine or remove them.',grades:'6'},
  {id:'multfrac',topic:'fractions',name:'Multiply Fractions',description:'Find a fractional part of a whole-number quantity.',grades:'6'},
  {id:'addsubdec',topic:'decimals',name:'Add & Subtract Decimals',description:'Align place values and exchange units when needed.',grades:'4–6'},
  {id:'multdec',topic:'decimals',name:'Multiply Decimals by Whole Numbers',description:'Build equal groups and keep track of place value.',grades:'6'},
  {id:'divdec',topic:'decimals',name:'Divide Decimals by Whole Numbers',description:'Share decimal quantities into equal groups.',grades:'6'},
  {id:'repdec',topic:'decimals',name:'Representing Decimals',description:'Connect grids, place values, words and fractions.',grades:'4–6'},
  {id:'longdiv',topic:'decimals',name:'Long Division',description:'Build the quotient, one place-value step at a time.',grades:'4–6'},
  {id:'multmulti',topic:'decimals',name:'Multi-digit Multiplication',description:'Break products into useful partial products.',grades:'4–6'},
  {id:'compdec',topic:'decimals',name:'Compare, Order & Round Decimals',description:'Locate decimal values and their nearest benchmarks.',grades:'4–6'},
  {id:'convert',topic:'ratios',name:'Fractions, Decimals & Percentages',description:'Show the same amount in three forms.',grades:'4–6'},
  {id:'percentdiv',topic:'ratios',name:'Percentage by Long Division',description:'Divide numerator by denominator and convert to percent.',grades:'6'},
  {id:'ratios',topic:'ratios',name:'Equivalent Ratios',description:'Scale both quantities together.',grades:'5–6'},
  {id:'percentof',topic:'ratios',name:'Find a Percentage of a Number',description:'Build a percentage from helpful benchmark parts.',grades:'6'},
  {id:'unitrate',topic:'ratios',name:'Unit Rates',description:'Compare prices, speeds and earnings per one unit.',grades:'6'},
  {id:'coordinates',topic:'geometry',name:'Cartesian Plane',description:'Plot points using horizontal and vertical coordinates.',grades:'6'},
  {id:'transformations',topic:'geometry',name:'Transformations',description:'Translate and reflect shapes on a coordinate grid.',grades:'6'},
  {id:'area',topic:'geometry',name:'Area: Triangles & Parallelograms',description:'Rearrange shapes to explain base and height.',grades:'6'},
  {id:'volume',topic:'geometry',name:'Volume of Prisms',description:'Build rectangular prisms from equal cube layers.',grades:'6'},
  {id:'probability',topic:'chance',name:'Probability',description:'Compare favourable and total equally likely outcomes.',grades:'6–7'},
  {id:'frequency',topic:'chance',name:'Relative Frequency',description:'Run trials and compare results with predictions.',grades:'6'}
];
export const bonusGames = [
  {id:'starcatch',name:'Star Catch',description:'Catch eight targets with a click, tap or key.'},
  {id:'memoryflash',name:'Memory Flash',description:'Watch, remember and replay a growing sequence.'},
  {id:'targetpractice',name:'Target Practice',description:'Find six targets and practise quick reactions.'}
];
export const getActivity = id => activities.find(activity => activity.id === id);
export const getTopic = id => topics.find(topic => topic.id === id);
export const inTopic = id => activities.filter(activity => activity.topic === id);
