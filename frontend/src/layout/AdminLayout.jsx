import {useState} from "react";
import styles from "./adminLayout.module.css";

import {ChevronDown, ChevronLeft, Menu, User} from "react-feather";
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../assets/react.svg";
import {sidebarMenuItems} from "../routes.js";
import {useAuth} from "../hooks/useAuth.js";
import {logout} from "../store/slices/authSlice.js";
import {useAppDispatch} from "../store/store.js";

const DashboardLayout = ({children}) => {
    const [open, setOpen] = useState(true);
    const [openDropDown, setOpenDropDown] = useState(false);
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const {can, user} = auth;
    const navigate = useNavigate();

    console.log("Rendering dashboard", {user})
    return (
        <>
            <main className={styles.sidebar_wrapper_container}>
                <section
                    className={`${
                        open ? styles.sidebar_container : styles.sidebar_container_close
                    }`}
                >
                    {!open ? (
                        <>
                            <Menu
                                className={styles.icon}
                                onClick={() => setOpen(true)}
                            />
                        </>
                    ) : (
                        <>
                            <ChevronLeft
                                className={styles.icon}
                                style={{right: ".6em"}}
                                onClick={() => setOpen(false)}
                            />
                        </>
                    )}
                    <div
                        className={styles.sidebar_logo_container}
                        style={open ? {transform: "scale(1)"} : {transform: "scale(0)"}}
                    >
                        <div className={styles.sidebar_logo_header}>
                            <img src={logo} alt=""/>
                            <p>Capstone Store Manager</p>
                        </div>
                    </div>
                    <ul className={styles.menu}>
                        {sidebarMenuItems.filter(({role}) => role.includes('admin')).map((menu) => (
                            can(menu.permissions) && <NavLink
                                to={menu.path}
                                key={menu.path}
                                className={({isActive}) =>
                                    isActive ? styles.menu_item_active : styles.menu_item
                                }
                            >
                                {menu.icon && <menu.icon className={styles.menu_icon}/>}
                                <span hidden={!open}> {menu.title}</span>
                            </NavLink>

                        ))}
                    </ul>
                </section>
                <section className={styles.main_content_container}>
                    <div className={styles.nav_container}>
                        <nav className={styles.header_right_container}>
                            <div
                                className={styles.header_icon}
                                onClick={() => setOpenDropDown((prev) => !prev)}
                            >
                                <User color="white" className={styles.user_icon}/>
                                <h4 className={styles.header_icon_title}>
                                    {user?.firstName} {user?.lastName}
                                </h4>
                                <ChevronDown
                                    color="white"
                                    className={styles.chevron_down}
                                    style={{justifySelf: "center"}}
                                />
                            </div>
                            <Menu
                                className={styles.mobile_menu}
                                onClick={() => setOpen((prev) => !prev)}
                            />
                        </nav>
                    </div>
                    {openDropDown && (
                        <div className={styles.dropdown}>
                            <p onClick={() => {
                                console.log("Logging out");
                                dispatch(logout())
                                navigate('/login')
                            }}>Logout</p>
                        </div>
                    )}
                    <div>
                        {children}
                    </div>
                </section>
            </main>
        </>
    );
};

export default DashboardLayout;
