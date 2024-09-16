import PropTypes from 'prop-types'
import { getDaysInMonths, MONTHS } from '@/util/time'

import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SelectRow = ({ setValue }) => {
  const now = new Date()

  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)
  const dayDisabled = !month || !year

  return (
    <div className='w-full grid grid-cols-5 gap-2'>
      <Select onValueChange={(gender) => setValue('gender', gender)}>
        <SelectTrigger className='w-full col-span-2'>
          <SelectValue placeholder='Gender' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='Male'>Male</SelectItem>
            <SelectItem value='Female'>Female</SelectItem>
            <SelectItem value='Other'>Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(date) => setValue('date', date)}
        disabled={dayDisabled}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Date' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from(
              {
                length: !dayDisabled ? getDaysInMonths(month, year) : 0,
              },
              (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              )
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(month) => {
          setValue('month', month)
          setMonth(month)
        }}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Month' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {MONTHS.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(year) => {
          setValue('year', year)
          setYear(year)
        }}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Year' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from({ length: now.getFullYear() - 1899 }, (_, i) => (
              <SelectItem key={i} value={(now.getFullYear() - i).toString()}>
                {now.getFullYear() - i}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectRow

SelectRow.propTypes = {
  setValue: PropTypes.func,
}
