export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const daysInMonths = {
    January: 31,
    February: 28, // 29 in a leap year
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
}

export const leapYear = (year) => {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

export const getDaysInMonths = (month, year) => {
  if (month === 'February' && leapYear(year)) {
    return 29
  }
  
  return daysInMonths[month]
}
