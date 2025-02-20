import PromptCard from './PromptCard';

const PromptCardList = ({ prompts, handleTagClick, handleEdit, handleDelete, }) => {
    return (
        <div className={`prompt_layout   ${handleDelete && handleEdit ? 'mt-10' : 'mt-16'}`}>
            {prompts && prompts.map(prompt => (
                handleDelete && handleEdit ? (
                    < PromptCard key={prompt._id} data={prompt} handleDelete={handleDelete} handleEdit={handleEdit} />
                ) : (
                    < PromptCard key={prompt._id} data={prompt} handleTagClick={handleTagClick} />
                )
            ))}
        </div>
    );
};

export default PromptCardList;;
