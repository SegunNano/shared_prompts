'use client';
import { useState, } from 'react';

import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const userInfo = session?.user;
    const author = session?.user.id;

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    ...post, author
                })
            });
            res.ok && router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        userInfo && author && < Form type='Create' post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
    );
};

export default CreatePrompt;
