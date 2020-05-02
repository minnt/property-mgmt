import React from 'react'
import {Link} from 'react-router-dom'

import {Tooltip, Icon, Intent, Classes} from "@blueprintjs/core"

// import propertiesData from '../data/propertiesData'

export function generateMenu() {
  // let menuData = {
  //   'properties': {
  //     'commercial': [],
  //     'residential': []
  //   },
  //   'tenants': [],
  //   'documents': [],
  //   'budget': [],
  //   'services': []
  // }

  let menuData = ['Properties', 'Tenants', 'Documents', 'Budget', 'Service Providers']

  let treeNodes = []

  // Top level
  menuData.forEach((item, index) => {
    let entry = {
      id: index,
      icon: 'folder-close',
      label: item,
      childNodes: []
    }
    treeNodes.push(entry)
  })

  // Property link
  treeNodes[0].label = (
    <Link to='/all'>
      Property
    </Link>
  )

  // Properties: commercial and residential
  treeNodes[0].childNodes.push(
    {
      id: 0,
      icon: "folder-close",
      label: "Commercial",
      childNodes: []
    },
    {
      id: 1,
      icon: "folder-close",
      label: "Residential",
      childNodes: []
    }
  )

  // Tenants: commercial and residential
  treeNodes[1].childNodes.push(
    {
      id: 0,
      icon: "folder-close",
      label: "Commercial",
      childNodes: []
    },
    {
      id: 1,
      icon: "folder-close",
      label: "Residential",
      childNodes: []
    }
  )

  // Property names
  propertiesData.residential.forEach((property, index1) => {
    treeNodes[0].childNodes[1].childNodes.push(
      {
        id: index1,
        icon: "map-marker",
        label: (
          <Link to={`/property/${index1}`}>
            {property.name}
          </Link>
        ),
        childNodes: []
      }
    )
    // Unit numbers
    propertiesData.residential[index1].units.forEach((unit, index2) => {
      treeNodes[0].childNodes[1].childNodes[index1].childNodes.push(
        {
          id: index2,
          icon: "symbol-circle",
          label: (
            <Link to={`/property/${index1}/unit/${index2}`}>
              {`Unit ${unit.unitNumber}`}
            </Link>
          )
        }
      )
      unit.tenants.forEach((tenant, index3) => {
        treeNodes[1].childNodes[1].childNodes.push(
          {
            id: `${index1}_${index2}_${index3}`,
            icon: "person",
            label: tenant
          }
        )
      })
    })
  })

  console.log('Tree nav updated')
  return treeNodes
}


const nodesData = [
  {
    id: 0,
    hasCaret: true,
    icon: "folder-close",
    label: (
      <Link to="/all">
        Properties
      </Link>
    ),
    childNodes: [
      {
        id: 0,
        icon: "folder-close",
        label: "Commercial"
      },
      {
        id: 1,
        icon: "folder-close",
        label: "Residential",
        childNodes: [
          {
            id: 0,
            icon: "map-marker",
            label: (
              <Link to="/property/1">
                Shady Oaks
              </Link>
            ),
            secondaryLabel: (
              <Tooltip content="Favorite">
                <Icon icon="star" />
              </Tooltip>
            ),
            childNodes: [
              {
                id: 0,
                icon: "symbol-circle",
                label: (
                  <Link to="/unit/1">
                    Unit 1
                  </Link>
                )
              },
              {
                id: 1,
                icon: <Icon icon="symbol-circle" intent={Intent.DANGER} className={Classes.TREE_NODE_ICON} />,
                label: (
                  <Link to="/unit/2">
                    Unit 2
                  </Link>
                )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1,
    icon: "folder-close",
    label: "Tenants",
    childNodes: [
      {
        id: 0,
        icon: "folder-close",
        label: "Commercial"
      },
      {
        id: 1,
        icon: "folder-close",
        label: "Residential",
        childNodes: [
          {
            id: 0,
            icon: "person",
            label: (
              <Link to="/tenant/1">
                Hank Hill
              </Link>
            )
          }
        ]
      }
    ]
  },
  {
    id: 2,
    hasCaret: true,
    icon: "folder-close",
    label: "Documents",
    disabled: true
  },
  {
    id: 3,
    hasCaret: true,
    icon: "folder-close",
    label: "Budget",
    disabled: true
  },
  {
    id: 4,
    hasCaret: true,
    icon: "folder-close",
    label: "Service Providers",
    disabled: true
  }
]

export default nodesData