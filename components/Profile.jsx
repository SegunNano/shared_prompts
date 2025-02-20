import React from 'react';

import PromptCardList from './PromptCardList';

const Profile = ({ name, prompts, handleEdit, handleDelete, desc }) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="desc tex-left">{desc}</p>
            <PromptCardList prompts={prompts} handleDelete={handleDelete} handleEdit={handleEdit} />
        </section>
    );
};

export default Profile;