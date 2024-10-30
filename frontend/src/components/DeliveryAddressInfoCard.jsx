/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'

import { SecondaryButton } from '@/shared/components/CustomButton'

const DeliveryAddressInfoCard = ({
  client_name,
  client_phone,
  client_address,
  onChange,
  isChange = true,
}) => {
  return (
    <div className='mb-8 p-8 rounded-lg shadow-2xl bg-white'>
      <h3 className='font-bold text-2xl mb-8'>Delivery Address</h3>
      <hr className='mb-8' />
      <div>
        <input
          className='font-bold w-full'
          type='text'
          value={client_name}
          onChange={(e) => onChange('client_name', e.target.value)}
          placeholder='Name'
          disabled={!isChange}
        />
        <input
          className='w-full'
          type='text'
          value={client_phone}
          onChange={(e) => onChange('client_phone', e.target.value)}
          placeholder='Phone'
          disabled={!isChange}
        />
        <input
          className='w-full'
          type='text'
          value={client_address}
          onChange={(e) => onChange('client_address', e.target.value)}
          placeholder='Address'
          disabled={!isChange}
        />
      </div>
      
      <SecondaryButton className={cn('w-fit text-base px-12 mt-4', !isChange && 'hidden')}>
        Change
      </SecondaryButton>
    </div>
  )
}

export default DeliveryAddressInfoCard
