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
