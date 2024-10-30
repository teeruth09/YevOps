import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import {
  PrimaryButton,
  SecondaryButton,
} from '@/shared/components/CustomButton'

const ClientEditProfile = () => {
  // State to manage SelectItems
  const [selectItems, setSelectItems] = useState([
    { id: 'A', label: 'ขนาดตัวของนาย A' },
    { id: 'B', label: 'ขนาดตัวของนาย B' },
    { id: 'C', label: 'ขนาดตัวของนาย C' },
  ])
  // State to track editing state (optional)
  const [editingIndex, setEditingIndex] = useState(null)
  const [newItemLabel, setNewItemLabel] = useState('')

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-GB', options)
  }

  const [userInfo, setUserInfo] = useState({
    username: '',
    imageProfile:
      'https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain',
    firstname: '',
    lastname: '',
    birthdate: '',
    phone: '',
    gender: '',
    address: '',
    clientSize: '',
    whoseSize: '',
    shirtLength: '45', //เสื้อยาว
    chestSize: '45', //รอบอก
    waistline: '45', //รอบเอว
    hip: '45', //สะโพก
    waistShirt: '45', //เอวเสื้อ
    hipShirt: '45', //สะโพกเสื้อ
    thigh: '45', //ต้นขา
    crotch: '45', //เป้า
    shoulder: '45', //ไหล่
    armLength: '45', //แขนยาว
    calf: '45', //น่องขา
    tipLeg: '45', //ปลายขา
    legLength: '45',
    upperArm: '45',
  })
  const [isEditing, setIsEditing] = useState(false)

  // client profile image
  const [isLoading, setIsLoading] = useState(true)
  const [newAvatarUrl, setNewAvatarUrl] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const hiddenImageInputRef = useRef(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()

      reader.onload = () => {
        setNewAvatarUrl(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('x-access-token')
      try {
        const response = await fetch('http://localhost:5555/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        }) // Replace with your API endpoint
        // Log raw response text
        const data = await response.json()
        setUserInfo({
          ...userInfo,
          username: data.username,
          imageProfile: data.imageProfile,
          firstname: data.firstname,
          lastname: data.lastname,
          birthdate: formatDate(data.birthdate),
          phone: data.phone,
          gender: data.gender,
          address: data.address,
          clientSize: data.clientSize._id,
          whoseSize: 'ขนาดตัวของ' + data.firstname,
          shirtLength: data.clientSize.shirtLength,
          chestSize: data.clientSize.chestSize,
          waistline: data.clientSize.waistline,
          hip: data.clientSize.hip,
          waistShirt: data.clientSize.waistShirt,
          hipShirt: data.clientSize.hipShirt,
          thigh: data.clientSize.thigh,
          crotch: data.clientSize.crotch,
          shoulder: data.clientSize.shoulder,
          armLength: data.clientSize.armLength,
          calf: data.clientSize.calf,
          tipLeg: data.clientSize.tipLeg,
          legLength: data.clientSize.legLength,
          upperArm: data.clientSize.upperArm,
        })
        setNewAvatarUrl(data.imageProfile)

        // console.log("Hello",data);
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const updateUserInfo = async () => {
    const token = localStorage.getItem('x-access-token')
    // console.log("token", token);
    const formData = new FormData()

    if (!token) {
      console.error('Token is missing in local storage.')
      return
    }
    if (avatarFile) formData.append('image', avatarFile)

    // Append userInfo properties to formData
    Object.entries(userInfo).forEach(([key, value]) => {
      formData.append(key, value)
    })
    // send formData instead with userInfo too
    try {
      const response = await fetch('http://localhost:5555/profile', {
        method: 'PUT',
        headers: {
          'x-access-token': token,
        },
        body: formData, // Use formData as the body
      })
      const data = await response.json()
      if (response.ok) {
        console.log('Updated user info:', data)
      } else {
        console.error('Failed to update user info:', data)
      }
    } catch (error) {
      console.error('Error updating user info:', error)
    }
  }

  const handleChange = (e) => {
    // console.log("Field changed:", e.target.name, "New value:", e.target.value);
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    // Optionally, you can reset the changes here if needed
  }
  const handleSaveClick = () => {
    //update profile
    if (isEditing) {
      updateUserInfo()
      setIsEditing(false) // Disable editing mode after saving
    }
  }

  const handleAddSize = () => {
    // Add a new item
    const newItem = {
      id: `New-${selectItems.length}`,
      label: `ขนาดตัวใหม่ ${selectItems.length + 1}`,
    }
    setSelectItems([...selectItems, newItem])
  }

  const handleDeleteSize = (index) => {
    // Delete the selected item
    const updatedItems = selectItems.filter((_, idx) => idx !== index)
    setSelectItems(updatedItems)
  }

  const handleEditSize = (index) => {
    // Set the index for editing
    setEditingIndex(index)
    setNewItemLabel(selectItems[index].label)
  }

  const handleSaveEditSize = () => {
    // Save the edited item
    const updatedItems = selectItems.map((item, idx) =>
      idx === editingIndex ? { ...item, label: newItemLabel } : item
    )
    setSelectItems(updatedItems)
    setEditingIndex(null)
  }

  return (
    <div className='px-5 lg:px-20'>
      <div className='py-3 text-3xl font-semibold mb-4'>Profile</div>
      <div className='w-full lg:w-auto h-full bg-white shadow-xl p-5 lg:p-10'>
        <div className='Profiledetail'>
          <div className='flex flex-col lg:flex-row'>
            <div
              className={cn(
                'w-32 h-32 lg:w-48 lg:h-48 bg-gray-300',
                isLoading && 'animate-pulse'
              )}
            >
              <img
                src={newAvatarUrl ?? userInfo?.imageProfile}
                alt='profile.jpg'
                className={cn(
                  'w-32 h-32 lg:w-48 lg:h-48',
                  isEditing && 'cursor-pointer'
                )}
                // when this img is clicked, the input below is clicked instead
                onClick={() => hiddenImageInputRef.current?.click()}
              />
            </div>

            <input
              required
              ref={hiddenImageInputRef}
              id='avatar'
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              disabled={!isEditing}
              className='hidden'
            />
            <div className='pt-5 lg:pt-0 lg:pl-5'>
              <div className='text-2xl font-bold'>
                {userInfo?.username ? userInfo.username : 'My Name'}
              </div>
              <div className='flex flex-col lg:flex-row'>
                <div className='name'>
                  <p>Firstname</p>
                  <input
                    name='firstname'
                    type='text'
                    value={userInfo.firstname}
                    className='border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0'
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className='lg:pl-10'>
                  <p>Lastname</p>
                  <input
                    name='lastname'
                    type='text'
                    value={userInfo.lastname}
                    className='border border-gray-300 rounded-xl h-10 px-5'
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className='flex flex-col lg:flex-row pt-3'>
                <div className='mb-4 lg:mb-0'>
                  <p>Date of Birth</p>
                  <input
                    name='birthdate'
                    type='text'
                    value={userInfo.birthdate}
                    className='border border-gray-300 rounded-xl h-10 px-5'
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className='lg:pl-10 mb-4 lg:mb-0'>
                  <p>Phone Number</p>
                  <input
                    name='phone'
                    type='text'
                    value={userInfo.phone}
                    className='border border-gray-300 rounded-xl h-10 px-5'
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className='lg:pl-10'>
                  <p>Gender</p>
                  <input
                    name='gender'
                    type='text'
                    value={userInfo.gender}
                    className='border border-gray-300 rounded-xl h-10 px-5'
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='pt-6'>
            <p>Home No, Room No, Apartment/Village Name, Sub-District </p>
            <input
              name='address'
              type='text'
              value={userInfo.address}
              className='border border-gray-300 rounded-xl h-10 w-full px-5'
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className='flex flex-col lg:flex-row pt-6 lg:pt-16 items-center'>
            <>
              <p className='flex-auto lg:w-24'>Size Profile</p>
              <div className='select-user w-full lg:w-auto'>
                <div className='lg:pl-8 '>
                  <Select>
                    <SelectTrigger className='w-96 col-span-2'>
                      <SelectValue placeholder={userInfo.whoseSize} />
                    </SelectTrigger>
                    {/* <SelectContent>
                        <SelectGroup>
                          <SelectItem value="A">ขนาดตัวของนาย A</SelectItem>
                          <SelectItem value="B">ขนาดตัวของนาย B</SelectItem>
                          <SelectItem value="C">ขนาดตัวของนาย C</SelectItem>
                        </SelectGroup>
                      </SelectContent> */}
                  </Select>
                </div>
              </div>
            </>
          </div>
          <div className='flex flex-col lg:flex-row pt-3'>
            <div className='flex-1 mb-4 lg:mb-0'>เสื้อ</div>
            <div className='flex-1 lg:pl-10'>กางเกง</div>
          </div>
          <div className='flex flex-col lg:flex-row pt-3'>
            <div className='mb-4 lg:mb-0'>
              <p>เสื้อยาว</p>
              <input
                name='shirtLength'
                type='text'
                value={userInfo.shirtLength}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10 mb-4 lg:mb-0'>
              <p>รอบอก</p>
              <input
                name='chestSize'
                type='text'
                value={userInfo.chestSize}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10 mb-4 lg:mb-0'>
              <p>รอบเอว</p>
              <input
                name='waistline'
                type='text'
                value={userInfo.waistline}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10'>
              <p>สะโพก</p>
              <input
                name='hip'
                type='text'
                value={userInfo.hip}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row pt-3'>
            <div className='mb-4 lg:mb-0'>
              <p>เอวเสื้อ</p>
              <input
                name='waistShirt'
                type='text'
                value={userInfo.waistShirt}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10 mb-4 lg:mb-0'>
              <p>สะโพกเสื้อ</p>
              <input
                name='hipShirt'
                type='text'
                value={userInfo.hipShirt}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10 mb-4 lg:mb-0'>
              <p>ต้นขา</p>
              <input
                name='thigh'
                type='text'
                value={userInfo.thigh}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10'>
              <p>เป้า</p>
              <input
                name='crotch'
                type='text'
                value={userInfo.crotch}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row pt-3'>
            <div className='mb-4 lg:mb-0'>
              <p>ไหล่</p>
              <input
                name='shoulder'
                type='text'
                value={userInfo.shoulder}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10 mb-4 lg:mb-0'>
              <p>แขนยาว</p>
              <input
                name='armLength'
                type='text'
                value={userInfo.armLength}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10 mb-4 lg:mb-0'>
              <p>น่องขา</p>
              <input
                name='calf'
                type='text'
                value={userInfo.calf}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-10'>
              <p>ปลายขา</p>
              <input
                name='tipLeg'
                type='text'
                value={userInfo.tipLeg}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row pt-3'>
            <div className='mb-4 lg:mb-0'>
              <p>ต้นแขน</p>
              <input
                name='legLength'
                type='text'
                value={userInfo.legLength}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className='lg:pl-[300px] mb-4 lg:mb-0'>
              <p>ความยาว</p>
              <input
                name='upperArm'
                type='text'
                value={userInfo.upperArm}
                className='border border-gray-300 rounded-xl h-10 px-5'
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row pt-10 items-center'>
            {!isEditing ? (
              // <button
              //   onClick={handleEditClick}
              //   className='w-full lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded'
              // >
              //   Edit
              // </button>

              <PrimaryButton onClick={handleEditClick}>Edit</PrimaryButton>
            ) : (
              <div className='w-full flex flex-col gap-4'>
                <SecondaryButton onClick={handleCancelClick}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={handleSaveClick}>Save</PrimaryButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientEditProfile
