'use strict';
const faker = require('faker');

const disabilities = ['Amputee', 'Polio', 'Spinal Cord Injury', 'Cerebral Palsy', 'Spina Bifida', 'Hydrocephalus', 'Visual Impairment',
  'Hearing Impairment', 'Don\'t Know', 'Other'];
const locations = ['BidiBidi Zone 1', 'BidiBidi Zone 2', 'BidiBidi Zone 3', 'BidiBidi Zone 4', 'BidiBidi Zone 5', 'Palorinya Basecamp',
  'Palorinya Zone 1', 'Palorinya Zone 2', 'Palorinya Zone 3'];
const statuses = ['Critical Risk', 'High Risk', 'Medium Risk', 'Low Risk'];
const num_villages = 5;
const genders = ['Male', 'Female'];   // Please don't hurt me, its just for testing

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Client', [
    {
      "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,1)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumber("111-111-1111"),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 99),
        "DisabilityType": disabilities[randomInt(0, disabilities.length)],
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Amazing!",
        "HealthGoal": "Even better",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "I'm dumb",
        "EducationGoal": "Be smarterest",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "d",
        "SocialGoal": "d"
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,1)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumber("111-111-1111"),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 99),
        "DisabilityType": disabilities[randomInt(0, disabilities.length)],
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Amazing!",
        "HealthGoal": "Even better",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "I'm dumb",
        "EducationGoal": "Be smarterest",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "d",
        "SocialGoal": "d"
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,1)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumber("111-111-1111"),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 99),
        "DisabilityType": disabilities[randomInt(0, disabilities.length)],
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Amazing!",
        "HealthGoal": "Even better",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "I'm dumb",
        "EducationGoal": "Be smarterest",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "d",
        "SocialGoal": "d"
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,1)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumber("111-111-1111"),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 99),
        "DisabilityType": disabilities[randomInt(0, disabilities.length)],
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Amazing!",
        "HealthGoal": "Even better",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "I'm dumb",
        "EducationGoal": "Be smarterest",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "d",
        "SocialGoal": "d"
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,1)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumber("111-111-1111"),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 99),
        "DisabilityType": disabilities[randomInt(0, disabilities.length)],
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Amazing!",
        "HealthGoal": "Even better",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "I'm dumb",
        "EducationGoal": "Be smarterest",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "d",
        "SocialGoal": "d"
      }
    ]);
  },


    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Client', null, {});
  }
};