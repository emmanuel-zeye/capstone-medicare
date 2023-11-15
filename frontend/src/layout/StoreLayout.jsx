import {useState} from "react";
import styles from "./storeLayout.module.css";

import {ChevronDown, ShoppingCart, User} from "react-feather";
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/react.svg";
import {useAuth} from "../hooks/useAuth.js";
import {logout} from "../store/slices/authSlice.js";
import {useAppDispatch} from "../store/store.js";
import {Col, Row} from "react-bootstrap";

const StoreLayout = ({children, cartCount}) => {
    const [openDropDown, setOpenDropDown] = useState(false);
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const {user} = auth;
    const navigate = useNavigate();

    return (
        <>
            <main className={styles.sidebar_wrapper_container}>
                <section className={styles.main_content_container}>
                    <div className={styles.nav_container}>
                        <nav className={styles.sidebar_logo_container}>
                            <div className={styles.sidebar_logo_header}>
                                <img src={logo} alt=""/>
                                <Link to='/store/products'>Capstone Medical Supplies</Link>
                            </div>
                        </nav>
                        <nav className={styles.header_right_container}>
                            <Link to='/store/cart' className={styles.header_icon}>
                                {cartCount}
                                <ShoppingCart color='white'/>
                                <h4>Cart</h4>
                            </Link>
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
                        </nav>
                    </div>
                    {openDropDown && (
                        <>
                            <Row className={styles.dropdown}>
                                <Col><div onClick={() => {
                                    dispatch(logout())
                                    navigate('/login')
                                }}>Logout</div></Col>
                                <Col><Link to='/store/orders'>Orders</Link></Col>

                            </Row>
                        </>

                    )}
                    <div>
                        {children}
                    </div>
                </section>
            </main>
        </>
    );
};

export default StoreLayout;
