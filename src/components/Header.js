import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import Button from './Button'


const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && <Button text={showAdd ? "Close" : "Add"} color={showAdd ? "red" : "green"} onClick={onAdd} />}
        </header>
    )
}

Header.defaultProps = {
    title: "[Insert Project Name]"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
