'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();
    const userInfo = session?.user;
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [providers, setProviders] = useState(null);
    useEffect(() => {
        const setProvider = async () => {
            const res = await getProviders();
            setProviders(res);
        };
        setProvider();
    }, []);


    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className='flex gap-2 flex-center'>
                <Image src='/assets/images/logo.svg' alt='PromptHaven Logo' width={30} height={30} className='object-contain' />
                <p className="logo_text">PromptHaven</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex">
                {userInfo ? (
                    <div className="flex gap-3 md:gap-5-">
                        <Link href='/prompt/create' className="black_btn">Create Prompt</Link>


                        <button onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href={`/profile`} >
                            <Image src={userInfo.image} alt='profile Logo' width={37} height={37} className="rounded-full" />
                        </Link>
                    </div>
                ) : (
                    providers && Object.values(providers).map(provider => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In
                        </button>
                    ))
                )}
            </div>
            {/* Mobile Navigation */}
            <div className="flex relative sm:hidden">
                {userInfo ? (
                    <div className="flex">
                        <Image src={userInfo.image} alt='PromptHaven Logo' width={30} height={30} className='object-contain' onClick={() => setToggleDropdown(prev => !prev)} />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href={`/profile`} className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
                                <Link href='/prompt/create' className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                                <button type='button' onClick={() => {
                                    setToggleDropdown(false); signOut();
                                }} className='mt-5 w-full black_btn'>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    providers && Object.values(providers).map(provider => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In
                        </button>
                    ))
                )}
            </div>
        </nav>
    );
};

export default Navbar;
