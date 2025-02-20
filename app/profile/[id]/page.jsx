'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = () => {
    const { id } = useParams();
    const [prompts, setPrompts] = useState([]);

    const [username, setUsername] = useState('');




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
