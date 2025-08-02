import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const DeleteModal = ({ closeModal, isOpen, campId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
     
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/camp/${campId}`,
        {
          withCredentials: true
        }
      )
      if (res.status === 200 || res.data?.success) {
  toast.success("Camp Deleted successfully!");
  onDeleteSuccess?.()
}else{
  toast.error("Failed to delete Camp, try again")
}
    } catch (err) {
      toast.error('Server error during deletion')
      console.error(err)
    }finally{
      setLoading(false)
      closeModal()
    }
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-10' onClose={closeModal}>
      <div className='fixed inset-0 bg-black/25 backdrop-blur-sm' aria-hidden='true' />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md bg-white p-6 shadow-xl rounded-2xl'>
            <DialogTitle className='text-lg font-semibold text-gray-900'>
              Confirm Deletion
            </DialogTitle>
            <div className='mt-3 text-sm text-gray-600'>
              Are you sure you want to delete this camp? <br />
              <span className='text-red-600'>This action cannot be undone.</span>
            </div>
            <div className='mt-6 flex justify-end gap-3'>
              <button
                onClick={handleDelete}
                disabled={loading}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50'
              >
                {loading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={closeModal}
                disabled={loading}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm'
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteModal
