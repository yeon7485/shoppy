import React from 'react';
import { Link } from 'react-router-dom';
import { BsPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
    const { user, login, logout } = useAuthContext();
    return (
        <header className='flex justify-between border-b border-gray-300 p-4'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <FiShoppingBag />
                <h1>Shoppy</h1>
            </Link>
            <nav className='flex items-center text-xl gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                {user && (
                    <Link to='/cart'>
                        <CartStatus />
                    </Link>
                )}
                {user && user.isAdmin && (
                    <Link to='/products/new' className='text-2xl'>
                        <BsPencilFill />
                    </Link>
                )}
                {user && <User user={user} />}
                {!user && <Button text={'Login'} onClick={login} />}
                {user && <Button text={'Logout'} onClick={logout} />}
            </nav>
        </header>
    );
}
