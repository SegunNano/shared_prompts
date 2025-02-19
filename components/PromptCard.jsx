'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ data, handleTagClick, handleDelete, handleEdit }) => {
    const { author, prompt, tag } = data;
    const { image, username, email } = author;
    const handleCopy = () => {
        setCopied(prompt);
        navigator.clipboard.writeText(prompt);
        setTimeout(() => setCopied(''), 3000);
    };

    const [copied, setCopied] = useState('');
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
                    <Image src={image} alt={username} width={40} height={40} className="rounded-full object-contain" />
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">{username}</h3>
                        <p className="font-inter text-sm text-gray-500">{email}</p>
                    </div>
                </div>
                <div className="copy_btn shadow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)]" onClick={handleCopy}>
                    <Image src={`/assets/icons/${copied === prompt ? 'tick' : 'copy'}.svg`} width={15} height={15} alt='copy' />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">{prompt}</p>
            <p className="font-inter text-sm cursor-pointer blue_gradient" onClick={() => { handleTagClick && handleTagClick(tag); }}>{tag}</p>
        </div>
    );
};

export default PromptCard;
