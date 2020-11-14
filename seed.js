const { db, Resort } = require('./server/db');

const resorts = [
  {
    resortName: 'Hunter Mountain',
    location: [-74.2246, 42.2029],
    state: 'New York',
  },
  {
    resortName: 'Wildcat Mountain',
    location: [-71.2393, 44.2641],
    state: 'New Hampshire',
  },
  {
    resortName: 'Mount Sunapee',
    location: [-72.0742, 43.3136],
    state: 'New Hampshire',
  },
  {
    resortName: 'Jack Frost / Big Boulder',
    location: [-75.6563, 41.1092],
    state: 'Pennsylvania',
  },
  {
    resortName: 'Whitetail Resort',
    location: [-77.9333, 39.7418],
    state: 'Pennsylvania',
  },
  {
    resortName: 'Roundtop Mountain Resort',
    location: [-76.9275, 40.1095],
    state: 'Pennsylvania',
  },
  {
    resortName: 'Attitash Mountain Resort',
    location: [-71.2294, 44.0828],
    state: 'New Hampshire',
  },
  {
    resortName: 'Crotched Mountain',
    location: [-71.8737, 42.9984],
    state: 'New Hampshire',
  },
  {
    resortName: 'Liberty Mountain Resort',
    location: [-77.3755, 39.7637],
    state: 'Pennsylvania',
  },
  {
    resortName: 'Okemo',
    location: [-72.7170, 43.4018],
    state: 'Vermont',
  },
  {
    resortName: 'Mount Snow',
    location: [-72.9204, 42.9602],
    state: 'Vermont',
  },
  {
    resortName: 'Stowe',
    location: [-72.6874, 44.4654],
    state: 'Vermont',
  },
  {
    resortName: 'Breckenridge Ski Resort',
    location: [-106.0667, 39.4803],
    state: 'Colorado',
  },
  {
    resortName: 'Beaver Creek Resort',
    location: [-106.5167, 39.6043],
    state: 'Colorado',
  },
  {
    resortName: 'Park City Mountain Resort',
    location: [-111.5080, 40.6514],
    state: 'Utah',
  },
  {
    resortName: 'Spirit Mountain',
    location: [-92.2167, 46.7183],
    state: 'Minnesota',
  },
  {
    resortName: 'Vail Ski Resort',
    location: [-106.3550, 39.6061],
    state: 'Colorado',
  },
  {
    resortName: 'Whistler Blackcomb',
    location: [-122.9486, 50.1150],
    state: 'British Columbia',
  },
  {
    resortName: 'Keystone Ski Resort',
    location: [-105.9437, 39.6084],
    state: 'Colorado',
  },
  {
    resortName: 'Heavenly Mountain Resort',
    location: [-119.9399, 38.9353],
    state: 'California',
  },
  {
    resortName: 'Northstar California Resort',
    location: [-120.1211, 39.2746],
    state: 'California',
  },
  {
    resortName: 'Kirkwood Ski Resort',
    location: [-120.0652, 38.6848],
    state: 'California',
  },
  {
    resortName: 'Wilmot Mountain Resort',
    location: [-88.1867, 42.5000],
    state: 'Wisconsin',
  },
  {
    resortName: 'Afton Alps Resort',
    location: [-92.7878, 44.8577],
    state: 'Minnesota',
  },
  {
    resortName: 'Mt. Brighton Ski Resort',
    location: [-83.8115, 42.5408],
    state: 'Michigan',
  },
  {
    resortName: 'Crested Butte Ski Resort',
    location: [-106.9658, 38.8991],
    state: 'Colorado',
  },
  {
    resortName: 'Stevens Pass Mountain',
    location: [-121.0890, 47.7448],
    state: 'Washington',
  },
  {
    resortName: 'Alpine Valley',
    location: [-88.4337, 42.7377],
    state: 'Ohio',
  },
  {
    resortName: 'Boston Mills and Brandywine',
    location: [-81.5632, 41.2641],
    state: 'Ohio',
  },
  {
    resortName: 'Mad River Mountain',
    location: [-83.6778, 40.3181],
    state: 'Ohio',
  },
  {
    resortName: 'Hidden Valley Ski Resort',
    location: [-90.6507, 38.5353],
    state: 'Missouri',
  },
  {
    resortName: 'Snow Creek Ski Area',
    location: [-94.9707, 39.4673],
    state: 'Missouri',
  },
  {
    resortName: 'Paoli Peaks Mountain Resort',
    location: [-86.5122, 38.5556],
    state: 'Indiana',
  },
  {
    resortName: 'Telluride Ski Resort',
    location: [-107.8382, 37.9129],
    state: 'Colorado',
  },
  {
    resortName: 'Sun Valley Resort',
    location: [-114.3543, 43.6949],
    state: 'Idaho',
  },
  {
    resortName: 'Snowbasin Resort',
    location: [-111.8533, 41.2131],
    state: 'Utah',
  },
  {
    resortName: 'Fernie Alpine Resort',
    location: [-115.0866, 49.4639],
    state: 'British Columbia',
  },
  {
    resortName: 'Kicking Horse Mountain Resort',
    location: [-117.0483, 51.2976],
    state: 'British Columbia',
  },
  {
    resortName: 'Kimberly Alpine Resort',
    location: [-116.0044, 49.6880],
    state: 'British Columbia',
  },
  {
    resortName: 'Nakiska Ski Area',
    location: [-115.1511, 50.9427],
    state: 'Alberta',
  },
  {
    resortName: 'Stoneham Mountain Resort',
    location: [-71.3930, 47.0304],
    state: 'Quebec',
  },
  {
    resortName: 'Mont-Sainte-Anne',
    location: [-66.4892, 49.1245],
    state: 'Quebec',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all([
      Resort.bulkCreate(resorts),
    ]);
    await db.close();
    console.log('seeded');
  } catch (err) {
    console.log(err);
  }
};

seed();

module.exports = resorts;
