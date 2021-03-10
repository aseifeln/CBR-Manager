'use strict';
const faker = require('faker');
const fs = require('fs');

const disabilities = ['Amputee', 'Polio', 'Spinal Cord Injury', 'Cerebral Palsy', 'Spina Bifida', 'Hydrocephalus', 'Visual Impairment',
  'Hearing Impairment', 'Don\'t Know', 'Other'];
const locations = ['BidiBidi Zone 1', 'BidiBidi Zone 2', 'BidiBidi Zone 3', 'BidiBidi Zone 4', 'BidiBidi Zone 5', 'Palorinya Basecamp',
  'Palorinya Zone 1', 'Palorinya Zone 2', 'Palorinya Zone 3'];
const num_villages = 6;
const genders = ['Male', 'Female'];   // Please don't hurt me, its just for testing

// These are set instead of generated for easy Postman Testing
const worker1_uuidv4 = '7b2aff58-60fb-4f42-aa3b-21760ed4c134';
const worker2_uuidv4 = '53e996ff-6c85-4e3e-b7c8-ff31edd93239';
const admin_uuidv4 = 'd6ef8378-3956-403a-ac4b-50a714c742a0';

// Source: https://depositphotos.com/vector-images/default-profile-picture.html
const default_profile = fs.readFileSync('./image/default-profile.jpg');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Worker', [
      {
        WorkerId: worker1_uuidv4,
        FirstName: 'Worker1',
        LastName: 'One',
        Photo: '',
        Location: locations[0],
      },
      {
        WorkerId: worker2_uuidv4,
        FirstName: 'Worker2',
        LastName: 'Two',
        Photo: '',
        Location: locations[6],
      },
      {
        WorkerId: admin_uuidv4,
        FirstName: 'Admin',
        LastName: 'One',
        Photo: '',
        Location: locations[5],
      },
    ]);

    // Create matching Users for Workers
    await queryInterface.bulkInsert('User', [
      {
        WorkerId: worker1_uuidv4,
        Username: 'worker1',
        Password: 123456,
        Role: 'Worker'
      },
      {
        WorkerId: worker2_uuidv4,
        Username: 'worker2',
        Password: 123456,
        Role: 'Worker'
      },
      {
        WorkerId: admin_uuidv4,
        Username: 'admin',
        Password: 123456,
        Role: 'Admin'
      },
    ]);

    await queryInterface.bulkInsert('Client', [
      {
        FirstName: 'Filbert',
        LastName:  'Olayinka',
        DateCreated: faker.date.recent(),
        Gender: 'Male',
        Location: locations[0],
        ContactNo: faker.phone.phoneNumberFormat(),
        VillageNo: randomInt(1, num_villages),
        Age: 28,
        DisabilityType: disabilities[0],
        GPSLocation: '',
        Consent: 'Y',
        CaregiverState: 'Y',
        Photo: default_profile,
        CaregiverContactNo: faker.phone.phoneNumberFormat(),
        HealthStatus: 'Critical Risk',
        HealthDesc: 'They require a wheelchair due to missing left leg above the knee.',
        HealthGoal: 'Acquire a wheelchair.',
        EducationStatus: 'Critical Risk',
        EducationDesc: 'Unable to read and write.',
        EducationGoal: 'Get enrolled at adult education center?',
        SocialStatus: 'Low Risk',
        SocialDesc: 'Part of the community and has caretaker.',
        SocialGoal: 'Maintain status.',
        Priority: randomInt(0, 10)
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
    await queryInterface.bulkDelete('Worker', null, {});
    await queryInterface.bulkDelete('Client', null, {});
  }
};
