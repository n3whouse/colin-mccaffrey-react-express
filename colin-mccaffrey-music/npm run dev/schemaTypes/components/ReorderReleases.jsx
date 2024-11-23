// ReorderReleases.js
import React, {useEffect, useState} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import client from '../../../src/sanity/client'

const ReorderReleases = ({onChange}) => {
  const [releases, setReleases] = useState([])

  useEffect(() => {
    const fetchReleases = async () => {
      const data = await client.fetch(`*[_type == 'release'] | order(order asc) {
        _id,
        releaseTitle,
        order,
      }`)
      setReleases(data)
    }
    fetchReleases()
  }, [])

  const onDragEnd = async (result) => {
    if (!result.destination) return

    const reorderedReleases = Array.from(releases)
    const [movedItem] = reorderedReleases.splice(result.source.index, 1)
    reorderedReleases.splice(result.destination.index, 0, movedItem)

    // Update the order in Sanity
    await Promise.all(
      reorderedReleases.map((release, index) =>
        client
          .patch(release._id)
          .set({order: index + 1})
          .commit(),
      ),
    )

    setReleases(reorderedReleases)
    onChange(reorderedReleases) // Notify parent component of the change
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {releases.map((release, index) => (
              <Draggable key={release._id} draggableId={release._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      padding: '8px',
                      border: '1px solid #ccc',
                      marginBottom: '4px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                    }}
                  >
                    {release.releaseTitle}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ReorderReleases
