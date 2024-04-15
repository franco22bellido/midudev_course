const LogOut = ({ setUser, setToken }) => {

    const handleLogOut = () => {
        setToken(null)
        setUser(null)
        window.localStorage.removeItem('USER_LOCAL_STORAGE')
    }

    return (
        <button onClick={() => handleLogOut()}>
            LogOut
        </button>
    )
}

export default LogOut
