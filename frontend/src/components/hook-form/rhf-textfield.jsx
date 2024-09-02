import PropTypes from 'prop-types'

const TextField = ({
  type = 'text',
  placeholder = '',
  name,
  register,
  className = '',
}) => {
  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      {...register(name)}
      autoComplete='off'
      className={`border rounded px-4 py-2 ${className}`}
    />
  )
}

TextField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default TextField
