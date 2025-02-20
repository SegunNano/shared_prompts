'use client';
import { useState, useEffect } from 'react';
import PromptCardList from './PromptCardList';



const Feed = () => {
    const [prompts, setPrompts] = useState([]);
    const [fprompts, setFprompts] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchPrompts = async () => {
            const res = await fetch('api/prompt');
            const data = await res.json();
            setFprompts(data);
            setPrompts(data);
        };
        fetchPrompts();
    }, []);

    useEffect(() => {
        filterSearch();
    }, [searchValue]); // Runs filterSearch when searchValue changes

    const filterSearch = () => {
        if (!searchValue.trim()) {
            setPrompts(fprompts);
            return; // Stop execution
        }

        const lowerCased = searchValue.toLowerCase();
        const searchRes = fprompts.filter(({ prompt, tag, author }) =>
            [prompt, tag, author?.username].some(field =>
                field?.toLowerCase().includes(lowerCased)
            )
        );

        setPrompts(searchRes);
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTagClick = (tag) => {
        setSearchValue(tag);
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" placeholder="search tags and username" className="search_input peer" required value={searchValue} onChange={handleChange} />
            </form>
            <PromptCardList prompts={prompts} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;
