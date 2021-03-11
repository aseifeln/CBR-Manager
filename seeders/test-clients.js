'use strict';
const faker = require('faker');

const disabilities = ['Amputee', 'Polio', 'Spinal Cord Injury', 'Cerebral Palsy', 'Spina Bifida', 'Hydrocephalus', 'Visual Impairment',
  'Hearing Impairment', 'Don\'t Know', 'Other'];
const locations = ['BidiBidi Zone 1', 'BidiBidi Zone 2', 'BidiBidi Zone 3', 'BidiBidi Zone 4', 'BidiBidi Zone 5', 'Palorinya Basecamp',
  'Palorinya Zone 1', 'Palorinya Zone 2', 'Palorinya Zone 3'];
const statuses = ['Critical Risk', 'High Risk', 'Medium Risk', 'Low Risk'];
const num_villages = 6;
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
        "Gender": genders[randomInt(0,2)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumberFormat(),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 80),
        "DisabilityType": `{${disabilities[randomInt(0, disabilities.length)]}}`,
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "HealthGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Priority": randomInt(0, 10)
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,2)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumberFormat(),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 80),
        "DisabilityType": `{${disabilities[randomInt(0, disabilities.length)]}}`,
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "HealthGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Priority": randomInt(0, 10)
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,2)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumberFormat(),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 80),
        "DisabilityType": `{${disabilities[randomInt(0, disabilities.length)]}}`,
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "HealthGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Priority": randomInt(0, 10)
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,2)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumberFormat(),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 80),
        "DisabilityType": `{${disabilities[randomInt(0, disabilities.length)]}}`,
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "HealthGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Priority": randomInt(0, 10)
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,2)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumberFormat(),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 80),
        "DisabilityType": `{${disabilities[randomInt(0, disabilities.length)]}}`,
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "HealthGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Priority": randomInt(0, 10)
      },
      {
        "FirstName": faker.name.firstName(),
        "LastName":  faker.name.lastName(),
        "DateCreated": faker.date.recent(),
        "Gender": genders[randomInt(0,2)],
        "Location": locations[randomInt(0, locations.length)],
        "ContactNo": faker.phone.phoneNumberFormat(),
        "VillageNo": randomInt(1, num_villages),
        "Age": randomInt(1, 80),
        "DisabilityType": `{${disabilities[randomInt(0, disabilities.length)]}}`,
        "GPSLocation": "",
        "Consent": "Y",
        "CaregiverState": "Y",
        "Photo": ";adfjka;dsfljk",
        "CaregiverContactNo": "",
        "HealthStatus": statuses[randomInt(0, statuses.length)],
        "HealthDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "HealthGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationStatus": statuses[randomInt(0, statuses.length)],
        "EducationDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "EducationGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialStatus": statuses[randomInt(0, statuses.length)],
        "SocialDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "SocialGoal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Priority": randomInt(0, 10)
      },
    ]);
  },


    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Visit', null, {});
      await queryInterface.bulkDelete('HealthForm', null, {});
      await queryInterface.bulkDelete('EducationForm', null, {});
      await queryInterface.bulkDelete('SocialForm', null, {});
      await queryInterface.bulkDelete('Client', null, {});
      await queryInterface.bulkDelete('User', null, {});
      await queryInterface.bulkDelete('Worker', null, {});
  }
};