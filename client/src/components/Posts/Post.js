const Post = ({data}) => {
    return(
        <div>
            <h1>{data.creator}</h1>
            <h1>{data.title}</h1>
            <h1>{data.message}</h1>
            <h1>{data.tags}</h1>
        </div>
    )
}

export default Post