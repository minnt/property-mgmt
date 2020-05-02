const propertiesData = {
  commercial: [],
  residential: [

    {
      id: 0,
      favorite: true,
      name: "Shady Oaks",
      addrLineOne: "555 Shady Dr",
      addrLineTwo: "Huntington, WV 25701",
      image: "",
      schedule: [
        {
          title: "Maintenance to unit 6: bees",
          priority: "important"
        }
      ],
      utilities: {
        power: "AEP",
        water: "American Water",
        gas: "Strickland",
        waste: "Rumpke",
        internet: "Comcast",
        sewage: "NYC Sewage",
        lawncare: "Lawns by Bill"
      },
      unitsAmount: 23,
      unitsVacant: 3,
      acquired: "June 3rd 2009",
      units: [
        {
          id: 0,
          unitNumber: 1,
          addrLineOne: "555 Shady Dr Apt. 1",
          addrLineTwo: "Huntington, WV 25701",
          sqFt: 2000,
          rent: 700,
          bedrooms: 2,
          bathrooms: 5,
          tenants: ["Bill", "Jane"],
          pets: false,
          keys: 2,
          maintenanceHistory: [
            {
              date: "03-04-20",
              issue: "Creaky stairs",
              technician: "Joe Moore",
              resolved: true,
              docs: []
            },
            {
              date: "03-20-20",
              issue: "Mold",
              technician: "Hank Hill",
              resolved: true,
              docs: []
            }
          ],
          maintenanceScheduled: []
        },
        {
          id: 1,
          unitNumber: 2,
          addrLineOne: "555 Shady Dr Apt. 2",
          addrLineTwo: "Huntington, WV 25701",
          sqFt: 2200,
          rent: 750,
          bedrooms: 2,
          bathrooms: 1,
          tenants: ["Harold", "Kumar"],
          pets: true,
          keys: 2,
          maintenanceHistory: [
            {
              date: "04-20-20",
              issue: "Ants",
              technician: "Dale of Dale's Dead Bug",
              resolved: true,
              docs: []
            }
          ],
          maintenanceScheduled: []
        }
      ]
    },
    {
      id: 1,
      favorite: false,
      name: "Boardwalk",
      addrLineOne: "1010 Monopoly St",
      addrLineTwo: "Beverly Hills, CA 90210",
      image: "",
      schedule: [],
      unitsAmount: 10,
      unitsVacant: 0,
      acquired: "",
      units: [
        {
          id: 0,
          unitNumber: 1,
          addrLineOne: "1010 Monopoly St Apt 1",
          addrLineTwo: "Beverly Hills, CA 90210",
          sqFt: 1800,
          rent: 500,
          bedrooms: 1,
          bathrooms: 1,
          tenants: ["Dale", "Nancy"],
          pets: false,
          keys: 2,
          maintenanceHistory: [
            {
              date: "03-04-20",
              issue: "Creaky stairs",
              technician: "Joe Moore",
              resolved: true,
              docs: []
            },
            {
              date: "03-20-20",
              issue: "Mold",
              technician: "Hank Hill",
              resolved: true,
              docs: []
            }
          ],
          maintenanceScheduled: []
        }
      ]
    }

  ]
}

export default propertiesData