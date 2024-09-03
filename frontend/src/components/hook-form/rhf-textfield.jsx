import PropTypes from 'prop-types'

const TextField = ({
  type = 'text',
  placeholder = '',
  name,
  register,
  className = '',
  error,
}) => {
  return (
    <>
      <input
        required
        type={type}
        placeholder={placeholder}
        {...register(name)}
        autoComplete='off'
        className={`w-full border rounded px-4 py-2 ${className}`}
      />
      {error && <p className='text-red-400 text-sm'>* {error.message}</p>}
    </>
  )
}

TextField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  className: PropTypes.string,
  // TODO: find better type
  error: PropTypes.any,
}

export default TextField
