import React from 'react'
import { router } from 'dva'
import Settings from '@/static/icons/settings.svg'
import Calender from '@/static/icons/calender.svg'
import Trash from '@/static/icons/trash.svg'
import styles from './index.module.less'

const { NavLink } = router

interface Props {
  children: React.ReactNode
}

export default (props: Props) => {
  const { children } = props
  return (
    <div className={styles.sidebarLayout}>
      <aside className={styles.aside}>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/calender"
                exact
                className={styles.navItem}
                activeClassName={styles.active}
              >
                <i>
                  <Calender />
                </i>
                <span className={styles.label}>Calender</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trash"
                exact
                className={styles.navItem}
                activeClassName={styles.active}
              >
                <i>
                  <Trash />
                </i>
                <span className={styles.label}>Trash</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                exact
                className={styles.navItem}
                activeClassName={styles.active}
              >
                <i>
                  <Settings />
                </i>
                <span className={styles.label}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
