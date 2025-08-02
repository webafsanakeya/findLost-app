import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdateCampModal from '@/components/Modal/UpdateCampModal'

const CampDataRow = ({ camp, onChange }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const {
    _id,
    image,
    campName,
    location,
    dateTime,
    participantCount = 0,
  } = camp || {}

  const openDeleteModal = () => setIsDeleteOpen(true)
  const closeDeleteModal = () => setIsDeleteOpen(false)
  const openEditModal = () => setIsEditModalOpen(true)

  return (
    <tr>
      {/* Camp Image */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <img
              alt='camp'
              src={image || 'https://via.placeholder.com/60'}
              className='mx-auto object-cover rounded h-10 w-15'
            />
          </div>
        </div>
      </td>

      {/* Camp Name */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{campName}</p>
      </td>

      {/* Location */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{location}</p>
      </td>

      {/* Date */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{dateTime}</p>
      </td>

      {/* Available Slots */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{participantCount}</p>
      </td>

      {/* Delete Button */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={openDeleteModal}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </button>

        <DeleteModal
          isOpen={isDeleteOpen}
          closeModal={closeDeleteModal}
          campId={_id}
          onDeleteSuccess={onChange}
        />
      </td>

      {/* Update Button */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={openEditModal}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </button>

        <UpdateCampModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          camp={camp}
          onUpdateSuccess={onChange}
        />
      </td>
    </tr>
  )
}

export default CampDataRow
