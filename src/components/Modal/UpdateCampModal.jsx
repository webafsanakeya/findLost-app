import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const UpdateCampModal = ({ isOpen, setIsEditModalOpen, camp, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    campName: camp?.campName || '',
    location: camp?.location || '',
    dateTime: camp?.dateTime || '',
    fees: camp?.fees || '',
    participantCount: camp?.participantCount || 0,
    doctor: camp?.doctor || '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/camp/${camp._id}`,
        formData,
        {
          withCredentials: true,
        }
      )

      if (res.status === 200 && res.data.modifiedCount > 0) {
        toast.success('Camp updated successfully!')
        onUpdateSuccess?.()
        setIsEditModalOpen(false)
      } else {
        toast.error('Update failed. No changes were made.')
      }
    } catch (err) {
      toast.error('Server error while updating')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setIsEditModalOpen(false)}>
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl">
            <DialogTitle className="text-lg font-semibold text-gray-900 mb-4">Update Camp</DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="campName"
                value={formData.campName}
                onChange={handleChange}
                placeholder="Camp Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                placeholder="Date & Time"
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="Camp Fees"
                type="number"
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="participantCount"
                value={formData.participantCount}
                onChange={handleChange}
                placeholder="Participant Count"
                type="number"
                className="w-full border p-2 rounded"
              />
              <input
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                placeholder="Doctor Name"
                className="w-full border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Camp'}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateCampModal
