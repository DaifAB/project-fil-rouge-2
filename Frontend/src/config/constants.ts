export const statusColor = {
  draft: 'gray',
  sent: 'blue',
  reviewing: 'warning',
  reviewed: 'warning',
  rejected: 'danger',
  signed: 'success',
};

export const ongoingStatus = ['draft', 'sent', 'reviewed', 'reviewing'];
export const closedStatus = ['rejected', 'signed'];

export const experiences = [
  {
    display: 'lessThanOneYear',
    value: '1',
  },
  {
    display: '1-2Years',
    value: '2',
  },
  {
    display: '2-5Years',
    value: '5',
  },
  {
    display: '5+Years',
    value: '5+',
  },
] as const;

export const mapStyle = 'mapbox://styles/mapbox/streets-v11';

export const kitchenTypes = ['hotel', 'restaurant', 'cloudKitchen', 'other'];
export const foodTypes = [
  'american',
  'arabic',
  'asian',
  'bowls',
  'burgers',
  'chinese',
  'desserts',
  'european',
  'fastFood',
  'french',
  'friedChicken',
  'greek',
  'indian',
  'international',
  'iranian',
  'juices',
  'korean',
  'lebanese',
  'mexican',
  'moroccan',
  'pasta',
  'poke',
  'salad',
  'seafood',
  'sliders',
  'spanish',
  'streetFood',
  'sushi',
  'thai',
  'turkish',
  'vegan',
  'wings',
  'wraps',
];
export const cookingLimitations = ['gluten', 'halal', 'dairyFree', 'vegan'];

export const days = [
  { name: 'monday', openingHours: [], isChecked: false },
  { name: 'tuesday', openingHours: [], isChecked: false },
  { name: 'wednesday', openingHours: [], isChecked: false },
  { name: 'thursday', openingHours: [], isChecked: false },
  { name: 'friday', openingHours: [], isChecked: false },
  { name: 'saturday', openingHours: [], isChecked: false },
  { name: 'sunday', openingHours: [], isChecked: false },
];
