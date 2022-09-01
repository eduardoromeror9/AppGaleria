import Post from "../models/Post.js"


export const getPosts = async(req, res) => {
    const posts = await Post.find()
    res.send(posts)
};

export const createPost = async(req, res) => {

    const { title, description } = req.body;
    
    const newPost = new Post({ title, description });
    await newPost.save()

    return res.json(newPost)
};

export const updatePost = async(req, res) => {
    
    // const { title, description } = req.body;
    // const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
    //     title,
    //     description
    // }, { new: true })

    // res.json(updatedPost)

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(post)
    res.send('post updated')

};

export const deletePost = async(req, res) => {
    
    const postRemove = await Post.findByIdAndDelete(req.params.id)
    if (!postRemove) {
        return res.status(404).send('Post not found')
    }

    return res.status(204).send('Post deleted')

};

export const getPost = async(req, res) => {
    
    const post = await Post.findById(req.params.id)

    if (!post) {
        return res.status(404).send('Post not found')
    }

    return res.json(post)

};
