import { useContext } from 'react'
import NavLink from './Link'
import { RiDashboardFill, RiCoinsFill } from 'react-icons/ri'
import { MdSupportAgent } from 'react-icons/md'
import { BiLogOutCircle } from 'react-icons/bi'
import { AuthContext } from '../context/Authcontext'

const Sidebar = () => {
  const { logout } = useContext(AuthContext)
  return (
    <div className="sidebar">
      <nav>
        <NavLink href="/account">
          <a className="nav-link">
            <RiDashboardFill className="icon" />
            <span>Home</span>
          </a>
        </NavLink>
        <NavLink href="/account/transactions">
          <a className="nav-link">
            <RiCoinsFill className="icon" />
            <span>Transactions</span>
          </a>
        </NavLink>
        <NavLink href="/account/support">
          <a className="nav-link">
            <MdSupportAgent className="icon" />
            <span>Support</span>
          </a>
        </NavLink>
        <NavLink href="#">
          <a className="nav-link logout" onClick={() => logout()}>
            <BiLogOutCircle className="icon" />
            <span>Logout</span>
          </a>
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
