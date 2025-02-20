'use client';
import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpadatePrompt = () => {
    const router = useRouter();
    const promptId = useSearchParams().get('id');
    const { data: session } = useSession();
    const author = session?.user.id;

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });

    const updatePrompt = async (e) => {

        e.preventDefault();
        setSubmitting(true);
        try {
            if (!promptId) return alert('Prompt not found');
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({ prompt: post.prompt, tag: post.tag })
            });
            res.ok && router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchPromptDetails = async () => {
            if (!promptId) return;
            try {
                const res = await fetch(`/api/prompt/${promptId}`);
                if (!res.ok) throw new Error("Failed to fetch prompts");
                const data = await res.json();
                setPost(data);
            } catch (error) {
                console.error("Error fetching prompt:", error);
            }
        };
        fetchPromptDetails();
    }, [promptId]);
    return (
        <Form type='Edit' post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
    );
};

export default UpadatePrompt;
