import PropTypes from 'prop-types'

const Button = ({ text, color, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}
            className="btn"
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    text: "CLICK ME",
    color: "red"
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
