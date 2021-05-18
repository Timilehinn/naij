import React from 'react'
import styles from '../../styles/_bottomnav.module.css'
import { IoIosList, IoMdNotificationsOutline } from 'react-icons/io'
import { BiUser } from 'react-icons/bi'
import { HiOutlineSearch } from 'react-icons/hi'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'


function Bottomnav() {

    return (
        <div className={styles.bottomnav}>
            <Link to='/timeline'>
                <IoIosList color="#5cba7d" size={23} />
            </Link>
            <Link to="/search">
                <HiOutlineSearch color="#5cba7d" size={23} />
            </Link>

            <Link to="/create-topic">
                    <AiOutlinePlus size={25} color="#5cba7d" />
            </Link>
            <Link to="/notifications">
                <IoMdNotificationsOutline size={23} color="#5cba7d"/>
            </Link>
            <Link to="/profile">
                <BiUser color="#5cba7d" size={22} />
            </Link>
        </div>
    )
}

export default Bottomnav
