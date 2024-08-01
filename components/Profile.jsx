import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  console.log(data, "data");
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data.length > 0 ? (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <h2 className="text-left w-full">
            No Prompts to show ! <br />
            Create propmpts to view them here
          </h2>
        )}
      </div>
    </section>
  );
};

export default Profile;
