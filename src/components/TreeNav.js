import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'

import {Tree} from "@blueprintjs/core"

import {Context} from '../Context'

function TreeNav() {

  const {propertiesData} = useContext(Context)

  let nodesData = generateMenu(propertiesData)

  useEffect(() => {
    setNodes(generateMenu(propertiesData))
    console.log('UPDATE! Properties data has updated')
  }, [propertiesData])

  // Tree nav basic functions
  const [nodes, setNodes] = useState(nodesData)

  const handleNodeClick = (nodeData, _nodePath, e) => {
    const originallySelected = nodeData.isSelected
    if (!e.shiftKey) {
      forEachNode(nodes, n => (n.isSelected = false))
    }
    nodeData.isSelected = originallySelected == null ? true : !originallySelected

    const newState = [...nodes]
    newState[_nodePath] = nodeData
    setNodes(newState)
  }

  function handleNodeExpand(nodeData, _nodePath) {
    nodeData.isExpanded = true

    const newState = [...nodes]
    newState[_nodePath] = nodeData
    setNodes(newState)
  }

  function handleNodeCollapse(nodeData, _nodePath) {
    nodeData.isExpanded = false

    const newState = [...nodes]
    newState[_nodePath] = nodeData
    setNodes(newState)
  }

  function forEachNode(nodes, callback) {
    if (nodes == null) {
      return
    }

    for (const node of nodes) {
      callback(node)
      forEachNode(node.childNodes, callback)
    }
  }


  // Turn data into a format the tree nav can use
  function generateMenu(pData) {
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
    pData.residential.forEach((property, index1) => {

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
      pData.residential[index1].units.forEach((unit, index2) => {
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


  // Render
  return (
    <div className="width25">
      <Tree
        contents={nodes}
        onNodeClick={handleNodeClick}
        onNodeCollapse={handleNodeCollapse}
        onNodeExpand={handleNodeExpand}
      />
    </div>
  )
}

export default TreeNav