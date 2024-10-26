import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { BackButton } from '@/shared/components/CustomButton'

const Verifyshop = () => {
  return (
    <div>
      <form action=''>
        <div className='w-[1200px] m-auto'>
          {/* Back Button */}
          <BackButton containerStyle='my-8'/>

          {/* Shop Address */}
          <div className='flex flex-col items-center'>
            <div className='shadow-xl w-[1200px] h-[400px] flex flex-col justify-center items-center'>
              <div className='w-[90%] h-1/5 flex justify-start items-center border-b'>
                <p className='text-2xl font-semibold'>Shop Address</p>
              </div>
              <div className='w-[90%] h-4/5 flex justify-start'>
                <div className='flex flex-col mt-4 w-1/2'>
                  <p className='text-lg'>Fill your shop address</p>
                  <div>
                    <div className='my-3'>
                      <TextField required label='Address' fullWidth />
                    </div>
                    <div className='flex flex-row'>
                      <div className='my-3 mr-3 w-1/2'>
                        <TextField required label='Ket / Tumbol' fullWidth />
                      </div>
                      <div className='my-3 ml-3 w-1/2'>
                        <TextField required label='Kwang / Umper' fullWidth />
                      </div>
                    </div>
                    <div className='flex flex-row'>
                      <div className='my-3 mr-3 w-1/2'>
                        <TextField required label='Province' fullWidth />
                      </div>
                      <div className='my-3 ml-3 w-1/2'>
                        <TextField required label='Postal Number' fullWidth />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-1/2 flex justify-center items-center'>
                  <div className='w-5/6 h-5/6 bg-gray-200 flex justify-center items-center'>
                    Input Image Zone
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className='flex flex-col items-center mt-12'>
            <div className='shadow-xl w-[1200px] h-[400px] flex flex-col justify-center items-center'>
              <div className='w-[90%] h-1/5 flex justify-start items-center border-b'>
                <p className='text-2xl font-semibold'>Owner Information</p>
              </div>
              <div className='w-[90%] h-4/5 flex justify-start'>
                <div className='flex flex-col mt-4 w-1/2'>
                  <p className='text-lg'>Fill your information</p>
                  <div>
                    <div className='my-3'>
                      <TextField required label='Name' fullWidth />
                    </div>
                    <div className='flex flex-row'>
                      <div className='my-3 mr-3 w-2/5'>
                        <TextField required label='Phone Number' fullWidth />
                      </div>
                      <div className='my-3 ml-3 w-3/5'>
                        <TextField required label='ID card number' fullWidth />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-1/2 flex justify-center items-center'>
                  <div className='w-5/6 h-5/6 bg-gray-200 flex justify-center items-center'>
                    Input Image Zone (ID card)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Detail */}
          <div className='flex flex-col items-center mt-12'>
            <div className='shadow-xl w-[1200px] h-[400px] flex flex-col justify-center items-center'>
              <div className='w-[90%] h-1/5 flex justify-start items-center border-b'>
                <p className='text-2xl font-semibold'>Product Detail</p>
              </div>
              <div className='w-[90%] h-4/5 flex justify-start'>
                <div className='flex flex-col justify-between mt-4 w-1/2'>
                  <p className='text-lg'>What did your shop do?</p>
                  <div className='mt-2'>
                    <div className='grid grid-cols-2'>
                      <FormControlLabel control={<Checkbox />} label='Suits' />
                      <FormControlLabel
                        control={<Checkbox />}
                        label='Wedding'
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label='Formal Dress'
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label='School Uniform'
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label='Cosplay'
                      />
                      <FormControlLabel control={<Checkbox />} label='Others' />
                    </div>
                  </div>

                  <div className='w-full h-1/3 mt-4'>
                    <TextField
                      label='Describe more about your product'
                      fullWidth
                    />
                  </div>
                </div>

                <div className='w-1/2 flex justify-center items-center'>
                  <div className='w-5/6 h-5/6 bg-gray-200 flex justify-center items-center'>
                    Input Image Zone (ID card)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit/Cancel */}
          <div className='w-full flex flex-row justify-between'>
            <div className='my-12 w-[45%] h-[60px] bg-red-500 flex justify-center items-center text-xl text-white rounded-lg'>
              <Link to={`/verifysent`}>
                <p>Submit Verification</p>
              </Link>
            </div>

            <div className='my-12 w-[45%] h-[60px] bg-black flex justify-center items-center text-xl text-white rounded-lg'>
              <Link to={`/`}>Cancel</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Verifyshop
