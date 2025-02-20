'use client';

import { useState, useEffect, useCallback } from 'react';
import { redirect, useParams } from 'next/navigation';
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';

const UserProfile = () => {
    const { data: session } = useSession();
    const userInfo = session?.user;
    const { id } = useParams();
    const [prompts, setPrompts] = useState([]);
    const [username, setUsername] = useState('');

    if (userInfo && userInfo.id === id) {
        redirect('/profile');
    }
    const fetchPrompts = useCallback(async () => {
        if (!id) return;
        try {
            const res = await fetch(`/api/prompt/author/${id}`);
            if (!res.ok) throw new Error("Failed to fetch prompts");
            const data = await res.json();
            setUsername(data.user.username);
            setPrompts(data.prompts);
        } catch (error) {
            console.error("Error fetching prompts:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchPrompts();
    }, [fetchPrompts]);

    return (
        username && <Profile name={username} desc='Your personalized profile page' prompts={prompts} />
    );
};

export default UserProfile;
