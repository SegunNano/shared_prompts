'use client';
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ prompts, handleTagClick }) => {
    return (<div className="prompt_layout mt-16">
        {prompts.map(p => (
            < PromptCard key={p._id} data={p} handleTagClick={handleTagClick} />
        ))}
    </div>);
};

const Feed = () => {


    const [prompts, setPrompts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const handleChange = (e) => {

    };

    useEffect(() => {
        const fetchPrompts = async () => {
            const res = await fetch('api/prompt');
            const data = await res.json();
            setPrompts(data);
        };
        fetchPrompts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" placeholder="search tags and username" className="search_input peer" required value={searchValue} onChange={handleChange} />
            </form>
            <PromptCardList prompts={prompts} handleTagClick={() => { }} />
        </section>
    );
};

export default Feed;
