'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const userInfo = session?.user;
    const [prompts, setPrompts] = useState([]);


    const fetchPrompts = useCallback(async () => {
        if (!userInfo?.id) return;
        try {
            const res = await fetch(`/api/prompt/author/${userInfo.id}`);
            if (!res.ok) throw new Error("Failed to fetch prompts");
            const data = await res.json();
            setPrompts(data.prompts);
        } catch (error) {
            console.error("Error fetching prompts:", error);
        }
    }, [userInfo?.id]);

    const handleEdit = promptId => router.push(`/prompt/update/${promptId}`);
    const handleDelete = async (promptId) => {
        const isDeleteConfirmed = confirm(`Are you sure you want to delete Prompt: ${promptId}?`);
        if (isDeleteConfirmed) {
            try {
                await fetch(`/api/prompt/${promptId}`, { method: 'DELETE' });
                fetchPrompts();
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchPrompts();
    }, [fetchPrompts]);

    return (
        <Profile name='My' desc='Your personalized profile page' prompts={prompts} handleEdit={handleEdit} handleDelete={handleDelete} />
    );
};

export default MyProfile;
