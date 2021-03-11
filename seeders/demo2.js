'use strict';
const faker = require('faker');
const fs = require('fs');
const uuid = require('uuid');

const locations = ['BidiBidi Zone 1', 'BidiBidi Zone 2', 'BidiBidi Zone 3', 'BidiBidi Zone 4', 'BidiBidi Zone 5', 'Palorinya Basecamp',
  'Palorinya Zone 1', 'Palorinya Zone 2', 'Palorinya Zone 3'];
const num_villages = 6;

// These are set instead of generated for easy Postman Testing
const worker1_uuidv4 = '7b2aff58-60fb-4f42-aa3b-21760ed4c134';
const worker2_uuidv4 = '53e996ff-6c85-4e3e-b7c8-ff31edd93239';
const admin_uuidv4 = 'd6ef8378-3956-403a-ac4b-50a714c742a0';

// Source: https://depositphotos.com/vector-images/default-profile-picture.html
const default_profile = fs.readFileSync('./image/default-profile.jpg');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let seedClients = [
    {
      Client: {
        ClientId: 1,
        WorkerId: worker1_uuidv4,
        FirstName: 'Filbert',
        LastName:  'Olayinka',
        DateCreated: faker.date.recent(),
        Gender: 'Male',
        Location: locations[0],
        ContactNo: faker.phone.phoneNumberFormat(),
        VillageNo: randomInt(1, num_villages),
        Age: 28,
        DisabilityType: `{${['Amputee']}}`,
        GPSLocation: '',
        Consent: 'Y',
        CaregiverState: 'Y',
        Photo: default_profile,
        CaregiverContactNo: faker.phone.phoneNumberFormat(),
        HealthStatus: 'Critical Risk',
        HealthDesc: 'They require a prosthetic due to missing left leg above the knee.',
        HealthGoal: 'Acquire a wheelchair.',
        EducationStatus: 'Critical Risk',
        EducationDesc: 'Unable to read and write.',
        EducationGoal: 'Get enrolled at adult education center?',
        SocialStatus: 'Low Risk',
        SocialDesc: 'Part of the community and has caretaker.',
        SocialGoal: 'Maintain status.',
        Priority: randomInt(0, 10)
      },
      Visits: [
        {
          ClientId: null,
          WorkerId: worker1_uuidv4,
          VisitId: uuid.v4(),
          HealthForm: {
            HealthFormId: uuid.v4(),
            Wheelchair: 'Wheelchair was provided.',
            Advice: 'Focus on getting around on your own.',
            Encouragement: 'He is excited to get comfortable with his wheelchair',
            GoalMet: 'Concluded',
            ConcludedOutcome: 'Acquired Wheelchair',
          },
          EducationForm: {
            EducationFormId: uuid.v4(),
            OrganizationReferral: 'Created a referral to a local adult eduction centre.',
            GoalMet: 'Ongoing',
          },
          SocialForm: {
            SocialFormId: uuid.v4(),
            Advice: 'Keep up the good work!',
            GoalMet: 'Ongoing',
          },
          VisitPurpose: 'CBR',
          GPSLocation: 0,
          Date: faker.date.recent(),
          Location: locations[0],         // Are visits Limited to the same location as the client?
          VillageNumber: randomInt(1, num_villages),
        },
      ],
      Referrals: [
        {
          ClientId: null,
          WorkerId: worker1_uuidv4,
          PhysiotherapyService: {
            PhysiotherapyServiceId: uuid.v4(),
            Photo: default_profile,
            ClientCondition: null,
          },
          ProstheticService: {
            ProstheticServiceId: uuid.v4(),
            Photo: default_profile,
            InjuryPosition: 'Above knee',
          },
          OrthoticService: {
            OrthoticServiceId: uuid.v4(),
            Photo: default_profile,
            InjuryPosition: 'Above elbow',
          },
          WheelchairService: {
            WheelchairServiceId: uuid.v4(),
            Photo: default_profile,
            ClientProficiency: 'Basic',
            ClientHipWidth: 10,
            WheelchairExist: 'Y',
          },
          ReferralId: uuid.v4(),
          Date: faker.date.recent(),
          ServiceRequired: `{${['Wheelchair']}}`,
          ReferTo: 'Disability Center',
          Status: 'Resolved',
          Outcome: 'They got the wheelchair',
        },
      ],
    },
  // Add new Clients Here
]



module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Create Workers and associated User accounts
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

    // Add clients and associated visits and referrals
    for (let i = 0; i < seedClients.length; i++) {

      const clients = await queryInterface.bulkInsert('Client', [
        seedClients[i].Client,
      ], { returned: ['ClientId'] });

      for (let j = 0; j < seedClients[i].Visits.length; j++) {

        await queryInterface.bulkInsert('HealthForm', [
          seedClients[i].Visits[j].HealthForm,

        ]);

        await queryInterface.bulkInsert('EducationForm', [
          seedClients[i].Visits[j].EducationForm,

        ]);

        await queryInterface.bulkInsert('SocialForm', [
          seedClients[i].Visits[j].SocialForm,

        ]);

        await queryInterface.bulkInsert('Visit', [
          {
            ClientId: seedClients[i].Client.ClientId,
            WorkerId: seedClients[i].Visits[j].WorkerId,
            VisitId: seedClients[i].Visits[j].VisitId,
            HealthFormId: seedClients[i].Visits[j].HealthForm.HealthFormId,
            EducationFormId: seedClients[i].Visits[j].EducationForm.EducationFormId,
            SocialFormId: seedClients[i].Visits[j].SocialForm.SocialFormId,
            VisitPurpose: seedClients[i].Visits[j].VisitPurpose,
            GPSLocation: seedClients[i].Visits[j].GPSLocation,
            Date: seedClients[i].Visits[j].Date,
            Location: seedClients[i].Client.Location,
            VillageNumber: Number(seedClients[i].Client.VillageNo),
          },
        ]);
      }

      for (let j = 0; j < seedClients[i].Referrals.length; j++) {

        await queryInterface.bulkInsert('PhysiotherapyService', [
          {
            PhysiotherapyServiceId: seedClients[i].Referrals[j].PhysiotherapyService.PhysiotherapyServiceId,
            Photo: seedClients[i].Referrals[j].PhysiotherapyService.Photo,
            ClientCondition: seedClients[i].Client.DisabilityType,
          },

        ]);

        await queryInterface.bulkInsert('ProstheticService', [
          seedClients[i].Referrals[j].ProstheticService,

        ]);

        await queryInterface.bulkInsert('OrthoticService', [
          seedClients[i].Referrals[j].OrthoticService,

        ]);

        await queryInterface.bulkInsert('WheelchairService', [
          seedClients[i].Referrals[j].WheelchairService,
        ]);

        await queryInterface.bulkInsert('Referral', [
          {
            ClientId: seedClients[i].Client.ClientId,
            WorkerId: seedClients[i].Referrals[j].WorkerId,
            ProstheticServiceId: seedClients[i].Referrals[j].ProstheticService.ProstheticServiceId,
            ReferralId: seedClients[i].Referrals[j].ReferralId,
            Date: seedClients[i].Referrals[j].Date,
            ServiceRequired: seedClients[i].Referrals[j].ServiceRequired,
            ReferTo: seedClients[i].Referrals[j].ReferTo,
            Status: seedClients[i].Referrals[j].Status,
            Outcome: seedClients[i].Referrals[j].Outcome,
          },
        ]);

      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Referral', null, {});
    await queryInterface.bulkDelete('PhysiotherapyService', null, {});
    await queryInterface.bulkDelete('ProstheticService', null, {});
    await queryInterface.bulkDelete('OrthoticService', null, {});
    await queryInterface.bulkDelete('WheelchairService', null, {});
    await queryInterface.bulkDelete('Visit', null, {});
    await queryInterface.bulkDelete('HealthForm', null, {});
    await queryInterface.bulkDelete('EducationForm', null, {});
    await queryInterface.bulkDelete('SocialForm', null, {});
    await queryInterface.bulkDelete('Client', null, {});
    await queryInterface.bulkDelete('User', null, {});
    await queryInterface.bulkDelete('Worker', null, {});
  }
};

