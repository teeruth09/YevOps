import PropTypes from 'prop-types'

// This is an rhf-textfield
const TextField = ({
  type = 'text',
  placeholder = '',
  name,
  register,
  className = '',
  error,
}) => {
  return (
    <div className='w-full'>
      <input
        required
        type={type}
        placeholder={placeholder}
        // use register only if it is passed (optional)
        {...(register ? register(name) : {})}
        autoComplete='off'
        className={`w-full border rounded px-4 py-2 ${className}`}
      />
      {error && <p className='text-red-400 text-sm mt-1'>* {error.message}</p>}
    </div>
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
